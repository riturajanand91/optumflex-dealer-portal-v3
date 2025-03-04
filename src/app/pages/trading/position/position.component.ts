import { Component, ViewChild, Input, SimpleChanges, Output, EventEmitter, ChangeDetectorRef, OnInit, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';  // Import paginator module
import { ToastifyService } from 'src/app/services/toastify.service';
import { LoggerService } from 'src/app/services/logger.service';
import { MaterialModule } from 'src/app/material.module';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpService } from 'src/app/services/http.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-position',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './position.component.html',
  styleUrl: './position.component.scss'
})
export class PositionComponent {
  @Input() searchData: any;
  @Input() tableData: any = [];
  public totalCount: number = 0; // To hold the total number of posts
  public pageSize: number = 30; // Default page size
  public currentPage: number = 1; // Current page
  public isLoading: boolean = false; // Current page
  private isRefreshing: boolean = false; // Flag to check if loadResults is in progress
  private refreshInterval: any; // Variable to hold the interval reference
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  public displayedColumns: any[] = [
    "symbol",
    "transaction_action",
    "transaction_date",
    "transaction_quantity",
    "transaction_price",
    "last_traded_price",
    "unrealized",
    "realized",
    "square_off_quantity",
    "square_off_price",
    "square_off_time",
    "progress_status",
    "buy_response_update_time",
    "sell_response_update_time",
    "validity",
    "product",
    "orderType",
    "action"
  ];
  public innerDisplayedColumns = [
    // 'master_position_id',
    'sector_name',
    'square_off_quantity',
    'square_off_position',
    'square_off_time',
    'sell_response_update_time',
    'progress_status',
    'square_off_order_id'
  ];
  orderBookData: any[] = [];
  expandedElement: any = null; // Initialize as null
  constructor(
    private toastify: ToastifyService,
    private logger: LoggerService,
    private httpService: HttpService,
    private utilityService: UtilityService,
    private cd: ChangeDetectorRef
  ) {
    this.logger.debug("Position Component constructor");
  }

  ngOnInit() {
    this.logger.info("Position Component initialized");
    this.expandedElement = null; // Reset expandedElement
    this.loadResults();
    // this.startAutoRefresh();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchData'] && !changes['searchData'].firstChange) {
      this.logger.info('Position Component - Search data changed:', this.searchData);
      this.expandedElement = null; // Reset expandedElement
      this.loadResults();
    }
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.stopAutoRefresh();
  }

  // Start auto-refreshing data every 10 seconds
  startAutoRefresh() {
    this.refreshInterval = setInterval(() => {
      if (!this.isRefreshing) {
        this.loadResults();
      }
    }, 10000); // 10 seconds
  }

  // Stop auto-refreshing data
  stopAutoRefresh() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  // Handle page changes
  onPageChange(event: any) {
    this.logger.info('Position Component - Page change triggered:', event);
    this.currentPage = event.pageIndex + 1; // Update current page (pageIndex is zero-based)
    this.pageSize = event.pageSize; // Update page size
    this.loadResults(); // Reload posts with new pagination settings
  }

  // Load posts with logging and error handling
  loadResults() {
    this.isLoading = true;
    this.isRefreshing = true; // Set the flag to indicate that loadResults is in progress
    this.logger.debug('Position Component - Loading Position Results for page:', this.currentPage, 'Page size:', this.pageSize);
    const skip = (this.currentPage - 1) * this.pageSize;
    const limit = this.pageSize;
    const payload: any = {
      skip,
      limit,
      isOrderBook: false,
      isTradeBook: false,
      isPositionBook: true,
      isHoldings: false,
      ...this.searchData,
      "F_column3": "",
      "F_column4": "",
      "F_column5": "",
      "F_column6": ""
    };
    this.httpService.getTradeData(payload).subscribe(
      (data) => {
        this.logger.info("Position Component - Data fetched from API:", data);
        // Clear existing data
        this.orderBookData = [];
        data?.transaction_data?.forEach((user: any) => {
          if (user?.details && Array.isArray(user?.details) && user?.details?.length) {
            this.orderBookData = [...this.orderBookData, { ...user, details: new MatTableDataSource(user?.details) }];
          } else {
            this.orderBookData = [...this.orderBookData, user];
          }
        });
        this.dataSource = new MatTableDataSource(this.orderBookData);
        this.logger.debug("Position Component - DataSource updated:", this.dataSource);
        this.totalCount = data.total_data_count; // Set the total number of posts for pagination
        this.isLoading = false;
        this.isRefreshing = false; // Reset the flag after loadResults is completed
        this.cd.detectChanges(); // Detect changes after data is assigned
        this.toastify.showSuccess('Position data loaded successfully');
      },
      (error) => {
        this.isLoading = false;
        this.isRefreshing = false; // Reset the flag in case of error
        this.logger.error('Position Component - Error fetching posts:', error);
        this.toastify.showError('Failed to load Position data');
      }
    );
  }

  public toggleRow(element: any) {
    element?.details && (element?.details as MatTableDataSource<any>).data?.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
  }

  public buySell() {
    this.logger.info("Position Component - Buy/Sell action triggered");
  }

}

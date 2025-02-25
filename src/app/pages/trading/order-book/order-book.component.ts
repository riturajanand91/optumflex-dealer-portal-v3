import { Component, ViewChild, Input, SimpleChanges, Output, EventEmitter, ChangeDetectorRef, OnInit, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';  // Import paginator module
import { ToastifyService } from 'src/app/services/toastify.service';
import { LoggerService } from 'src/app/services/logger.service';
import { MaterialModule } from 'src/app/material.module';
import { TradeService } from 'src/app/services/trade.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-order-book',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrderBookComponent implements OnInit, OnChanges {
  @Input() searchData: any;
  @Input() tableData: any = [];
  public totalCount: number = 0; // To hold the total number of posts
  public pageSize: number = 10; // Default page size
  public currentPage: number = 1; // Current page
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  public displayedColumns: any[] = [
    "symbol",
    "type",
    "qtyFilled",
    "orderPrice",
    "executedAt",
    "avgPrice",
    "ltp",
    "status",
    "date",
    "validity",
    "product",
    "orderType",
    "xtsOrderId",
    "exchangeOrderNo",
    "action"
  ];
  public innerDisplayedColumns = [
    'master_position_id',
    'sector_name',
    'square_off_quantity',
    'square_off_position',
    'sell_response_update_time',
    'progress_status',
    'square_off_time',
    'square_off_order_id'
  ];
  orderBookData: any[] = [];
  expandedElement: null;
  constructor(
    private toastify: ToastifyService,
    private logger: LoggerService,
    private httpService: HttpService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.logger.info('OrderBookComponent initialized');
    this.loadResults();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchData'] && !changes['searchData'].firstChange) {
      this.logger.info('Search data changed:', this.searchData);
      this.loadResults();
    }
  }

  // Handle page changes
  onPageChange(event: any) {
    this.logger.info('Page change triggered:', event);
    this.currentPage = event.pageIndex + 1; // Update current page (pageIndex is zero-based)
    this.pageSize = event.pageSize; // Update page size
    this.loadResults(); // Reload posts with new pagination settings
  }

  // Load posts with logging and error handling
  loadResults() {
    this.logger.debug('Loading Order Book Results for page:', this.currentPage, 'Page size:', this.pageSize);
    const skip = (this.currentPage - 1) * this.pageSize;
    const limit = this.pageSize;
    const payload: any = {
      skip,
      limit,
      username: "Aayush",
      isOrderBook: 'true',
      isTradeBook: 'false',
      isPositionBook: 'false',
      isHoldings: 'false',
      ...this.searchData
    };
    this.httpService.getTradeData(payload).subscribe(
      (data) => {
        console.log("New api", data.transaction_data)
        let sampleData = {
          "msg": "Transaction Data Download Successfully....!",
          "status_code": 202,
          "transaction_data": [
            {
              "id": 45,
              "symbol": "SENSEX2510379200PE",
              "transaction_action": 1.0,
              "transaction_quantity": 10.0,
              "transaction_price": 0.0,
              "buy_response_update_time": "2025-01-03 08:38:29.213512+00:00",
              "last_traded_price": 0.0,
              "progress_status": "Manual Square Off",
              "transaction_date": "2025-01-03 08:38:25.761995+00:00",
              "order_id": 250103000785187.0,
              "details": [
                {
                  "master_position_id": 45,
                  "sector_name": "SENSEX2510379200PE",
                  "square_off_quantity": 10.0,
                  "square_off_position": 0.0,
                  "sell_response_update_time": '12345',
                  "progress_status": "Manual Square Off",
                  "square_off_time": "2025-01-03T09:39:40.074248+00:00",
                  "square_off_order_id": 250103000925978.0
                },
                {
                  "master_position_id": 45,
                  "sector_name": "SENSEX2510379200PE",
                  "square_off_quantity": 10.0,
                  "square_off_position": 0.0,
                  "sell_response_update_time": 12345678,
                  "progress_status": "Manual Square Off",
                  "square_off_time": "2025-01-03T09:39:40.074248+00:00",
                  "square_off_order_id": 250103000925978.0
                }
              ]
            }
          ]
        }

        // Clear existing data
        this.orderBookData = [];

        this.logger.info('Posts fetched successfully:', data);
        data.transaction_data.forEach((user: any) => {
          if (user.details && Array.isArray(user.details) && user.details.length) {
            this.orderBookData = [...this.orderBookData, { ...user, details: new MatTableDataSource(user.details) }];
          } else {
            this.orderBookData = [...this.orderBookData, user];
          }
        });
        this.dataSource = new MatTableDataSource(this.orderBookData);
        console.log(this.dataSource)
        // this.dataSource.data = sampleData.transaction_data; // Assuming the API returns posts in a 'posts' array
        this.totalCount = this.dataSource.data.length; // Set the total number of posts for pagination
        // this.dataSource.paginator = this.paginator;
      },
      (error) => {
        this.logger.error('Error fetching posts:', error);
        this.toastify.showError('Failed to load posts');
      }
    );
  }

  toggleRow(element: any) {
    console.log(element)
    element.details && (element.details as MatTableDataSource<any>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
  }
  public buySell() {
    console.log("buy sell")
  }
}
import { Component, ViewChild, Input, SimpleChanges, Output, EventEmitter, ChangeDetectorRef, OnInit, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';  // Import paginator module
import { ToastifyService } from 'src/app/services/toastify.service';
import { LoggerService } from 'src/app/services/logger.service';
import { MaterialModule } from 'src/app/material.module';
import { TradeService } from 'src/app/services/trade.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpService } from 'src/app/services/http.service';
import { UtilityService } from 'src/app/services/utility.service';

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
export class OrderBookComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() searchData: any;
  @Input() tableData: any = [];
  public totalCount: number = 0; // To hold the total number of posts
  public pageSize: number = 10; // Default page size
  public currentPage: number = 1; // Current page
  public isLoading: boolean = false; // Current page
  private isRefreshing: boolean = false; // Flag to check if loadResults is in progress
  private refreshInterval: any; // Variable to hold the interval reference
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
    // "exchangeOrderNo",
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
  expandedElement: 'null';
  constructor(
    private toastify: ToastifyService,
    private logger: LoggerService,
    private httpService: HttpService,
    private utilityService: UtilityService,
    private cd: ChangeDetectorRef
  ) {
    this.logger.debug("Order Book Component constructor");
  }

  ngOnInit() {
    this.logger.info("Order Book Component initialized");
    this.loadResults();
    // this.startAutoRefresh();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchData'] && !changes['searchData'].firstChange) {
      this.logger.info('Search data changed:', this.searchData);
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
    this.logger.info('Page change triggered:', event);
    this.currentPage = event.pageIndex + 1; // Update current page (pageIndex is zero-based)
    this.pageSize = event.pageSize; // Update page size
    this.loadResults(); // Reload posts with new pagination settings
  }

  // Load posts with logging and error handling
  loadResults() {
    this.isLoading = true;
    this.isRefreshing = true; // Set the flag to indicate that loadResults is in progress
    this.logger.debug('Loading Order Book Results for page:', this.currentPage, 'Page size:', this.pageSize);
    const skip = (this.currentPage - 1) * this.pageSize;
    const limit = this.pageSize;
    const payload: any = {
      skip,
      limit,
      username: "Aayush",
      isOrderBook: true,
      isTradeBook: false,
      isPositionBook: false,
      isHoldings: false,
      ...this.searchData,
      "F_column3": "",
      "F_column4": "",
      "F_column5": "",
      "F_column6": ""
    };
    this.httpService.getTradeData(payload).subscribe(
      (data) => {
        let dataSet = {
          "msg": "Transaction Data Download Successfull....!",
          "transaction_data": [
              {
                  "id": 45,
                  "symbol": "SENSEX2510379200PE",
                  "transaction_action": 1,
                  "transaction_quantity": 10,
                  "transaction_price": 0,
                  "buy_response_update_time": "2025-01-03T08:38:29.213512Z",
                  "last_traded_price": 0,
                  "progress_status": "Manual Square Off",
                  "transaction_date": "2025-01-03T08:38:25.761995Z",
                  "order_id": 250103000785187,
                  "details": [
                      {
                          "master_position_id": 45,
                          "sector_name": "SENSEX2510379200PE",
                          "square_off_quantity": 10,
                          "square_off_position": 0,
                          "sell_response_update_time": 'null',
                          "progress_status": "Manual Square Off",
                          "square_off_time": "2025-01-03T09:39:40.074248Z",
                          "square_off_order_id": 250103000925978
                      }
                  ]
              },
              {
                  "id": 44,
                  "symbol": "SENSEX2510379400CE",
                  "transaction_action": 1,
                  "transaction_quantity": 10,
                  "transaction_price": 0,
                  "buy_response_update_time": "2025-01-03T08:38:25.362992Z",
                  "last_traded_price": 0,
                  "progress_status": "Manual Square Off",
                  "transaction_date": "2025-01-03T08:38:23.858751Z",
                  "order_id": 250103000785109,
                  "details": [
                      {
                          "master_position_id": 44,
                          "sector_name": "SENSEX2510379400CE",
                          "square_off_quantity": 10,
                          "square_off_position": 0,
                          "sell_response_update_time": 'null',
                          "progress_status": "Manual Square Off",
                          "square_off_time": "2025-01-03T09:39:33.777650Z",
                          "square_off_order_id": 250103000925828
                      }
                  ]
              },
              {
                  "id": 43,
                  "symbol": "SENSEX2510379400PE",
                  "transaction_action": 1,
                  "transaction_quantity": 10,
                  "transaction_price": 0,
                  "buy_response_update_time": "2025-01-03T08:25:05.475954Z",
                  "last_traded_price": 0,
                  "progress_status": "Manual Square Off",
                  "transaction_date": "2025-01-03T08:25:04.236859Z",
                  "order_id": 250103000747350,
                  "details": [
                      {
                          "master_position_id": 43,
                          "sector_name": "SENSEX2510379400PE",
                          "square_off_quantity": 10,
                          "square_off_position": 0,
                          "sell_response_update_time": 'null',
                          "progress_status": "Manual Square Off",
                          "square_off_time": "2025-01-03T08:30:51.478782Z",
                          "square_off_order_id": 250103000763246
                      }
                  ]
              },
              {
                  "id": 42,
                  "symbol": "SENSEX2510379600CE",
                  "transaction_action": 1,
                  "transaction_quantity": 10,
                  "transaction_price": 0,
                  "buy_response_update_time": "2025-01-03T08:25:05.452427Z",
                  "last_traded_price": 0,
                  "progress_status": "Manual Square Off",
                  "transaction_date": "2025-01-03T08:25:02.469443Z",
                  "order_id": 250103000747312,
                  "details": [
                      {
                          "master_position_id": 42,
                          "sector_name": "SENSEX2510379600CE",
                          "square_off_quantity": 10,
                          "square_off_position": 0,
                          "sell_response_update_time": 'null',
                          "progress_status": "Manual Square Off",
                          "square_off_time": "2025-01-03T08:31:00.879677Z",
                          "square_off_order_id": 250103000763659
                      }
                  ]
              },
              {
                  "id": 41,
                  "symbol": "SENSEX2510379400PE",
                  "transaction_action": 1,
                  "transaction_quantity": 10,
                  "transaction_price": 0,
                  "buy_response_update_time": "2025-01-03T07:48:13.318690Z",
                  "last_traded_price": 0,
                  "progress_status": "Order Rejected",
                  "transaction_date": "2025-01-03T07:48:10.863892Z",
                  "order_id": 250103000684225,
                  "details": []
              },
              {
                  "id": 40,
                  "symbol": "SENSEX2510379600CE",
                  "transaction_action": 1,
                  "transaction_quantity": 10,
                  "transaction_price": 0,
                  "buy_response_update_time": "2025-01-03T07:48:07.869748Z",
                  "last_traded_price": 0,
                  "progress_status": "Manual Square Off",
                  "transaction_date": "2025-01-03T07:48:06.430811Z",
                  "order_id": 250103000684130,
                  "details": [
                      {
                          "master_position_id": 40,
                          "sector_name": "SENSEX2510379600CE",
                          "square_off_quantity": 10,
                          "square_off_position": 0,
                          "sell_response_update_time": 'null',
                          "progress_status": "Manual Square Off",
                          "square_off_time": "2025-01-03T08:29:42.345428Z",
                          "square_off_order_id": 250103000758864
                      }
                  ]
              },
              {
                  "id": 39,
                  "symbol": "SENSEX2510379300PE",
                  "transaction_action": 1,
                  "transaction_quantity": 10,
                  "transaction_price": 0,
                  "buy_response_update_time": "2025-01-03T07:20:55.860556Z",
                  "last_traded_price": 0,
                  "progress_status": "Order Rejected",
                  "transaction_date": "2025-01-03T07:20:53.928727Z",
                  "order_id": 250103000637290,
                  "details": []
              },
              {
                  "id": 38,
                  "symbol": "SENSEX2510379600CE",
                  "transaction_action": 1,
                  "transaction_quantity": 10,
                  "transaction_price": 0,
                  "buy_response_update_time": "2025-01-03T07:18:30.378354Z",
                  "last_traded_price": 0,
                  "progress_status": "Order Rejected",
                  "transaction_date": "2025-01-03T07:18:29.082268Z",
                  "order_id": 250103000633690,
                  "details": []
              },
              {
                  "id": 37,
                  "symbol": "SENSEX2510379100PE",
                  "transaction_action": 1,
                  "transaction_quantity": 10,
                  "transaction_price": 0,
                  "buy_response_update_time": "2025-01-03T05:30:06.362969Z",
                  "last_traded_price": 0,
                  "progress_status": "Manual Square Off",
                  "transaction_date": "2025-01-03T05:30:05.148314Z",
                  "order_id": 250103000385670,
                  "details": [
                      {
                          "master_position_id": 37,
                          "sector_name": "SENSEX2510379100PE",
                          "square_off_quantity": 10,
                          "square_off_position": 0,
                          "sell_response_update_time": 'null',
                          "progress_status": "Manual Square Off",
                          "square_off_time": "2025-01-03T06:02:30.898846Z",
                          "square_off_order_id": 250103000473347
                      }
                  ]
              },
              {
                  "id": 36,
                  "symbol": "SENSEX2510379600CE",
                  "transaction_action": 1,
                  "transaction_quantity": 10,
                  "transaction_price": 0,
                  "buy_response_update_time": "2025-01-03T05:22:27.543486Z",
                  "last_traded_price": 0,
                  "progress_status": "Manual Square Off",
                  "transaction_date": "2025-01-03T05:22:25.649154Z",
                  "order_id": 250103000369884,
                  "details": [
                      {
                          "master_position_id": 36,
                          "sector_name": "SENSEX2510379600CE",
                          "square_off_quantity": 10,
                          "square_off_position": 0,
                          "sell_response_update_time": 'null',
                          "progress_status": "Manual Square Off",
                          "square_off_time": "2025-01-03T06:02:02.283226Z",
                          "square_off_order_id": 250103000472008
                      }
                  ]
              },
              {
                  "id": 30,
                  "symbol": "GRANULES30JAN25620CE",
                  "transaction_action": 1,
                  "transaction_quantity": 1000,
                  "transaction_price": 10,
                  "buy_response_update_time": "2025-01-07T06:02:37.402852Z",
                  "last_traded_price": 0,
                  "progress_status": "Order Rejected",
                  "transaction_date": "2025-01-07T06:02:35.544650Z",
                  "order_id": 250107000458182,
                  "details": []
              },
              {
                  "id": 27,
                  "symbol": "ASTRAL30JAN251560CE",
                  "transaction_action": 1,
                  "transaction_quantity": 367,
                  "transaction_price": 20,
                  "buy_response_update_time": 'null',
                  "last_traded_price": 0,
                  "progress_status": "Manual Order Placed",
                  "transaction_date": "2025-01-04T07:36:49.977950Z",
                  "order_id": 250104000012631,
                  "details": []
              },
              {
                  "id": 24,
                  "symbol": "AXISBANK30JAN251140CE",
                  "transaction_action": 1,
                  "transaction_quantity": 625,
                  "transaction_price": 10,
                  "buy_response_update_time": 'null',
                  "last_traded_price": 0,
                  "progress_status": "Manual Square Off",
                  "transaction_date": "2025-01-02T18:09:45.132040Z",
                  "order_id": 250102001007193,
                  "details": [
                      {
                          "master_position_id": 24,
                          "symbol": "AXISBANK30JAN251140CE",
                          "square_off_quantity": 625,
                          "square_off_position": 15,
                          "sell_response_update_time": 'null',
                          "progress_status": "Manual Square Off",
                          "square_off_time": "2025-01-02T18:11:41.466304Z",
                          "square_off_order_id": 250102001007534
                      }
                  ]
              },
              {
                  "id": 21,
                  "symbol": "AXISBANK30JAN251140CE",
                  "transaction_action": 1,
                  "transaction_quantity": 625,
                  "transaction_price": 10,
                  "buy_response_update_time": 'null',
                  "last_traded_price": 0,
                  "progress_status": "Manual Square Off",
                  "transaction_date": "2025-01-02T17:32:10.574595Z",
                  "order_id": 250102001004700,
                  "details": [
                      {
                          "master_position_id": 21,
                          "symbol": "AXISBANK30JAN251140CE",
                          "square_off_quantity": 625,
                          "square_off_position": 11,
                          "sell_response_update_time": 'null',
                          "progress_status": "Manual Square Off",
                          "square_off_time": "2025-01-02T17:40:25.062774Z",
                          "square_off_order_id": 250102001005418
                      }
                  ]
              },
              {
                  "id": 18,
                  "symbol": "AXISBANK30JAN251050CE",
                  "transaction_action": 1,
                  "transaction_quantity": 1250,
                  "transaction_price": 0.5,
                  "buy_response_update_time": 'null',
                  "last_traded_price": 0,
                  "progress_status": "Manual Order Placed",
                  "transaction_date": "2024-12-30T04:45:19.955022Z",
                  "order_id": 241230000237116,
                  "details": []
              },
              {
                  "id": 15,
                  "symbol": "AARTIIND30JAN25350CE",
                  "transaction_action": 1,
                  "transaction_quantity": 10000,
                  "transaction_price": 20,
                  "buy_response_update_time": 'null',
                  "last_traded_price": 0,
                  "progress_status": "Manual Order Placed",
                  "transaction_date": "2024-12-29T20:43:08.760487Z",
                  "order_id": 241230000000070,
                  "details": []
              },
              {
                  "id": 12,
                  "symbol": "ACC30JAN252400CE",
                  "transaction_action": 1,
                  "transaction_quantity": 900,
                  "transaction_price": 0,
                  "buy_response_update_time": 'null',
                  "last_traded_price": 0,
                  "progress_status": "Manual Order Placed",
                  "transaction_date": "2024-12-29T10:41:11.284326Z",
                  "order_id": 20241229104111137000,
                  "details": []
              },
              {
                  "id": 9,
                  "symbol": "ABBOTINDIA30JAN2528750PE",
                  "transaction_action": 1,
                  "transaction_quantity": 100,
                  "transaction_price": 150,
                  "buy_response_update_time": 'null',
                  "last_traded_price": 0,
                  "progress_status": "Manual Order Placed",
                  "transaction_date": "2024-12-29T10:39:05.229194Z",
                  "order_id": 2024122910394717400,
                  "details": []
              }
          ],
          "total_data_count": 28,
          "status_code": 202
      }
        this.logger.info("Data fetched from API:", data.transaction_data);
        // Clear existing data
        this.orderBookData = [];
        this.logger.info('Posts fetched successfully:', data);
        data?.transaction_data?.forEach((user: any) => {
          if (user?.details && Array.isArray(user?.details) && user?.details?.length) {
            this.orderBookData = [...this.orderBookData, { ...user, details: new MatTableDataSource(user?.details) }];
          } else {
            this.orderBookData = [...this.orderBookData, user];
          }
        });
        this.dataSource = new MatTableDataSource(this.orderBookData);
        this.logger.debug("DataSource updated:", this.dataSource);
        this.totalCount = this.dataSource.data.length; // Set the total number of posts for pagination
        this.isLoading = false;
        this.isRefreshing = false; // Reset the flag after loadResults is completed
        this.cd.detectChanges(); // Detect changes after data is assigned
      },
      (error) => {
        this.isLoading = false;
        this.isRefreshing = false; // Reset the flag in case of error
        this.logger.error('Error fetching posts:', error);
        this.toastify.showError('Failed to load posts');
      }
    );
  }

  toggleRow(element: any) {
    element?.details && (element?.details as MatTableDataSource<any>).data?.length ? (this.expandedElement = this.expandedElement === element ? 'null' : element) : 'null';
    this.cd.detectChanges();
  }

  public buySell() {
    this.logger.info("Buy/Sell action triggered");
  }

  
}
import { ChangeDetectionStrategy, Component, signal, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';  // Import paginator module
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { Observable } from 'rxjs';
import { HttpService } from './../../../services/http.service';
import { ToastifyService } from 'src/app/services/toastify.service';
import { Router } from '@angular/router';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-holding',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, ReactiveFormsModule, MatExpansionModule],
  templateUrl: './holding.component.html',
  styleUrl: './holding.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoldingComponent {
  @Input() searchData: any;

  public holdings: any = [];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  searchForm: FormGroup;
  readonly panelOpenState = signal(false);

  public displayedColumns: string[] = [
    "symbol",
    "type",
    "quantity",
    "t1Quantity",
    "usedQty",
    "daysPnL",
    "netPnL",
    "buyAvgPrice",
    "ltp",
    "totalHoldingQ",
    "sellAvgPrice",
    "investedValue",
    "marketValue",
    "haircut",
    "collateralQuantity",
    "pledgeQuantity",
    "collateralValue",
    "action",
    "exit"
  ];
  public totalData: number = 0; // To hold the total number of posts
  public pageSize: number = 10; // Default page size
  public currentPage: number = 1; // Current page

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  constructor(private httpService: HttpService,
    private toastify: ToastifyService,
    private router: Router,
    private logger: LoggerService,
    private fb: FormBuilder
  ) {
    this.holdings = [
      {
        symbol: "AAPL",
        type: "SELL",
        quantity: "751/0",
        t1Quantity: "0",
        usedQty: "0",
        daysPnL: "0.00",
        netPnL: "0.00",
        buyAvgPrice: "0.00",
        ltp: "0.00",
        totalHoldingQ: "0",
        sellAvgPrice: "4094.63",
        investedValue: "0.00",
        marketValue: "0.00",
        haircut: "0.00",
        collateralQuantity: "0",
        pledgeQuantity: "0",
        collateralValue: "0.00",
        action: "",
        exit: ""
      },
      {
        symbol: "AMZN",
        type: "SELL",
        quantity: "385/0",
        t1Quantity: "0",
        usedQty: "0",
        daysPnL: "0.00",
        netPnL: "0.00",
        buyAvgPrice: "0.00",
        ltp: "0.00",
        totalHoldingQ: "0",
        sellAvgPrice: "1494.04",
        investedValue: "0.00",
        marketValue: "0.00",
        haircut: "0.00",
        collateralQuantity: "0",
        pledgeQuantity: "0",
        collateralValue: "0.00",
        action: "",
        exit: ""
      },
      {
        symbol: "TSLA",
        type: "SELL",
        quantity: "134/0",
        t1Quantity: "0",
        usedQty: "0",
        daysPnL: "0.00",
        netPnL: "0.00",
        buyAvgPrice: "0.00",
        ltp: "0.00",
        totalHoldingQ: "0",
        sellAvgPrice: "2978.91",
        investedValue: "0.00",
        marketValue: "0.00",
        haircut: "0.00",
        collateralQuantity: "0",
        pledgeQuantity: "0",
        collateralValue: "0.00",
        action: "",
        exit: ""
      },
      {
        symbol: "TSLA",
        type: "BUY",
        quantity: "651/0",
        t1Quantity: "0",
        usedQty: "0",
        daysPnL: "0.00",
        netPnL: "0.00",
        buyAvgPrice: "4803.50",
        ltp: "0.00",
        totalHoldingQ: "0",
        sellAvgPrice: "0.00",
        investedValue: "0.00",
        marketValue: "0.00",
        haircut: "0.00",
        collateralQuantity: "0",
        pledgeQuantity: "0",
        collateralValue: "0.00",
        action: "",
        exit: ""
      },
      {
        symbol: "AAPL",
        type: "SELL",
        quantity: "44/0",
        t1Quantity: "0",
        usedQty: "0",
        daysPnL: "0.00",
        netPnL: "0.00",
        buyAvgPrice: "0.00",
        ltp: "0.00",
        totalHoldingQ: "0",
        sellAvgPrice: "3079.43",
        investedValue: "0.00",
        marketValue: "0.00",
        haircut: "0.00",
        collateralQuantity: "0",
        pledgeQuantity: "0",
        collateralValue: "0.00",
        action: "",
        exit: ""
      },
      {
        symbol: "AMZN",
        type: "BUY",
        quantity: "745/0",
        t1Quantity: "0",
        usedQty: "0",
        daysPnL: "0.00",
        netPnL: "0.00",
        buyAvgPrice: "2882.63",
        ltp: "0.00",
        totalHoldingQ: "0",
        sellAvgPrice: "0.00",
        investedValue: "0.00",
        marketValue: "0.00",
        haircut: "0.00",
        collateralQuantity: "0",
        pledgeQuantity: "0",
        collateralValue: "0.00",
        action: "",
        exit: ""
      },
      {
        symbol: "MSFT",
        type: "BUY",
        quantity: "121/0",
        t1Quantity: "0",
        usedQty: "0",
        daysPnL: "0.00",
        netPnL: "0.00",
        buyAvgPrice: "4660.78",
        ltp: "0.00",
        totalHoldingQ: "0",
        sellAvgPrice: "0.00",
        investedValue: "0.00",
        marketValue: "0.00",
        haircut: "0.00",
        collateralQuantity: "0",
        pledgeQuantity: "0",
        collateralValue: "0.00",
        action: "",
        exit: ""
      },
      {
        symbol: "TSLA",
        type: "SELL",
        quantity: "183/0",
        t1Quantity: "0",
        usedQty: "0",
        daysPnL: "0.00",
        netPnL: "0.00",
        buyAvgPrice: "0.00",
        ltp: "0.00",
        totalHoldingQ: "0",
        sellAvgPrice: "4060.68",
        investedValue: "0.00",
        marketValue: "0.00",
        haircut: "0.00",
        collateralQuantity: "0",
        pledgeQuantity: "0",
        collateralValue: "0.00",
        action: "",
        exit: ""
      },
      {
        symbol: "TSLA",
        type: "BUY",
        quantity: "382/0",
        t1Quantity: "0",
        usedQty: "0",
        daysPnL: "0.00",
        netPnL: "0.00",
        buyAvgPrice: "4019.24",
        ltp: "0.00",
        totalHoldingQ: "0",
        sellAvgPrice: "0.00",
        investedValue: "0.00",
        marketValue: "0.00",
        haircut: "0.00",
        collateralQuantity: "0",
        pledgeQuantity: "0",
        collateralValue: "0.00",
        action: "",
        exit: ""
      },
      {
        symbol: "TSLA",
        type: "SELL",
        quantity: "89/0",
        t1Quantity: "0",
        usedQty: "0",
        daysPnL: "0.00",
        netPnL: "0.00",
        buyAvgPrice: "0.00",
        ltp: "0.00",
        totalHoldingQ: "0",
        sellAvgPrice: "1478.39",
        investedValue: "0.00",
        marketValue: "0.00",
        haircut: "0.00",
        collateralQuantity: "0",
        pledgeQuantity: "0",
        collateralValue: "0.00",
        action: "",
        exit: ""
      }
    ];
  }

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable(searchData: any = {}) {
    this.logger.debug('Loading trade stats with pagination:', { page: this.currentPage, pageSize: this.pageSize });

    const skip = (this.currentPage - 1) * this.pageSize;
    const limit = this.pageSize;

    const payload: any = {
      pagination: { skip, limit },
      searchData: searchData,
      isOrderBook: true,
      isTradeBook: false,
      isPositionBook: false,
      isHoldings: false
    };

    this.httpService.getTradeStats(payload).subscribe(
      (data) => {
        this.logger.info('Trade stats fetched successfully:', data);
        this.dataSource.data = data.posts; // Assuming API returns `posts` array
        this.totalData = data.totalPosts; // Total items count for pagination
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        this.holdings = data.posts; // Update holdings with the response data
      },
      (error) => {
        this.logger.error('Error fetching trade stats:', error);
        this.toastify.showError('Failed to load trade stats');
      }
    );
  }

  // Handle page changes
  onPageChange(event: PageEvent) {
    this.logger.info('Page change triggered:', event);
    this.currentPage = event.pageIndex + 1; // Page index starts from 0, so add 1
    this.pageSize = event.pageSize; // Update page size
    this.loadTable(this.searchData); // Reload data with new pagination values
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchData'] && this.searchData) {
      this.logger.info('Holdings Search Data:', this.searchData);
      this.loadTable(this.searchData); // Call loadTable with the new search data
    }
  }
}

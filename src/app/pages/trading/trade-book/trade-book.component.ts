import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';  // Import paginator module
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-trade-book',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './trade-book.component.html',
  styleUrls: ['./trade-book.component.scss']
})
export class TradeBookComponent implements OnInit {
  @Input() searchData: any;
  public tradeBook: any[] = [];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]); // Initialize MatTableDataSource with empty array
  displayedColumns: string[] = [
    "symbol",
    "type",
    "qtyFilled",
    "avgPrice",
    "ltp",
    "status",
    "tradedAt",
    "product",
    "orderType",
    "orderNo",
    "exchangeOrderNo",
    "action"
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  constructor() {
    // Directly assigning objects into the array instead of using a nested array.
    this.tradeBook = [
      {
        symbol: "AMZN",
        type: "SELL",
        qtyFilled: "759/833",
        avgPrice: "3528.26",
        product: "NRM",
        orderType: "LIMIT",
        status: "EXECUTED",
        orderNo: "ORD98464",
        exchangeOrderNo: "EXCH916970",
        ltp: "4190.42",
        tradedAt: "15/02/2025 04:31:36",
        action: ["Buy"]
      },
      {
        symbol: "MSFT",
        type: "BUY",
        qtyFilled: "683/514",
        avgPrice: "4701.39",
        product: "MIS",
        orderType: "MARKET",
        status: "EXECUTED",
        orderNo: "ORD709132",
        exchangeOrderNo: "EXCH734882",
        ltp: "3438.11",
        tradedAt: "20/02/2025 18:21:48",
        action: ["Buy"]
      }
      // Add more trade records here as needed...
    ];
  }

  ngOnInit(): void {
    this.dataSource.data = this.tradeBook; // Directly use the array
    console.log(this.dataSource); // This will show the data in the console.
  }
  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator; // Assign paginator to MatTableDataSource
    }
  }

  ngOnChanges() {
    if (this.searchData) {
      console.log('Order Book Search Data:', this.searchData);
      // Handle the search data
    }
  }
}

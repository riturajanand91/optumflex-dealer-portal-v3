import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';  // Import paginator module
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-order-book',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.scss']
})
export class OrderBookComponent implements OnInit {
  @Input() searchData: any;
  public orderBook: any = [];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]); // Initialize MatTableDataSource with empty array
  displayedColumns: string[] = [
    "symbol", "type", "qtyFilled", "orderPrice", "executedAt", "avgPrice", "ltp", "status",
    "date", "validity", "product", "orderType", "xtsOrderId", "exchangeOrderNo", "action"
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.orderBook = [
      {symbol:"AAPL", type:"SELL", qtyFilled:"751/0", orderPrice:"4094.63", executedAt:"0.00", avgPrice:"0.00", ltp:"0.00", status:"REJECTED", date:"02/02/2025 17:08:14", validity:"DAY", product:"MIS", orderType:"LIMIT", xtsOrderId:"554794014", exchangeOrderNo:"", action:""},
      {symbol:"AMZN", type:"SELL", qtyFilled:"385/0", orderPrice:"1494.04", executedAt:"0.00", avgPrice:"0.00", ltp:"0.00", status:"PARTIALLY EXECUTED", date:"07/02/2025 07:05:22", validity:"DAY", product:"BRR", orderType:"LIMIT", xtsOrderId:"436310558", exchangeOrderNo:"", action:""},
      {symbol:"TSLA", type:"SELL", qtyFilled:"134/0", orderPrice:"2978.91", executedAt:"0.00", avgPrice:"0.00", ltp:"0.00", status:"CANCELLED", date:"06/02/2025 13:31:59", validity:"DAY", product:"NRM", orderType:"STOP", xtsOrderId:"700340716", exchangeOrderNo:"", action:""},
      {symbol:"TSLA", type:"BUY", qtyFilled:"651/0", orderPrice:"4803.50", executedAt:"0.00", avgPrice:"0.00", ltp:"0.00", status:"CANCELLED", date:"01/02/2025 05:09:15", validity:"DAY", product:"NRM", orderType:"MARKET", xtsOrderId:"460387226", exchangeOrderNo:"", action:""},
      {symbol:"AAPL", type:"SELL", qtyFilled:"44/0", orderPrice:"3079.43", executedAt:"0.00", avgPrice:"0.00", ltp:"0.00", status:"CANCELLED", date:"09/02/2025 17:56:53", validity:"DAY", product:"NRM", orderType:"MARKET", xtsOrderId:"637209172", exchangeOrderNo:"", action:""},
      {symbol:"AMZN", type:"BUY", qtyFilled:"745/0", orderPrice:"2882.63", executedAt:"0.00", avgPrice:"0.00", ltp:"0.00", status:"PARTIALLY EXECUTED", date:"15/02/2025 22:18:16", validity:"DAY", product:"MIS", orderType:"STOP", xtsOrderId:"732346546", exchangeOrderNo:"", action:""},
      {symbol:"MSFT", type:"BUY", qtyFilled:"121/0", orderPrice:"4660.78", executedAt:"0.00", avgPrice:"0.00", ltp:"0.00", status:"PARTIALLY EXECUTED", date:"02/02/2025 01:04:44", validity:"DAY", product:"MIS", orderType:"STOP", xtsOrderId:"591150188", exchangeOrderNo:"", action:""},
      {symbol:"TSLA", type:"SELL", qtyFilled:"183/0", orderPrice:"4060.68", executedAt:"0.00", avgPrice:"0.00", ltp:"0.00", status:"PARTIALLY EXECUTED", date:"31/01/2025 17:21:12", validity:"DAY", product:"MIS", orderType:"STOP", xtsOrderId:"886728085", exchangeOrderNo:"", action:""},
      {symbol:"TSLA", type:"BUY", qtyFilled:"382/0", orderPrice:"4019.24", executedAt:"0.00", avgPrice:"0.00", ltp:"0.00", status:"EXECUTED", date:"14/02/2025 10:06:47", validity:"DAY", product:"BRR", orderType:"MARKET", xtsOrderId:"816087944", exchangeOrderNo:"", action:""},
      {symbol:"TSLA", type:"SELL", qtyFilled:"89/0", orderPrice:"1478.39", executedAt:"0.00", avgPrice:"0.00", ltp:"0.00", status:"REJECTED", date:"01/02/2025 18:39:14", validity:"DAY", product:"BRR", orderType:"LIMIT", xtsOrderId:"749847732", exchangeOrderNo:"", action:""}
    ];
  }

  ngOnInit(): void {
    // Assign the data to MatTableDataSource
    this.dataSource.data = this.orderBook;
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

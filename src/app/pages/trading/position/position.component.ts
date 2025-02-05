import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';  // Import paginator module
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-position',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './position.component.html',
  styleUrl: './position.component.scss'
})
export class PositionComponent {
  @Input() searchData: any;
  public position: any = [];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]); // Initialize MatTableDataSource with empty array
  displayedColumns: string[] = [
    "symbol",
    "type",
    "product",
    "buyQty",
    "buyAvgPrice",
    "buyValue",
    "ltp",
    "dayPnL",
    "netPnL",
    "netAvg",
    "netQty",
    "netValue",
    "totalTurnover",
    "sellQty",
    "sellAvgPrice",
    "sellValue",
    "realizedMtm",
    "unrealizedMtm",
    // "closePrice",
    "action",
    "exit"
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor() {
    this.position = [
      {
        symbol: "AAPL",
        type: "SELL",
        product: "MIS",
        buyQty: "751/0",
        buyAvgPrice: "4094.63",
        buyValue: "0.00",
        ltp: "0.00",
        dayPnL: "0.00",
        netPnL: "REJECTED",
        netAvg: "02/02/2025 17:08:14",
        netQty: "DAY",
        netValue: "LIMIT",
        totalTurnover: "554794014",
        sellQty: "",
        sellAvgPrice: "",
        sellValue: "",
        realizedMtm: "",
        unrealizedMtm: "",
        action: "",
        exit: ""
      },
      {
        symbol: "AMZN",
        type: "SELL",
        product: "BRR",
        buyQty: "385/0",
        buyAvgPrice: "1494.04",
        buyValue: "0.00",
        ltp: "0.00",
        dayPnL: "0.00",
        netPnL: "PARTIALLY EXECUTED",
        netAvg: "07/02/2025 07:05:22",
        netQty: "DAY",
        netValue: "LIMIT",
        totalTurnover: "436310558",
        sellQty: "",
        sellAvgPrice: "",
        sellValue: "",
        realizedMtm: "",
        unrealizedMtm: "",
        action: "",
        exit: ""
      },
      {
        symbol: "TSLA",
        type: "SELL",
        product: "NRM",
        buyQty: "134/0",
        buyAvgPrice: "2978.91",
        buyValue: "0.00",
        ltp: "0.00",
        dayPnL: "0.00",
        netPnL: "CANCELLED",
        netAvg: "06/02/2025 13:31:59",
        netQty: "DAY",
        netValue: "STOP",
        totalTurnover: "700340716",
        sellQty: "",
        sellAvgPrice: "",
        sellValue: "",
        realizedMtm: "",
        unrealizedMtm: "",
        action: "",
        exit: ""
      },
      {
        symbol: "TSLA",
        type: "BUY",
        product: "NRM",
        buyQty: "651/0",
        buyAvgPrice: "4803.50",
        buyValue: "0.00",
        ltp: "0.00",
        dayPnL: "0.00",
        netPnL: "CANCELLED",
        netAvg: "01/02/2025 05:09:15",
        netQty: "DAY",
        netValue: "MARKET",
        totalTurnover: "460387226",
        sellQty: "",
        sellAvgPrice: "",
        sellValue: "",
        realizedMtm: "",
        unrealizedMtm: "",
        action: "",
        exit: ""
      },
      {
        symbol: "AAPL",
        type: "SELL",
        product: "NRM",
        buyQty: "44/0",
        buyAvgPrice: "3079.43",
        buyValue: "0.00",
        ltp: "0.00",
        dayPnL: "0.00",
        netPnL: "CANCELLED",
        netAvg: "09/02/2025 17:56:53",
        netQty: "DAY",
        netValue: "MARKET",
        totalTurnover: "637209172",
        sellQty: "",
        sellAvgPrice: "",
        sellValue: "",
        realizedMtm: "",
        unrealizedMtm: "",
        action: "",
        exit: ""
      },
      {
        symbol: "AMZN",
        type: "BUY",
        product: "MIS",
        buyQty: "745/0",
        buyAvgPrice: "2882.63",
        buyValue: "0.00",
        ltp: "0.00",
        dayPnL: "0.00",
        netPnL: "PARTIALLY EXECUTED",
        netAvg: "15/02/2025 22:18:16",
        netQty: "DAY",
        netValue: "STOP",
        totalTurnover: "732346546",
        sellQty: "",
        sellAvgPrice: "",
        sellValue: "",
        realizedMtm: "",
        unrealizedMtm: "",
        action: "",
        exit: ""
      },
      {
        symbol: "MSFT",
        type: "BUY",
        product: "MIS",
        buyQty: "121/0",
        buyAvgPrice: "4660.78",
        buyValue: "0.00",
        ltp: "0.00",
        dayPnL: "0.00",
        netPnL: "PARTIALLY EXECUTED",
        netAvg: "02/02/2025 01:04:44",
        netQty: "DAY",
        netValue: "STOP",
        totalTurnover: "591150188",
        sellQty: "",
        sellAvgPrice: "",
        sellValue: "",
        realizedMtm: "",
        unrealizedMtm: "",
        action: "",
        exit: ""
      },
      {
        symbol: "TSLA",
        type: "SELL",
        product: "MIS",
        buyQty: "183/0",
        buyAvgPrice: "4060.68",
        buyValue: "0.00",
        ltp: "0.00",
        dayPnL: "0.00",
        netPnL: "PARTIALLY EXECUTED",
        netAvg: "31/01/2025 17:21:12",
        netQty: "DAY",
        netValue: "STOP",
        totalTurnover: "886728085",
        sellQty: "",
        sellAvgPrice: "",
        sellValue: "",
        realizedMtm: "",
        unrealizedMtm: "",
        action: "",
        exit: ""
      },
      {
        symbol: "TSLA",
        type: "BUY",
        product: "BRR",
        buyQty: "382/0",
        buyAvgPrice: "4019.24",
        buyValue: "0.00",
        ltp: "0.00",
        dayPnL: "0.00",
        netPnL: "EXECUTED",
        netAvg: "14/02/2025 10:06:47",
        netQty: "DAY",
        netValue: "MARKET",
        totalTurnover: "816087944",
        sellQty: "",
        sellAvgPrice: "",
        sellValue: "",
        realizedMtm: "",
        unrealizedMtm: "",
        action: "",
        exit: ""
      },
      {
        symbol: "TSLA",
        type: "SELL",
        product: "BRR",
        buyQty: "89/0",
        buyAvgPrice: "1478.39",
        buyValue: "0.00",
        ltp: "0.00",
        dayPnL: "0.00",
        netPnL: "REJECTED",
        netAvg: "01/02/2025 18:39:14",
        netQty: "DAY",
        netValue: "LIMIT",
        totalTurnover: "749847732",
        sellQty: "",
        sellAvgPrice: "",
        sellValue: "",
        realizedMtm: "",
        unrealizedMtm: "",
        action: "",
        exit: ""
      }
    ];

  }

  ngOnInit(): void {
    // Assign the data to MatTableDataSource
    this.dataSource.data = this.position;
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

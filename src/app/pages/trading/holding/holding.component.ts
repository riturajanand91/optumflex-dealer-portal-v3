import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';  // Import paginator module
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-holding',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './holding.component.html',
  styleUrl: './holding.component.scss'
})
export class HoldingComponent {
  public holdings: any = [];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]); // Initialize MatTableDataSource with empty array
  displayedColumns: string[] = [
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


  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort;
  constructor() {
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
    // Assign the data to MatTableDataSource
    this.dataSource.data = this.holdings;
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator; // Assign paginator to MatTableDataSource
    }
  }
}

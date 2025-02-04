import { ChangeDetectionStrategy, Component, OnInit, signal, ViewChild } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { TablerIconsModule } from 'angular-tabler-icons';
import { OrderBookComponent } from "../order-book/order-book.component";
import { TradeBookComponent } from "../trade-book/trade-book.component";
import { PositionComponent } from "../position/position.component";
import { HoldingComponent } from '../holding/holding.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-trade-tabs',
  standalone: true,
  imports: [
    MatTabsModule,
    CommonModule,
    MaterialModule,
    TablerIconsModule,
    OrderBookComponent,
    TradeBookComponent,
    PositionComponent,
    HoldingComponent,
    MatExpansionModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule
  ],
  templateUrl: './trade-tabs.component.html',
  styleUrls: ['./trade-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradeTabsComponent implements OnInit {
  public searchForm: FormGroup;
  public orderDropdown: any = [];
  readonly panelOpenState = signal(false);

  public formFields = {
    tradeBook: [
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
    ],
    holdings: [
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
    ],
    position: [
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
      "action",
      "exit"
    ],
    orderBook: [
      "symbol", "type", "qtyFilled", "orderPrice", "executedAt", "avgPrice", "ltp", "status",
      "date", "validity", "product", "orderType", "xtsOrderId", "exchangeOrderNo", "action"
    ],
  };
  public activeTabIndex: number = 0;
  public tabWiseData: any = {
    orderBook: {},
    tradeBook: {},
    position: {},
    holdings: {},
  }
  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({});
  }

  ngOnInit() {
    this.initializeForm(this.formFields.orderBook);
  }

  initializeForm(fields: string[]) {
    const formGroupConfig = fields.reduce((config: any, field) => {
      config[field] = [];
      return config;
    }, {});
    formGroupConfig['sortingOrder'] = []; // Add form control for radio buttons
    formGroupConfig['sortingColumn'] = []; // Add form control for radio buttons
    this.orderDropdown = fields;
    this.searchForm = this.fb.group(formGroupConfig);
    console.log('Form Initialized', fields);
  }

  months: any[] = [
    { value: 'mar', viewValue: 'March 2023' },
    { value: 'apr', viewValue: 'April 2023' },
    { value: 'june', viewValue: 'June 2023' },
  ];
  onTabChange(event: MatTabChangeEvent) {
    this.activeTabIndex = event.index;
    let fields: string[] = [];
    switch (event.index) {
      case 0: // Order Book
        fields = this.formFields.orderBook;
        console.log('Active Tab Index', fields);

        break;
      case 1: // Trade Book
        fields = this.formFields.tradeBook;
        break;
      case 2: // Position
        fields = this.formFields.position;
        break;
      case 3: // Holdings
        fields = this.formFields.holdings;
        break;
      // Add more cases for other tabs if needed
    }
    this.initializeForm(fields);
  }
  onSubmit() {
    if (this.searchForm.valid) {
      let searchData = this.searchForm.value;

      // Remove fields with null values
      searchData = Object.fromEntries(Object.entries(searchData).filter(([_, v]) => v !== null));

      console.log('Form Submitted', searchData);

      switch (this.activeTabIndex) {
        case 0:// Order Book
          this.tabWiseData.orderBook = searchData;
          break;
        case 1:// Trade Book
          this.tabWiseData.tradeBook = searchData;
          break;
        case 2:// Position
          this.tabWiseData.position = searchData;
          break;
        case 3:// Holdings
          this.tabWiseData.holdings = searchData;
          break;
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
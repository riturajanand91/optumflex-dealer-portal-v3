import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


import { MaterialModule } from 'src/app/material.module';
import { OrderBookComponent } from "../order-book/order-book.component";
import { TradeBookComponent } from "../trade-book/trade-book.component";
import { PositionComponent } from "../position/position.component";
import { HoldingComponent } from '../holding/holding.component';

import { ToastifyService } from 'src/app/services/toastify.service';
import { LoggerService } from 'src/app/services/logger.service';
import { TradeService } from 'src/app/services/trade.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trade-tabs',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    OrderBookComponent,
    TradeBookComponent,
    PositionComponent,
    HoldingComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './trade-tabs.component.html',
  styleUrls: ['./trade-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradeTabsComponent implements OnInit {
  private loadTableSubscription: Subscription;
  public orderDropdown: any = [];
  readonly panelOpenState = signal(false);
  public activeTabIndex: number = 0; // Ensure this is set to 0
  public tabWiseData: any = {
    orderBook: {},
    tradeBook: {},
    position: {},
    holdings: {},
  };
  public searchData: any = {};

  constructor(
    private toastify: ToastifyService,
    private logger: LoggerService,
    private tradeService: TradeService
  ) {
    // this.searchForm = this.fb.group({});

  }

  ngOnInit() {
    console.log('activeTabIndex',this.activeTabIndex);
    this.orderDropdown = this.tradeService.formFields.orderBook;
    this.searchData = this.searchForm.value;
  }

  public searchForm = new FormGroup({
    F_column1: new FormControl(""),
    F_column2: new FormControl(""),
    F_column3: new FormControl(""),
    F_column4: new FormControl(""),
    F_column5: new FormControl(""),
    F_column6: new FormControl(""),
    sortingOrder: new FormControl("desc"),
    sortingColumn: new FormControl("")
  });

  public onSubmit() {
    try {
      if (this.searchForm.valid) {
        console.log(this.searchForm.value);
        this.searchData = this.searchForm.value;
        this.logger.debug('Form Submitted', this.searchData);
      } else {
        this.logger.warn('Form is invalid');
      }
    } catch (error) {
      this.logger.error('Error submitting form:', error);
      this.toastify.showError('Failed to submit form');
    }
  }

  public onReset() {
    this.searchForm.reset({
      F_column1: "",
      F_column2: "",
      F_column3: "",
      F_column4: "",
      F_column5: "",
      F_column6: "",
      sortingOrder: "desc",
      sortingColumn: ""
    });
  }
}
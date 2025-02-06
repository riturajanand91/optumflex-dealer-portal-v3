import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { PageEvent } from '@angular/material/paginator';

import { MaterialModule } from 'src/app/material.module';
import { OrderBookComponent } from "../order-book/order-book.component";
import { TradeBookComponent } from "../trade-book/trade-book.component";
import { PositionComponent } from "../position/position.component";
import { HoldingComponent } from '../holding/holding.component';

import { HttpService } from './../../../services/http.service';
import { ToastifyService } from 'src/app/services/toastify.service';
import { LoggerService } from 'src/app/services/logger.service';
import { TradeTabsService } from 'src/app/services/trade-tabs.service';

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
  public orderDropdown: any = [];
  readonly panelOpenState = signal(false);
  public activeTabIndex: number = 0;
  public tabWiseData: any = {
    orderBook: {},
    tradeBook: {},
    position: {},
    holdings: {},
  };
  public totalCount: number = 0; // To hold the total number of posts
  public pageSize: number = 10; // Default page size
  public currentPage: number = 1; // Current page
  public tableData: any = [];

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private toastify: ToastifyService,
    private logger: LoggerService,
    private tradeTabsService: TradeTabsService
  ) {
    // this.searchForm = this.fb.group({});
  }

  ngOnInit() {
    try {
      this.orderDropdown = this.tradeTabsService.formFields.orderBook;
      this.loadTable();
    } catch (error) {
      this.logger.error('Error during initialization:', error);
      this.toastify.showError('Failed to initialize component');
    }
  }

  public searchForm = new FormGroup({
    F_column1: new FormControl(""),
    F_column2: new FormControl(""),
    sortingOrder: new FormControl("desc"),
    sortingColumn: new FormControl("")
  });

  public loadTable() {
    try {
      const skip = (this.currentPage - 1) * this.pageSize;
      const limit = this.pageSize;
      const payload: any = {
        pagination: { skip, limit },
        searchData: this.searchForm.value,
        isOrderBook: this.activeTabIndex === 0,
        isTradeBook: this.activeTabIndex === 1,
        isPositionBook: this.activeTabIndex === 2,
        isHoldings: this.activeTabIndex === 3
      };
      this.assignTabWiseData(this.tradeTabsService.sampleDataSet);
      this.httpService.getTradeStats(payload).subscribe(
        (data) => {
          this.logger.info('Trade stats fetched successfully:', data);
          this.totalCount = data.totalPosts; // Total items count for pagination
          this.assignTabWiseData(this.tradeTabsService.sampleDataSet);
        },
        (error) => {
          this.logger.error('Error fetching trade stats:', error);
          this.toastify.showError('Failed to load trade stats');
        }
      );
    } catch (error) {
      this.logger.error('Error loading table:', error);
      this.toastify.showError('Failed to load table data');
    }
  }

  onTabChange(event: MatTabChangeEvent) {
    try {
      this.activeTabIndex = event.index;
      let fields: string[] = [];
      switch (event.index) {
        case 0: // Order Book
          this.orderDropdown = this.tradeTabsService.formFields.orderBook;
          break;
        case 1: // Trade Book
          this.orderDropdown = this.tradeTabsService.formFields.tradeBook;
          break;
        case 2: // Position
          this.orderDropdown = this.tradeTabsService.formFields.position;
          break;
        case 3: // Holdings
          this.orderDropdown = this.tradeTabsService.formFields.holdings;
          fields = this.tradeTabsService.formFields.holdings;
          break;
      }
      this.searchForm.reset({
        F_column1: "",
        F_column2: "",
        sortingOrder: "desc",
        sortingColumn: ""
      });
      this.loadTable();
    } catch (error) {
      this.logger.error('Error changing tab:', error);
      this.toastify.showError('Failed to change tab');
    }
  }

  public onPageChange(event: PageEvent) {
    try {
      this.currentPage = event.pageIndex + 1; // Page index starts from 0, so add 1
      this.pageSize = event.pageSize; // Update page size
      this.loadTable(); // Reload data with new pagination values
    } catch (error) {
      this.logger.error('Error changing page:', error);
      this.toastify.showError('Failed to change page');
    }
  }

  public onSubmit() {
    try {
      if (this.searchForm.valid) {
        let searchData = this.searchForm.value;
        this.logger.debug('Form Submitted', searchData);
        this.assignTabWiseData(searchData);
        this.loadTable();
      } else {
        this.logger.warn('Form is invalid');
      }
    } catch (error) {
      this.logger.error('Error submitting form:', error);
      this.toastify.showError('Failed to submit form');
    }
  }

  public assignTabWiseData(data: any) {
    try {
      this.logger.debug('Assigning tab wise data', data);
      switch (this.activeTabIndex) {
        case 0:
          this.tableData = data.orderBook;
          break;
        case 1:
          this.tableData = data?.tradeBook;
          break;
        case 2:
          this.tableData = data.position;
          break;
        case 3:
          this.tableData = data.holdings;
          break;
      }
    } catch (error) {
      this.logger.error('Error assigning tab wise data:', error);
      this.toastify.showError('Failed to assign tab wise data');
    }
  }
}
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { LoggerService } from 'src/app/services/logger.service';
import { AuthService } from 'src/app/services/auth.service';
import { MaterialModule } from 'src/app/material.module';
import { ToastifyService } from 'src/app/services/toastify.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-position-table',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './position-table.component.html',
  styleUrl: './position-table.component.scss'
})
export class PositionTableComponent implements OnInit {
  public isLoading: boolean = false;
  public displayedColumns: string[] = ['symbol', 'investment', 'unrealizedProfit', 'realizedProfit'];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  public closedPositionsData: any[] = [];
  public openPositionsData: any[] = [];
  @Input() tableName: any; //closedPositions openPositions

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private toastify: ToastifyService,
    private logger: LoggerService
  ) { }

  ngOnInit() {
    console.log(this.tableName)
    this.logger.info('dashboard initialized');
    this.loadResults();
  }

  public loadResults() {
    this.isLoading = true;
    this.logger.debug('Position Component - Loading Position Results for page:');
    const skip = 0
    const limit = 30;
    const payload: any = {
      skip: skip,
      limit: limit,
      isOrderBook: false,
      isTradeBook: false,
      isPositionBook: true,
      isHoldings: false,
      F_column1: "",
      F_column2: "",
      F_column3: "",
      F_column4: "",
      F_column5: "",
      F_column6: "",
      sortingOrder: "desc",
      sortingColumn: ""
    }
    this.httpService.getTradeData(payload).subscribe(
      (data) => {
        console.log(data);
        this.logger.info("Position Component - Data fetched from API:", data);
        // Clear existing data
        this.closedPositionsData = [];
        this.openPositionsData = [];
        this.sortAndStoreData(data?.transaction_data);
        this.updateDataSource();
        this.logger.debug("Position Component - DataSource updated:", this.dataSource);
        this.isLoading = false;
        this.toastify.showSuccess('Position data loaded successfully');
      },
      (error) => {
        this.isLoading = false;
        this.logger.error('Position Component - Error fetching posts:', error);
        this.toastify.showError('Failed to load Position data');
      }
    );
  }

  private sortAndStoreData(data: any[]) {
    // Sort by transaction_date in descending order and pick top 5
    const sortedClosedPosition = data.sort((a, b) => new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime()).slice(0, 5);
    const sortedOpenPosition = data.sort((a, b) => new Date(b.square_off_time).getTime() - new Date(a.square_off_time).getTime()).slice(0, 5);
    console.log(sortedClosedPosition)
    console.log(sortedOpenPosition)
    this.closedPositionsData = sortedClosedPosition
    this.openPositionsData =sortedOpenPosition
  }

  private updateDataSource() {
    if (this.tableName === 'closedPositions') {
      this.dataSource.data = this.closedPositionsData;
    } else if (this.tableName === 'openPositions') {
      this.dataSource.data = this.openPositionsData;
    }
  }
}
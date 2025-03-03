import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { LoggerService } from 'src/app/services/logger.service';
import { AuthService } from 'src/app/services/auth.service';
import { MaterialModule } from 'src/app/material.module';
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
    private logger: LoggerService
  ) { }

  ngOnInit() {
    console.log(this.tableName);
    this.logger.info('PositionTableComponent initialized with tableName:', this.tableName);
    this.loadResults();
  }

  public async loadResults() {
    this.isLoading = true;
    this.logger.debug('PositionTableComponent - Loading Position Results for table:', this.tableName);
    const skip = 0;
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
    };
    try {
      const data = await this.httpService.getTradeData(payload).toPromise();
      this.logger.info("PositionTableComponent - Data fetched from API:", data);
      // Clear existing data
      this.closedPositionsData = [];
      this.openPositionsData = [];
      await this.sortAndStoreData(data?.transaction_data);
      this.updateDataSource();
      this.logger.debug("PositionTableComponent - DataSource updated:", this.dataSource);
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      this.logger.error('PositionTableComponent - Error fetching data:', error);
    }
  }

  private async sortAndStoreData(data: any[]): Promise<void> {
    try {
      // Sort by transaction_date in descending order and pick top 5
      const sortedClosedPosition = data.sort((a, b) => new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime()).slice(0, 5);
      const sortedOpenPosition = data.sort((a, b) => new Date(b.square_off_time).getTime() - new Date(a.square_off_time).getTime()).slice(0, 5);
      this.closedPositionsData = sortedClosedPosition;
      this.openPositionsData = sortedOpenPosition;
      this.logger.debug("PositionTableComponent - Sorted Closed Positions:", sortedClosedPosition);
      this.logger.debug("PositionTableComponent - Sorted Open Positions:", sortedOpenPosition);
    } catch (error) {
      this.logger.error('PositionTableComponent - Error sorting data:', error);
    }
  }

  private updateDataSource() {
    try {
      if (this.tableName === 'closedPositions') {
        this.dataSource.data = this.closedPositionsData;
      } else if (this.tableName === 'openPositions') {
        this.dataSource.data = this.openPositionsData;
      }
      this.logger.debug("PositionTableComponent - DataSource updated for table:", this.tableName);
    } catch (error) {
      this.logger.error('PositionTableComponent - Error updating dataSource:', error);
    }
  }
}
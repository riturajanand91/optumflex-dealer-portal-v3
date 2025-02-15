import { TradeService } from 'src/app/services/trade.service';
import { ChangeDetectionStrategy, Component, signal, OnInit, ViewChild, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';  // Import paginator module
import { ToastifyService } from 'src/app/services/toastify.service';
import { LoggerService } from 'src/app/services/logger.service';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-holding',
  standalone: true,
  imports: [
    MaterialModule,
    MatTableModule
  ],
  templateUrl: './holding.component.html',
  styleUrl: './holding.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoldingComponent {
  @Input() searchData: any;
  @Input() tableData: any = [];
  @Input() totalCount: number = 0;
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  public displayedColumns: string[];

  constructor(
    private toastify: ToastifyService,
    private logger: LoggerService,
    private tradeService: TradeService
  ) {
    this.displayedColumns = this.tradeService.tableHeaders.holdings;
  }

  ngOnChanges(changes: SimpleChanges) {
    try {
      if (changes['tableData'] && this.tableData) {
        this.logger.debug('Binding Table data');
        this.dataSource.data = this.tableData;
        console.log(this.dataSource.data)
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
      }
    } catch (error) {
      this.logger.error('Error updating table data:', error);
      this.toastify.showError('Failed to update table data');
    }
  }

  // Handle page changes
  onPageChange(event: PageEvent) {
    try {
      this.pageChange.emit(event);
      this.logger.debug('Page Changed');
    } catch (error) {
      this.logger.error('Error handling page change:', error);
      this.toastify.showError('Failed to change page');
    }
  }
}
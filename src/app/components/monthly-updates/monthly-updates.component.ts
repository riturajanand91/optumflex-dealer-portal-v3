import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from 'src/app/material.module';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-monthly-updates',
  standalone: true,
  imports: [CommonModule, MaterialModule, NgApexchartsModule],
  templateUrl: './monthly-updates.component.html',
  styleUrl: './monthly-updates.component.scss'
})
export class MonthlyUpdatesComponent implements OnInit {
  public monthlyOverviewChart!: Partial<any> | any;
  public isLoading: boolean = false;
  constructor(private logger: LoggerService) { }

  ngOnInit() {
    this.logger.info('dashboard initialized');
    this.loadChart()
  }

  public loadChart(){
    this.monthlyOverviewChart = {
      series: [
        {
          name: "basic",
          data: [400, 430, 448, 470, 540, 580]
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false
        },
      },

      plotOptions: {
        bar: {
          borderRadius: 3,
          horizontal: false,
          columnWidth: "30%"
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: true,
        position: "bottom", // Position options: top, bottom, right, left
        horizontalAlign: "center",
        markers: {
          width: 12,
          height: 12,
          radius: 12
        },
        fontSize: "14px",
        fontWeight: 600
      },
      xaxis: {
        categories: [
          "Apr",
          "May",
          "Jun",
          "July",
          "Aug",
          "Sep"
        ]
      }
    };
  }
}

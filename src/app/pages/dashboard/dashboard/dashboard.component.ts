import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { HttpService } from 'src/app/services/http.service';
import { ToastifyService } from '../../../services/toastify.service';
import { LoggerService } from 'src/app/services/logger.service';
import { AuthService } from 'src/app/services/auth.service';
import { ApexChart, ChartComponent, ApexDataLabels, ApexLegend, ApexStroke, ApexTooltip, ApexAxisChartSeries, ApexPlotOptions, ApexResponsive, NgApexchartsModule, ApexXAxis, } from 'ng-apexcharts';
import { PositionTableComponent } from "../../../components/position-table/position-table.component";
import { UtilityService } from 'src/app/services/utility.service';
import { MonthlyUpdatesComponent } from "../../../components/monthly-updates/monthly-updates.component";
import { InvestmentGrowthComponent } from "../../../components/investment-growth/investment-growth.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule, NgApexchartsModule, PositionTableComponent, MonthlyUpdatesComponent, InvestmentGrowthComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public monthlyChart!: Partial<any> | any;
  public yearlyChart!: Partial<any> | any;
  public user: any = null;
  public isLoading: boolean = false;

  public gainersLosers: any = {
    gainers: {
      sum: 0,
      listData: []
    },
    losers: {
      sum: 0,
      listData: []
    }
  }
  public transactions = [
    { date: '3 Mar 2025', todayInvestment: 3000000, profit: 50000, perCallProfit: 250 },
    { date: '2 Mar 2025', todayInvestment: 25000, profit: 12000, perCallProfit: 250 },
    { date: '1 Mar 2025', todayInvestment: 20000, profit: 11500, perCallProfit: 250 },
    { date: '1 Feb 2025', todayInvestment: 20000, profit: 11500, perCallProfit: 250 },
    { date: '1 Jan 2025', todayInvestment: 20000, profit: 11500, perCallProfit: 250 },
    { date: '1 Feb 2025', todayInvestment: 20000, profit: 11500, perCallProfit: 250 },
    { date: '1 Jan 2025', todayInvestment: 20000, profit: 11500, perCallProfit: 250 },
   
  ];

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private toastify: ToastifyService,
    private utilityService: UtilityService,
    private logger: LoggerService
  ) {
    const userData: any = this.authService.getUser();
    if (userData) {
      this.user = {
        name: userData.first_name + ' ' + userData.last_name,
        avatar: `https://ui-avatars.com/api/?name=${userData?.first_name + ' ' + userData?.last_name}&background=random`,
        role: userData.role,
        email: userData.email,
      };
      this.logger.info(`User ${this.user?.name} is logged in.`);
    } else {
      this.logger.warn('No user is currently logged in.');
    }
    this.initializeCharts();
  }

  ngOnInit() {
    this.logger.info('dashboard initialized');
    this.loadResults();
  }

  public initializeCharts() {
    this.monthlyChart = {
      series: [
        {
          name: '',
          color: '#49BEFF',
          data: [25, 66, 20, 40, 12, 58, 20],
        },
      ],
      chart: {
        type: 'area',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: false,
        },
        height: 60,
        sparkline: {
          enabled: true,
        },
        group: 'sparklines',
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      fill: {
        colors: ['#E8F7FF'],
        type: 'solid',
        opacity: 0.05,
      },
      markers: {
        size: 0,
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false,
        },
      },
    };

    this.yearlyChart = {
      color: "#adb5bd",
      series: [38, 40, 25],
      labels: ["2022", "2021", "2020"],
      chart: {
        width: 300,
        type: "donut",
        fontFamily: "inherit",
        foreColor: "#adb0bb",
      },
      plotOptions: {
        pie: {
          startAngle: 0,
          endAngle: 360,
          donut: {
            size: "75%",
            labels: {
              show: true,
              label: "Total",
            }
          },
        },
      },
      stroke: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: true,
        position: 'bottom'
      },
      colors: ['#5D87FF', '#ECF2FF', '#F9F9FD'],
      responsive: [
        {
          breakpoint: 991,
          options: {
            chart: {
              width: 350,
            },
          },
        },
      ],
      tooltip: {
        theme: "dark",
        fillSeriesColor: false,
      },
    };
  }

  public async loadResults() {
    this.isLoading = true;
    this.logger.debug('PositionTableComponent - Loading Position Results for table:');
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

      await this.sortAndStoreData(data?.transaction_data);
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      this.logger.error('PositionTableComponent - Error fetching data:', error);
      this.toastify.showError('Error fetching data. Please try again later.');
    }
  }

  public async sortAndStoreData(data: any[]): Promise<void> {
    try {
      // Sort by realized in descending & ascending order and pick top 5
      // Top Gainers/ Losers
      const topGainers = data.sort((a, b) => new Date(b.realized).getTime() - new Date(a.realized).getTime()).slice(0, 7);
      const topLosers = data.sort((a, b) => new Date(a.realized).getTime() - new Date(b.realized).getTime()).slice(0, 7);

      // Summmation of Top Gainers/ Losers
      const totalGainers = topGainers.reduce((sum, item) => sum + item.realized, 0);
      const totalLosers = topLosers.reduce((sum, item) => sum + item.realized, 0);

      this.gainersLosers.gainers.listData = topGainers;
      this.gainersLosers.losers.listData = topLosers;
      this.gainersLosers.gainers.sum = totalGainers;
      this.gainersLosers.losers.sum = totalLosers;
      this.logger.debug("DashboardComponent - Gainers Losers Values:", this.gainersLosers);
    } catch (error) {
      this.logger.error('DashboardComponent - Error sorting data:', error);
      this.toastify.showError('Error processing data. Please try again later.');
    }
  }
}
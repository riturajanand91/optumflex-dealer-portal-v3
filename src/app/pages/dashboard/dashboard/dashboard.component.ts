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



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule, NgApexchartsModule, PositionTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public monthlyChart!: Partial<any> | any;
  public salesOverviewChart!: Partial<any> | any;
  public yearlyChart!: Partial<any> | any;
  public dataSet: any;
  user: { name: string; avatar: string; role: string; email: string } | null = null;
  public transactions = [
    { date: '3 Mar 2025', todayInvestment: 3000000, profit: 50000, perCallProfit: 250 },
    { date: '2 Mar 2025', todayInvestment: 25000, profit: 12000, perCallProfit: 250 },
    { date: '1 Mar 2025', todayInvestment: 20000, profit: 11500, perCallProfit: 250 },
    { date: '1 Feb 2025', todayInvestment: 20000, profit: 11500, perCallProfit: 250 },
    { date: '1 Jan 2025', todayInvestment: 20000, profit: 11500, perCallProfit: 250 },
    { date: '12 Jan 2025', todayInvestment: 20000, profit: 11500, perCallProfit: 250 },
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
  }

  initializeCharts() {
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

    this.salesOverviewChart = {
      series: [
        {
          name: "basic",
          data: [400, 430, 448, 470, 540, 580]
        }
      ],
      chart: {
        type: "area",
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

  // Array of dynamic data
  public topGainers = [
    { name: 'RIL', count: 45 },
    { name: 'TCS', count: 55 },
    { name: 'INFY', count: 50 },
    { name: 'HDFC Finance', count: 100 },
    { name: 'SBI', count: 250 }
  ];
  public topLosers = [
    { name: 'NPCL', count: 40 },
    { name: 'SBPDCL', count: 5 },
    { name: 'ORKUT', count: 5 },
    { name: 'ICICI', count: 10 },
    { name: 'BOB', count: 250 }
  ];

  // Sum of all counts (should equal to 500)
  totalCountLosers = this.topGainers.reduce((acc, item) => acc + item.count, 0);
  totalCount = this.topLosers.reduce((acc, item) => acc + item.count, 0);
  earningsData = [
    {
      title: 'Investments',
      todayInvestment: 6820,
      icon: 'assets/images/svgs/icon-master-card-2.svg',
      change: '+9%',
    },
    {
      title: 'Total Profit',
      todayInvestment: 6820,
      icon: 'assets/images/svgs/icon-master-card-2.svg',
      change: '+9%',
    },
    {
      title: 'Running P&L',
      todayInvestment: 6820,
      icon: 'assets/images/svgs/icon-master-card-2.svg',
      change: '+9%',
    },
    {
      title: 'Sales Profit',
      todayInvestment: 6820,
      icon: 'assets/images/svgs/icon-master-card-2.svg',
      change: '+9%',
    },
    // Add more data items as needed
  ];
}
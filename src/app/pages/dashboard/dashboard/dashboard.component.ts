import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { HttpService } from 'src/app/services/http.service';
import { ToastifyService } from '../../../services/toastify.service';
import { LoggerService } from 'src/app/services/logger.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  public dataSet: any;
  public cards = [
    {
      bgColor: 'bg-light-primary',
      textColor: 'text-primary',
      icon: '/assets/images/svgs/icon-user-male.svg',
      title: 'Users',
      value: 0
    },
    {
      bgColor: 'bg-light-warning',
      textColor: 'text-warning',
      icon: '/assets/images/svgs/icon-briefcase.svg',
      title: 'Posts',
      value: 0
    },
    {
      bgColor: 'bg-light-accent',
      textColor: 'text-accent',
      icon: '/assets/images/svgs/icon-mailbox.svg',
      title: 'Comments',
      value: 0
    },
    {
      bgColor: 'bg-light-error',
      textColor: 'text-error',
      icon: '/assets/images/svgs/icon-favorites.svg',
      title: 'Likes',
      value: 0
    },
    {
      bgColor: 'bg-light-success',
      textColor: 'text-success',
      icon: '/assets/images/svgs/icon-speech-bubble.svg',
      title: 'Unread Notifications',
      value: 0
    },
    {
      bgColor: 'bg-light-accent',
      textColor: 'text-accent',
      icon: '/assets/images/svgs/icon-connect.svg',
      title: 'Total Views',
      value: 0
    }
  ];
  user: { name: string; avatar: string; role: string; email: string } | null = null;
  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private toastify: ToastifyService,
    private logger: LoggerService
  ) {
    const userData:any = this.authService.getUser();
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
   }

  ngOnInit() {
    this.logger.info('dashboard initialized');
    this.loadData();
  }
  loadData() {
    this.logger.debug('Loading dashboard data for page:');
    this.httpService.getStats().subscribe(
      (data) => {
        this.dataSet = data;
        this.cards[0].value = data?.usersCount ?? 0; // Default to 0 if undefined or null
        this.cards[1].value = data?.postsCount ?? 0; // Default to 0 if undefined or null
        this.cards[2].value = data?.commentsCount ?? 0; // Default to 0 if undefined or null
        this.cards[3].value = data?.likesCount ?? 0; // Default to 0 if undefined or null
        this.cards[4].value = data?.unreadNotificationsCount ?? 0; // Default to 0 if undefined or null
        this.cards[5].value = data?.viewsCount ?? 0; // Default to 0 if undefined or null

        this.logger.info('Dashboard fetched successfully:', data);
      },
      (error) => {
        this.logger.error('Error fetching dashboard:', error);
        this.toastify.showError('Failed to load dashboard');
      }
    );
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
    amount: 6820,
    icon: 'assets/images/svgs/icon-master-card-2.svg',
    change: '+9%',
  },
  {
    title: 'Total Profit',
    amount: 6820,
    icon: 'assets/images/svgs/icon-master-card-2.svg',
    change: '+9%',
  },
  {
    title: 'Running P&L',
    amount: 6820,
    icon: 'assets/images/svgs/icon-master-card-2.svg',
    change: '+9%',
  },
  {
    title: 'Sales Profit',
    amount: 6820,
    icon: 'assets/images/svgs/icon-master-card-2.svg',
    change: '+9%',
  },
  // Add more data items as needed
];
}

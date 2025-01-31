import { Routes } from '@angular/router';
import { TradeTabsComponent } from './trade-tabs/trade-tabs.component';

export const TradingRoutes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: TradeTabsComponent,
          data: { title: 'Trade tabs Component' } 
        },
        // {
        //   path: 'register',
        //   component: AppSideRegisterComponent,
        // },
      ],
    },
  ];
  
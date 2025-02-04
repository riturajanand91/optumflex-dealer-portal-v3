import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SubscriptionComponent } from './subscription/subscription.component';


export const AccountRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProfileComponent,
      } ,    
      {
        path: 'subscription',
        component: SubscriptionComponent,
      }     
    ],
  },
];
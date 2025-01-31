import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: StarterComponent,
    data: {
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
      ],
    },
  },
  // Remove the posts route from here
];
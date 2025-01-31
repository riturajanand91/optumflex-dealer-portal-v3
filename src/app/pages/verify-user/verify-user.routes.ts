import { Routes } from '@angular/router';
import { VerifyUserComponent } from './verify-user/verify-user.component';

export const VerifyRoutes: Routes = [
    {
      path: '',
      children: [
        {
          path: '',
          component: VerifyUserComponent,
          data: { title: 'User Email Verification' } 
        },
        // {
        //   path: 'register',
        //   component: AppSideRegisterComponent,
        // },
      ],
    },
  ];
  
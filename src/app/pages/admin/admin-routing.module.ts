import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: AdminPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },

      {
        path: 'dashboard',
        children: [
          {
            path: '',
            loadChildren: () => import('./dashboards/dashboards.module').then( m => m.DashboardsPageModule)
          }
        ]
      },

      {
        path: 'feedbacks',
        children: [
          {
            path: '',
            loadChildren: () => import('./feedbacks/feedbacks.module').then(m => m.FeedbacksPageModule),
          }
        ]
      },
      {
        path: 'notifications',
        children: [
          {
            path: '',
            loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsPageModule),
          }
        ]
      },

      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
          }
        ]
      },

      {
        path: '',
        redirectTo: '/admin/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: '',
    redirectTo: '/admin/tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'patients/:patientId',
    loadChildren: () => import('./patients/patients.module').then( m => m.PatientsPageModule)
  },
  {
    path: 'patientsForm',
    loadChildren: () => import('./patients/patients.module').then( m => m.PatientsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}

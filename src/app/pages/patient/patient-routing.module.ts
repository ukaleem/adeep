import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientPage } from './patient.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: PatientPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'feedbacks',
        children: [
          {
            path: '',
            // loadChildren: () => import('./feedbacks/feedbacks.module').then(m => m.FeedbacksPageModule),
            loadChildren: () => import('../admin/feedbacks/feedbacks.module').then(m => m.FeedbacksPageModule),
          }
        ]
      },
      {
        path: 'notifications',
        children: [
          {
            path: '',
            loadChildren: () => import('../admin/notifications/notifications.module').then(m => m.NotificationsPageModule),
          }
        ]
      },
      {
        path: '',
        redirectTo: '/patient/tabs/home',
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
    loadChildren: () => import('../admin/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'feedbacks',
    loadChildren: () => import('../admin/feedbacks/feedbacks.module').then( m => m.FeedbacksPageModule)
  },
  {
    path: '',
    redirectTo: '/patient/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientPageRoutingModule {}

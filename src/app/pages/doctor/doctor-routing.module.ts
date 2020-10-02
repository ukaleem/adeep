import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorPage } from './doctor.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('../admin/notifications/notifications.module').then(m => m.NotificationsPageModule)
      },
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            loadChildren: () => import('../admin/dashboards/dashboards.module').then(m => m.DashboardsPageModule)
          }
        ]
      },
      {
        path: 'feedbacks',
        children: [
          {
            path: '',
            loadChildren: () => import('../admin/feedbacks/feedbacks.module').then(m => m.FeedbacksPageModule),
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorPageRoutingModule {}

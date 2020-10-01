
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhysicianPage } from './physician.page';

const routes: Routes = [
  {
    path: '',
    component: PhysicianPage,
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
        path: 'pathway',
        loadChildren: () => import('./pathway/pathway.module').then( m => m.PathwayPageModule)
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
//../../feedbacks/feedbacks.module
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhysicianPageRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientPage } from './patient.page';

const routes: Routes = [
  {
    path: '',
    component: PatientPage
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
    path: 'feedbacks',
    loadChildren: () => import('./feedbacks/feedbacks.module').then( m => m.FeedbacksPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientPageRoutingModule {}

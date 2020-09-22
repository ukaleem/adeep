import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaretakerPage } from './caretaker.page';

const routes: Routes = [
  {
    path: '',
    component: CaretakerPage
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'feedbacks',
    loadChildren: () => import('./feedbacks/feedbacks.module').then( m => m.FeedbacksPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaretakerPageRoutingModule {}

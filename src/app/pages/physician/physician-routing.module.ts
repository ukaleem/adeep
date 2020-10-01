import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhysicianPage } from './physician.page';

const routes: Routes = [
  {
    path: '',
    component: PhysicianPage
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },  {
    path: 'pathway',
    loadChildren: () => import('./pathway/pathway.module').then( m => m.PathwayPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhysicianPageRoutingModule {}

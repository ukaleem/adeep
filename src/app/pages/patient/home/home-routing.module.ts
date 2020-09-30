import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'single-page-home/:id',
    loadChildren: () => import('./single-page-home/single-page-home.module').then( m => m.SinglePageHomePageModule)
  },
  {
    path: 'previous-careplans/:id',
    loadChildren: () => import('./previous-careplans/previous-careplans.module').then( m => m.PreviousCareplansPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}

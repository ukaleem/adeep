import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CasesPage } from './cases.page';

const routes: Routes = [
  {
    path: '',
    component: CasesPage
  },
  {
    path: 'all-cases',
    loadChildren: () => import('./all-cases/all-cases.module').then( m => m.AllCasesPageModule)
  },
  {
    path: 'single-page/:caseId',
    loadChildren: () => import('./single-page/single-page.module').then( m => m.SinglePagePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class CasesPageRoutingModule {}

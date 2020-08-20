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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasesPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllCasesPage } from './all-cases.page';

const routes: Routes = [
  {
    path: '',
    component: AllCasesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllCasesPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DraftCasesPage } from './draft-cases.page';

const routes: Routes = [
  {
    path: '',
    component: DraftCasesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DraftCasesPageRoutingModule {}

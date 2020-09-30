import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreviousCareplansPage } from './previous-careplans.page';

const routes: Routes = [
  {
    path: '',
    component: PreviousCareplansPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreviousCareplansPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PathwayPage } from './pathway.page';

const routes: Routes = [
  {
    path: '',
    component: PathwayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PathwayPageRoutingModule {}

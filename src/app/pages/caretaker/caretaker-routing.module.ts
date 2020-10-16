import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaretakerPage } from './caretaker.page';

const routes: Routes = [
  {
    path: '',
    component: CaretakerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaretakerPageRoutingModule {}

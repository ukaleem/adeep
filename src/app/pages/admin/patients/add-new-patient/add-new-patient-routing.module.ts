import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewPatientPage } from './add-new-patient.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewPatientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewPatientPageRoutingModule {}

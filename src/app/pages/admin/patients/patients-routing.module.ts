import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientsPage } from './patients.page';

const routes: Routes = [
  {
    path: '',
    component: PatientsPage
  },
  {
    path: 'add-new-patient',
    loadChildren: () => import('./add-new-patient/add-new-patient.module').then( m => m.AddNewPatientPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsPageRoutingModule {}

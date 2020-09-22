import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewPatientPageRoutingModule } from './add-new-patient-routing.module';

import { AddNewPatientPage } from './add-new-patient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewPatientPageRoutingModule
  ],
  declarations: [AddNewPatientPage]
})
export class AddNewPatientPageModule {}

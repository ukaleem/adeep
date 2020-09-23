import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientSingleTaskComponent } from './patients/patient-single-task/patient-single-task.component';
import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule
  ],
  declarations: [AdminPage ,PatientSingleTaskComponent],
  entryComponents: [PatientSingleTaskComponent]
})
export class AdminPageModule {}

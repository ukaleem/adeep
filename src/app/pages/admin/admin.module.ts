import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientSingleTaskComponent } from './patients/patient-single-task/patient-single-task.component';
// import { PatientAssighnTaskComponent } from './patients/patient-single-task/patient-single-task.component';
import { IonicModule } from '@ionic/angular';
import {PatientAssignTaskComponent} from './patients/patient-assighn-task/patient-assighn-task.component';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { from } from 'rxjs';
import { ViewFeedComponent } from './feedbacks/view-feed/view-feed.component';
import { PatientMapComponent } from './patients/patient-map/patient-map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule
  ],
  declarations: [AdminPage ,PatientSingleTaskComponent ,PatientAssignTaskComponent,PatientMapComponent,ViewFeedComponent],
  entryComponents: [PatientSingleTaskComponent ,PatientAssignTaskComponent,PatientMapComponent,ViewFeedComponent]
})
export class AdminPageModule {}

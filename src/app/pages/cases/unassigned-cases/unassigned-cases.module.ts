import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnassignedCasesPageRoutingModule } from './unassigned-cases-routing.module';

import { UnassignedCasesPage } from './unassigned-cases.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnassignedCasesPageRoutingModule
  ],
  declarations: [UnassignedCasesPage]
})
export class UnassignedCasesPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllCasesPageRoutingModule } from './all-cases-routing.module';

import { AllCasesPage } from './all-cases.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllCasesPageRoutingModule
  ],
  declarations: [AllCasesPage]
})
export class AllCasesPageModule {}

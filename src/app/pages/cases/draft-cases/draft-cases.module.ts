import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DraftCasesPageRoutingModule } from './draft-cases-routing.module';

import { DraftCasesPage } from './draft-cases.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DraftCasesPageRoutingModule
  ],
  declarations: [DraftCasesPage]
})
export class DraftCasesPageModule {}

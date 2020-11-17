import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScheduledPageRoutingModule } from './scheduled-routing.module';

import { ScheduledPage } from './scheduled.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduledPageRoutingModule
  ],
  declarations: [ScheduledPage]
})
export class ScheduledPageModule {}

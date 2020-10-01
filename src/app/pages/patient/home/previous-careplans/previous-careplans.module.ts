import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviousCareplansPageRoutingModule } from './previous-careplans-routing.module';

import { PreviousCareplansPage } from './previous-careplans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreviousCareplansPageRoutingModule
  ],
  declarations: [PreviousCareplansPage]
})
export class PreviousCareplansPageModule {}

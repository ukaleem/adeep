import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CaretakerPageRoutingModule } from './caretaker-routing.module';

import { CaretakerPage } from './caretaker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CaretakerPageRoutingModule
  ],
  declarations: [CaretakerPage]
})
export class CaretakerPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SinglePagePageRoutingModule } from './single-page-routing.module';

import { SinglePagePage } from './single-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SinglePagePageRoutingModule
  ],
  declarations: [SinglePagePage]
})
export class SinglePagePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SinglePageHomePageRoutingModule } from './single-page-home-routing.module';

import { SinglePageHomePage } from './single-page-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SinglePageHomePageRoutingModule
  ],
  declarations: [SinglePageHomePage]
})
export class SinglePageHomePageModule {}

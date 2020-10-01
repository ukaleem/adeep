import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PathwayPageRoutingModule } from './pathway-routing.module';

import { PathwayPage } from './pathway.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PathwayPageRoutingModule
  ],
  declarations: [PathwayPage]
})
export class PathwayPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFeedbackPageRoutingModule } from './add-feedback-routing.module';

import { AddFeedbackPage } from './add-feedback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFeedbackPageRoutingModule
  ],
  declarations: [AddFeedbackPage]
})
export class AddFeedbackPageModule {}

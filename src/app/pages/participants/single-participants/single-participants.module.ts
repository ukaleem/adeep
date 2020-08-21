import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleParticipantsPageRoutingModule } from './single-participants-routing.module';

import { SingleParticipantsPage } from './single-participants.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleParticipantsPageRoutingModule
  ],
  declarations: [SingleParticipantsPage]
})
export class SingleParticipantsPageModule {}

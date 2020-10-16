import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleParticipantsPage } from './single-participants.page';

const routes: Routes = [
  {
    path: '',
    component: SingleParticipantsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleParticipantsPageRoutingModule {}

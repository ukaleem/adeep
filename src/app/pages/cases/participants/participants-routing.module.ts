import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParticipantsPage } from './participants.page';

const routes: Routes = [
  {
    path: '',
    component: ParticipantsPage
  },
  {
    path: 'single-participants/:caseId',
    loadChildren: () => import('./single-participants/single-participants.module').then( m => m.SingleParticipantsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParticipantsPageRoutingModule {}

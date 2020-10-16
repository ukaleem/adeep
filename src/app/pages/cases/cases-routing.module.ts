import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CasesPage } from './cases.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: CasesPage,
    children: [ 
      {
        path: 'home',
        loadChildren: () => import('../admin/home/home.module').then( m => m.HomePageModule)
      },

      {
        path: 'inbox',
        children: [
          {
            path: '',
            loadChildren: () => import('./all-cases/all-cases.module').then( m => m.AllCasesPageModule)
          }
        ]
      },

      {
        path: 'unassigned',
        children: [
          {
            path: '',
            loadChildren: () => import('./unassigned-cases/unassigned-cases.module').then(m => m.UnassignedCasesPageModule),
          }
        ]
      },
      {
        path: 'draft',
        children: [
          {
            path: '',
            loadChildren: () => import('./draft-cases/draft-cases.module').then(m => m.DraftCasesPageModule),
          }
        ]
      },
      {
        path: 'participated',
        children: [
          {
            path: '',
            loadChildren: () => import('./participants/participants.module').then(m => m.ParticipantsPageModule),
          }
        ]
      },
      {
        path: '',
        redirectTo: '/cases/tabs/inbox',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'all-cases',
    loadChildren: () => import('./all-cases/all-cases.module').then( m => m.AllCasesPageModule)
  },
  {
    path: 'single-page/:caseId',
    loadChildren: () => import('./single-page/single-page.module').then( m => m.SinglePagePageModule)
  },
  {
    path: 'unassigned-cases',
    loadChildren: () => import('./unassigned-cases/unassigned-cases.module').then( m => m.UnassignedCasesPageModule)
  },
  {
    path: 'draft-cases',
    loadChildren: () => import('./draft-cases/draft-cases.module').then( m => m.DraftCasesPageModule)
  },
  {
    path: '',
    redirectTo: '/cases/tabs/inbox',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class CasesPageRoutingModule {}

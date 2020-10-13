import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'tabs',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // },
  {
    path: '',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cases',
    loadChildren: () => import('./pages/cases/cases.module').then( m => m.CasesPageModule)
  },
  {
    path: 'participants',
    loadChildren: () => import('./pages/cases/participants/participants.module').then( m => m.ParticipantsPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'physician',
    loadChildren: () => import('./pages/physician/physician.module').then( m => m.PhysicianPageModule)
  },
  {
    path: 'caretaker',
    loadChildren: () => import('./pages/caretaker/caretaker.module').then( m => m.CaretakerPageModule)
  },
  {
    path: 'doctor',
    loadChildren: () => import('./pages/doctor/doctor.module').then( m => m.DoctorPageModule)
  },
  {
    path: 'patient',
    loadChildren: () => import('./pages/patient/patient.module').then( m => m.PatientPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

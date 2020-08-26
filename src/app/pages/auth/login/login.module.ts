import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
// import { FirebaseX } from '@ionic-native/firebase-x/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
  
  ],
  entryComponents: [
  ],
  declarations: [LoginPage],
  providers: [],
})
export class LoginPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { LoginSettingComponent } from '../login-setting/login-setting.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
  
  ],
  entryComponents: [LoginSettingComponent
  ],
  declarations: [LoginPage,LoginSettingComponent],
  providers: [],
})
export class LoginPageModule {}

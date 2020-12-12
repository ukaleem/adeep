import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { LoginSettingComponent } from '../login-setting/login-setting.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    TranslateModule
  
  ],
  entryComponents: [LoginSettingComponent
  ],
  declarations: [LoginPage,LoginSettingComponent],
  providers: [],
})
export class LoginPageModule {}

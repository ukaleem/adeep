import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CasesPageRoutingModule } from './cases-routing.module';

import { CasesPage } from './cases.page';
import { StartNewComponent } from './start-new/start-new.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CasesPageRoutingModule
  ],
  declarations: [CasesPage ,StartNewComponent,StartNewComponent],
  entryComponents: [StartNewComponent,StartNewComponent],
  providers: [InAppBrowser],
})
export class CasesPageModule {}

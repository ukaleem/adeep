import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FeedBackSortingFilterPopoverPage } from './shared/popovers/feed-backsorting-popovers';
import { AddFeedComponent } from './pages/admin/feedbacks/add-feed/add-feed.component';
import { AddUserComponent } from './pages/admin/users-list/add-user/add-user.component';
import { UserDetailComponent } from './pages/admin/users-list/user-detail/user-detail.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';


// import { CustomSearchComponent } from './shared/custom-search/custom-search.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    FeedBackSortingFilterPopoverPage,
    AddFeedComponent,
    AddUserComponent,
    UserDetailComponent
  ],
  imports: [HttpClientModule,
    FormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    SharedModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })

  ],
  providers: [
    StatusBar,
    NativeGeocoder,
    // SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  entryComponents: [
    FeedBackSortingFilterPopoverPage,
    AddFeedComponent,
    AddUserComponent,
    UserDetailComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

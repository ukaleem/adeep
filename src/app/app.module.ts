import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FeedBackSortingFilterPopoverPage } from './shared/popovers/feed-backsorting-popovers';
import { AddFeedComponent } from './pages/admin/feedbacks/add-feed/add-feed.component';
import { AddUserComponent } from './pages/admin/users-list/add-user/add-user.component';
// import { CustomSearchComponent } from './shared/custom-search/custom-search.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedBackSortingFilterPopoverPage,
    AddFeedComponent,
    AddUserComponent
  ],
  imports: [HttpClientModule,FormsModule, BrowserModule, IonicModule.forRoot(), SharedModule, AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  entryComponents: [
    FeedBackSortingFilterPopoverPage,
    AddFeedComponent,
    AddUserComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

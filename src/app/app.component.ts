import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
  ) {
    this.initializeApp();
  }

  userName = '';
  userRole = 'Administrator';
  casesShow = false;
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.loadUser();
    });
  }
  logOut(){
    localStorage.clear();
    this.navCtrl.navigateRoot('/');
  }
  loadUser(){
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      this.userName = user.firstname;
    //  this.userRole = user.position;
      if(user.position == 'Administrator'){
        this.casesShow = true;
      }
    }
  }
}

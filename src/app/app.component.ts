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
  USER_ROLE_NAME: any;

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

  ADMIN_OFFICE = false;
  PROCESSMAKER_ADMIN = false;
  PHYSICIAN = false;
  CARETAKER = false;
  DOCTOR = false;
  PATIENT = false;

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.USER_ROLE_NAME = localStorage.getItem('role');
      if(this.USER_ROLE_NAME=="ADMIN_OFFICE"){
        this.ADMIN_OFFICE = true;
        this.USER_ROLE_NAME = 'office admin';
      } else if(this.USER_ROLE_NAME=="PROCESSMAKER_ADMIN"){
        this.PROCESSMAKER_ADMIN = true;
        this.USER_ROLE_NAME = 'processmaker admin';
      } else if(this.USER_ROLE_NAME=="DOCTOR"){
        this.DOCTOR = true;
        this.USER_ROLE_NAME = 'doctor';
      } else if(this.USER_ROLE_NAME=="PATIENT_ROLES"){
        this.PATIENT = true;
        this.USER_ROLE_NAME = 'patient';
      } else if(this.USER_ROLE_NAME=="CARETAKER"){
        this.CARETAKER = true;
        this.USER_ROLE_NAME = 'caretaker';
      } else if(this.USER_ROLE_NAME=="PHYSICIAN"){
        this.PHYSICIAN = true;
        this.USER_ROLE_NAME = 'physician';
      }
      this.loadUser();
    });
  }
  logOut(){
    localStorage.clear();
    this.ADMIN_OFFICE = false;
    this.PROCESSMAKER_ADMIN = false;
    this.PHYSICIAN = false;
    this.CARETAKER = false;
    this.DOCTOR = false;
    this.PATIENT = false;
    this.userName = 'Not Login';
    this.userRole = '';
    this.casesShow = false;
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

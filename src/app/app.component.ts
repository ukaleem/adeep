import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AdminService } from './services/pages-apis/admin.service';

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
    private admin : AdminService
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

  inboxCount: any;
  draftCount: any;
  participatedCount : any;

  allDiseasesCount: any;
  allUsersCount: any;

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.loadData();
      // return;
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

  allData: any = [];
  loadData(){
    this.admin.getDashboard().subscribe(data => {
      this.allData = data;
      this.inboxCount = this.allData.all_data.allCases[1].inbox;
      this.draftCount = this.allData.all_data.allCases[1].draft;
      this.participatedCount = this.allData.all_data.allCases[1].particpate;

      this.allDiseasesCount = this.allData.all_data.allDisease[1].allDiseas;
      this.allUsersCount = this.allData.all_data.allUser[1].allUser;
    });
    //getDashboard
  }
}

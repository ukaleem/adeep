import { Component, OnInit } from '@angular/core';
import { CasesService } from 'src/app/services/pages-apis/cases.service';
import { ModalController } from '@ionic/angular';
import { StartNewComponent } from '../start-new/start-new.component';
// import { SingleCaseComponent } from '../single-case/single-case.component';
// import { Firebase } from '@ionic-native/firebase/ngx';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';
import { AuthService } from 'src/app/services/pages-apis/auth.service';

const { PushNotifications } = Plugins;
@Component({
  selector: 'app-all-cases',
  templateUrl: './all-cases.page.html',
  styleUrls: ['./all-cases.page.scss'],
})
export class AllCasesPage implements OnInit {

  allCases:any = [];
  user_id: any;
  isSearch = false;
  allCassFilter: any = [];
  ionViewWillEnter(){
    this.casesService.getAllProcess().subscribe(data=>{
      console.log(data);
      this.allCases = data;
      this.allCassFilter = this.allCases
    });
  }
  constructor(
    private casesService : CasesService ,
    private modalController:ModalController,
    private loginService: AuthService,
    // private firebase: Firebase
    ) { }

  ngOnInit() {
    console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermission().then( result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        console.log('Token is',token);
        console.log(token);
        // alert('Push registration success, token: ' + token.value);
          // Get User Id Api


          this.loginService.get_user_id().subscribe(user_recorde => {
            if(user_recorde) {
              this.user_id = user_recorde.uid;
                let user = {
                  user_id: this.user_id,
                  user_access_token: token.value,
                  // user_access_token: 'sdkfdkbfkdshfkjdshfkjdshfkjsdhf89823874987239ddjsjfsbhsdsdhfvfsdbhscbwgfuwjsdhf988',
                }
              this.loginService.set_user_token(user).subscribe(response => {
                console.log(response);
              });
            }
          });

      }
    );

    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: StartNewComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  doRefresh(event) {
    this.ionViewWillEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  showSearch() { 
    this.isSearch = true;
  }
  closeSearch() {
    this.isSearch = false;
  }
  searchCase(ev){
    console.log(ev.detail.value);
    let searchTerm = ev.detail.value.toLowerCase();
    if (searchTerm === '') {
      this.allCases = this.allCassFilter;
    } else {
      this.allCases = this.allCassFilter.filter(item => {
        if( item.app_tas_title !== null && item.app_tas_title.toLowerCase().indexOf(searchTerm.toLowerCase() || item.patient !== null && item.patient.toLowerCase().indexOf(searchTerm.toLowerCase())) > -1){
          return true;
        }
        return false;
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CasesService } from 'src/app/services/pages-apis/cases.service';
import { ModalController } from '@ionic/angular';
import { StartNewComponent } from '../start-new/start-new.component';
import { SingleCaseComponent } from '../single-case/single-case.component';
// import { Firebase } from '@ionic-native/firebase/ngx';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';

const { PushNotifications } = Plugins;
@Component({
  selector: 'app-all-cases',
  templateUrl: './all-cases.page.html',
  styleUrls: ['./all-cases.page.scss'],
})
export class AllCasesPage implements OnInit {

  allCases:any = [];
  ionViewWillEnter(){
    this.casesService.getAllProcess().subscribe(data=>{
      console.log(data);
      this.allCases = data;
    });
  }
  constructor(
    private casesService : CasesService ,
    private modalController:ModalController,
    // private firebase: Firebase
    ) { }

      // this.firebase.getToken()
      //   .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
      //   .catch(error => console.error('Error getting token', error));

      // this.firebase.onNotificationOpen()
      //   .subscribe(data => console.log(`User opened a notification ${data}`));

      // this.firebase.onTokenRefresh()
      //   .subscribe((token: string) => console.log(`Got a new token ${token}`));
      //   }

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
        alert('Push registration success, token: ' + token.value);
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



  
}

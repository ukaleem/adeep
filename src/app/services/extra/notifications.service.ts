import { Injectable } from '@angular/core';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed, LocalNotification, NotificationChannel
} from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { EndpointsService } from '../endpoints.service';

const { PushNotifications } = Plugins;
const { LocalNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private api: ApiService,
    private toastController: ToastController,
    private endPoints: EndpointsService) {

    PushNotifications.requestPermission().then(result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        console.log(notification);
        this.localNotifications(notification.data.message);
        this.showToast(notification.data.message);
        // alert('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        // alert('Push action performed: ' + JSON.stringify(notification));
      }
    );


    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    LocalNotifications.requestPermission().then(data => {
      console.log(data);
      const xuz: NotificationChannel = {
        id: '1023',
        importance: 3,
        name: 'pathway',
      };
      LocalNotifications.createChannel(xuz).then(d => {
        console.log(d);
      })
    })
  }

  registerToken() {
    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        console.log('Token is', token);
        console.log(token);

        let user = {
          user_id: localStorage.getItem('id'),
          user_access_token: token.value,
          // user_access_token: 'sdkfdkbfkdshfkjdshfkjdshfkjsdhf89823874987239ddjsjfsbhsdsdhfvfsdbhscbwgfuwjsdhf988',
        }
        this.set_user_token(user).subscribe(response => {
          console.log(response);
        });

      }
    );

  }

  async localNotifications(body) {
    console.log(new Date(new Date().getTime() + 20));
    console.log(new Date().getTime());

    const notifs = await LocalNotifications.schedule({
      notifications: [
        {
          title: "New Pathway",
          body: body,
          channelId : '1023',
          id: new Date().getTime(),
          schedule: { at: new Date(new Date().getTime() + 5000) },
          sound: null,
          attachments: null,
          actionTypeId: "",
          extra: null
        }
      ]
    });

    console.log('scheduled notifications', notifs);
  }

  async showToast(body) {
    const toast = await this.toastController.create({
      header: 'New Notification',
      message: body,
      position: 'top',
      duration: 3000,
      buttons: [
        {
          text: '',
          icon: 'eye',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
  set_user_token(formData) {
    return this.api.commonPost(formData, { isToken: false, endPointUrl: this.endPoints.SET_USER_TOKEN, showLoading: true, showError: true });
  }
}

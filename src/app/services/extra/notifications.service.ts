import { Injectable } from '@angular/core';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed
} from '@capacitor/core';
import { ApiService } from '../api.service';
import { EndpointsService } from '../endpoints.service';

const { PushNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private api: ApiService, private endPoints: EndpointsService) {

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
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );


    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

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

  set_user_token(formData) {
    return this.api.commonPost(formData, { isToken: false, endPointUrl: this.endPoints.SET_USER_TOKEN, showLoading: true, showError: true });
  }
}

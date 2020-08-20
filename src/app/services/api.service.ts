import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { EndpointsService } from './endpoints.service';
import { SharedDataService } from './shared-data.service';
import { LoadingService } from './loading.service';
import { AlertsService } from './alerts.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = '';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Content-Type': undefined
    }),
  };
  constructor(
    private http: HttpClient,
    private api: ConfigService,
    private listApi: EndpointsService,
    private userToken: SharedDataService,
    private loadingLoader: LoadingService,
    private showAlerts: AlertsService,
    private toast: ToastService
  ) {
    this.apiUrl = api.SERVER_API;
  }

  commonPost(dataObject: any, postObject: PostConfigObject): Observable<any> {
    console.log(postObject);
    if (postObject.showLoading) {
      this.loadingLoader.prsentLoading();
    }
    const apiResponse = new Observable((observer) => {
      this.http
        .post(
          this.makeUrl(postObject, false),
          dataObject,
          this.httpOptions
        )
        .subscribe(
          (response) => {
            if (postObject.showLoading) {
              this.loadingLoader.closeLoading();
            }
            if (response && response['error']) {
              this.showAlerts.showAlertNormal(
                response['error'],
                response['message']
                // response['error'],
                // response['message']
              );
              this.toast.ErrorToast('Try Again', 1500);
            }
            console.log(response);
            observer.next(response);
          },
          (error) => {
            this.showAlerts.showAlertNormal(
              'Connection Error!',
              'Error in Connection to Server!'
            );
            if (postObject.showLoading) {
              this.loadingLoader.closeLoading();
            }
            console.log(error);
            observer.error(error);
          }
        );
      return {
        unsubscribe() {
          this.http.post.unsubscribe();
        },
      };
    });
    return apiResponse;
  }

  commonGet(postObject: PostConfigObject): Observable<any> {
    console.log(postObject);
    if (postObject.showLoading) {
      this.loadingLoader.prsentLoading();
    }
    const apiResponse = new Observable((observer) => {
      this.http.get(this.makeUrl(postObject, true), this.httpOptions).subscribe(
        (response) => {
          if (postObject.showLoading) {
            this.loadingLoader.closeLoading();
          }
          if (response && response['error']) {
            this.showAlerts.showAlertNormal(
              response['error'],
              response['message']
            );
          }
          console.log(response);
          observer.next(response);
        },
        (error) => {
          this.showAlerts.showAlertNormal(
            'Error',
            'Error in Connection to Server'
          );
          if (postObject.showLoading) {
            this.loadingLoader.closeLoading();
          }
          console.log(error);
          observer.error(error);
        }
      );
      return {
        unsubscribe() {
          this.http.post.unsubscribe();
        },
      };
    });
    return apiResponse;
  }

  makeUrl(postObject: PostConfigObject, isGet: boolean): string {
    this.apiUrl = this.api.SERVER_API;
    this.apiUrl += postObject.endPointUrl;
    return this.apiUrl;
  }
}

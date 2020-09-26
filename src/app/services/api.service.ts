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
      // 'Authorization': 'Bearer '+'ea25dc52edaad7f2c4df1687cde5781da60dc91d'
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

  setToken(){
    let token  = localStorage.getItem('token_access');
    console.log(token);
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    });
  }
  commonPost(dataObject: any, postObject: PostConfigObject): Observable<any> {
    this.setToken();
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

  commonPut(dataObject: any, postObject: PostConfigObject): Observable<any> {
    this.setToken();
    console.log(postObject);
    if (postObject.showLoading) {
      this.loadingLoader.prsentLoading();
    }
    const apiResponse = new Observable((observer) => {
      this.http
        .put(
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

  commonPutE(dataObject: any, postObject: PostConfigObject): Observable<any> {
    this.setToken();
    console.log(postObject);
    if (postObject.showLoading) {
      this.loadingLoader.prsentLoading();
    }
    const apiResponse = new Observable((observer) => {
      this.http
        .put(
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
              );
              this.toast.ErrorToast('Try Again', 1500);
            }
            console.log(response);
            observer.next(response);
          },
          (error) => {
            if(postObject.showError){
              this.showAlerts.showAlertNormal(
                'Connection Error!',
                'Error in Connection to Server!'
              );
            }
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
    this.setToken();
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
          if (postObject.showLoading) {
            this.loadingLoader.closeLoading();
          }
          if(postObject.showError && postObject.showError == true){
            this.showAlerts.showAlertNormal(
              'Error',
              'Error in Connection to Server'
            );
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

  getUserToken(){
    var allToken = localStorage.getItem('token');
    if(allToken){
      var tokenObject = JSON.parse(allToken);
      return tokenObject.access_token;
    }
  }
  makeUrl(postObject: PostConfigObject, isGet: boolean): string {
    if(postObject.isToken){
    }
      this.apiUrl = postObject.endPointUrl;
    return this.apiUrl;
  }
}

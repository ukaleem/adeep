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
      'Content-Type': 'application/x-www-form-urlencoded',
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
          this.makePostData(dataObject),
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
    isGet
      ? this.getApiUrlGet(postObject.endPointUrl)
      : this.getApiUrl(postObject.endPointUrl);
    if (postObject.isToken) {
      this.apiUrl += '&token=' + this.userToken.USERTOKEN;
    }
    return this.apiUrl;
  }

  getApiUrl(cmd) {
    console.log('Post Service Services');
    this.apiUrl = this.api.SERVER_API;
    if (cmd > 100 && cmd < 200) {
      this.apiUrl += '/' + this.listApi.AUTH;
      if (cmd === 101) {
        this.apiUrl += '?op=' + this.listApi.ADMIN_LOGIN;
      } else if (cmd === 102) {
        this.apiUrl += '?op=' + this.listApi.FORGET_PASSWORD;
      } else if (cmd === 103) {
        this.apiUrl += '?op=' + this.listApi.FORGET_PASSWORD_TOKEN;
      } else if (cmd === 104) {
        this.apiUrl += '?op=' + this.listApi.FORGET_PASSWORD_NEW;
      }
      else if (cmd === 105) {
        this.apiUrl += '?op=' + this.listApi.PROFILE_ADDRESS_UPDATE;
      }else if (cmd === 106) {
        this.apiUrl += '?op=' + this.listApi.UPDATE_PASSWORD;
      }else if (cmd === 107) {
        this.apiUrl += '?op=' + this.listApi.UPDATE_PROFILE;
      }else if (cmd === 108) {
        this.apiUrl += '?op=' + this.listApi.GET_PROFILE;
      }else if (cmd === 109) {
        this.apiUrl += '?op=' + this.listApi.OWNER_NOTIFICATION;
      }
      else if (cmd === 110) {
        this.apiUrl += '?op=' + this.listApi.READ_NOTIFICATIONS;
      }
      
             
    } else if (cmd > 200 && cmd < 300) {
      this.apiUrl += '/' + this.listApi.RESTAURANTS;
      if (cmd === 201) {
        this.apiUrl += '?op=' + this.listApi.ADD_RESTAURANT;
      }
      else if (cmd === 203) {
        this.apiUrl += '?op=' + this.listApi.SINGLE_RESTAURANT;
      }else if (cmd === 204) {
        this.apiUrl += '?op=' + this.listApi.DELETE_RESTAURANT;
      }else if (cmd === 205) {
        this.apiUrl += '?op=' + this.listApi.BLOCK_RESTAURANT;
      }else if (cmd === 206) {
        this.apiUrl += '?op=' + this.listApi.ACTIVE_RESTAURANT;
      }else if (cmd === 207) {
        this.apiUrl += '?op=' + this.listApi.ADD_RESTAURANT_MANGER;
      } else if (cmd === 215) {
        this.apiUrl += '?op=' + this.listApi.MSG_STATUS_AS_READ;
      } else if (cmd === 220) {
        this.apiUrl += '?op=' + this.listApi.UPDATE_RESTAURANT;
      }
    } else if (cmd > 500 && cmd < 600) {
      this.apiUrl += "/" + this.listApi.RESTAURANT_MENU;
      if (cmd === 501) { 
        this.apiUrl += "?op=" + this.listApi.SINGLE_MENU_ITEM;
      }else if (cmd === 502) {
        this.apiUrl += "?op=" + this.listApi.GET_SINGLE_CATEGORY;
      }else if (cmd === 503) {
        this.apiUrl += "?op=" + this.listApi.GET_DEALS_SINGLE;
      }else if (cmd === 504) {
        this.apiUrl += "?op=" + this.listApi.ADD_CATEGORY;
      }else if (cmd === 505) {
        this.apiUrl += "?op=" + this.listApi.UPDATE_CATEGORY;
      }else if (cmd === 506) {
        this.apiUrl += "?op=" + this.listApi.ALL_CATEGORY;
      }else if (cmd === 507) {
        this.apiUrl += "?op=" + this.listApi.GET_ALL_GRADIENTS;
      }else if (cmd === 508) {
        this.apiUrl += "?op=" + this.listApi.ADD_GRADIENT;
      }else if (cmd === 509) {
        this.apiUrl += "?op=" + this.listApi.GET_SINGLE_GRADIENT;
      }else if (cmd === 510) {
        this.apiUrl += "?op=" + this.listApi.DELETE_SINGLE_GRADIENT;
      }else if (cmd === 511) {
        this.apiUrl += "?op=" + this.listApi.CHANGE_STAT_SINGLE_GREGIENT;
      }else if (cmd === 512) {
        this.apiUrl += "?op=" + this.listApi.DELETE_GRADIENT_SUB_CATEGORY;
      }else if (cmd === 513) {
        this.apiUrl += "?op=" + this.listApi.ADD_SUB_IN_MENU_CATEGORY;
      }else if (cmd === 514) {
        this.apiUrl += "?op=" + this.listApi.ADD_MENU_DETAIL;
      }else if (cmd === 515) {
        this.apiUrl += "?op=" + this.listApi.UPDATE_MENU_ITEM;
      }else if (cmd === 516) {
        this.apiUrl += "?op=" + this.listApi.GET_ALL_ITEMS;
      }else if (cmd === 517) {
        this.apiUrl += "?op=" + this.listApi.DELETE_MENU_ITEM;
      }else if (cmd === 518) {
        this.apiUrl += "?op=" + this.listApi.CHANGE_ITEM_AVALIBILTY_STATUS;
      }else if (cmd === 519) {
        this.apiUrl += "?op=" + this.listApi.DELETE_ITEM_GREDIENT;
      }else if (cmd === 520) {
        this.apiUrl += "?op=" + this.listApi.ADD_ITEM_GRADIENTS;
      }else if (cmd === 521) {
        this.apiUrl += "?op=" + this.listApi.GET_ITEM_GRADIENTS;
      }else if (cmd === 522) {
        this.apiUrl += "?op=" + this.listApi.DELETE_MENU_CATEGORY;
      }
    }  else if (cmd > 600 && cmd < 700) {
      this.apiUrl += "/" + this.listApi.RESTAURANTS_ORDERS;
      if (cmd === 601) { 
        this.apiUrl += "?op=" + this.listApi.GET_TODAY_ORDER_CLIENT;
      } else if (cmd === 602) { 
        this.apiUrl += "?op=" + this.listApi.KIKOUT_BLOCK_CLIENT;
      }
    }
  }
  
  getApiUrlGet(cmd) {
    console.log('GEt Services'); 
    this.apiUrl = this.api.SERVER_API;
    if (cmd > 200 && cmd < 300) {
      this.apiUrl += '/' + this.listApi.RESTAURANTS_GET;
      if (cmd === 202) {
        this.apiUrl += '?op=' + this.listApi.GET_RESTAURANT;
      } 
      if(cmd === 209) {
        this.apiUrl += '?op=' + this.listApi.GET_CONTACT_LIST;
      }
    } else if (cmd > 300 && cmd < 400) {
      this.apiUrl += '/' + this.listApi.RESTAURANTS_GET;
      if (cmd === 301) {
        this.apiUrl += '?op=' + this.listApi.GET_ALL_CUSTOMERS;
      }
    } else if (cmd > 400 && cmd < 500) {
      this.apiUrl += '/' + this.listApi.RESTAURANTS_GET;
      if (cmd === 401) {
        this.apiUrl += '?op=' + this.listApi.GET_ALL_FRANCHISES;
      }
      if(cmd === 209) {
        this.apiUrl += '?op=' + this.listApi.GET_CONTACT_LIST;
      }
    }
  }
  makePostData(data: any): string {
    console.log('Post Array:', data);
    let allObject = '';
    let first = true;
    const entries = Object.entries(data);
    for (const [fruit, count] of entries) {
      if (first) {
        first = false;
        allObject += fruit.toString() + '=' + count;
      } else {
        allObject += '&' + fruit.toString() + '=' + count;
      }
    }
    console.log('Post String:', allObject);
    //Replace all & with Something else.....
    return allObject;
  }
}

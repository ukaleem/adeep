import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { EndpointsService } from '../endpoints.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private api: ApiService , private endPoints: EndpointsService) { }

  getAllNotifications(u) {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.GET_NOTIFICATIONS(u),showLoading : true, showError : true});
  } 

  changeNotifications(id,formData) {
    return this.api.commonPost(formData,{isToken :false,endPointUrl : this.endPoints.READ_NOTIFICATIONS(id),showLoading : true, showError : true});
  }
}

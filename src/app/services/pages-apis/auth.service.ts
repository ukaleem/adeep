import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { EndpointsService } from '../endpoints.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService , private endPoints: EndpointsService) { }

  login(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : this.endPoints.GET_TOKEN,showLoading : true});
  } 
}

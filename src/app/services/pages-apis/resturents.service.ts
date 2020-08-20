import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ResturentsService {

  constructor(private api:ApiService) { } 
  getAllRestaurants() {
    return this.api.commonGet({isToken :false,endPointUrl : 202,showLoading : true});
  }  
  getSingleRestaurant(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : 203,showLoading : true});
  } 
  addFranchiseRequest(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : 103,showLoading : true});
  } 
}

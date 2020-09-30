import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { EndpointsService } from '../endpoints.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private api: ApiService , private endPoints: EndpointsService) { } 
  getPatientPaths(p) {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.PATIENT_PATHWAY(p),showLoading : true, showError : true});
  }
  // set_user_token(formData) {
  //   return this.api.commonPost(formData,{isToken :false,endPointUrl : this.endPoints.SET_USER_TOKEN,showLoading : true, showError : true});
  // }
  // get_user_information(u) {
  //   return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.GET_USER_INFORMATION(u),showLoading : true, showError : true});
  // }
  // updateUser(formData) {
  //   return this.api.commonPut(formData,{isToken :false,endPointUrl : this.endPoints.UPDATE_PROFILE,showLoading : true, showError : true});
  // }
}

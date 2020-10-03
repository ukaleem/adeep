import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { EndpointsService } from '../endpoints.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private api: ApiService , private endPoints: EndpointsService) { }

  getAllPatients() {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.GET_ALL_PATIENTS,showLoading : false, showError : true});
  }
  singleUser(user_id: any) {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.SINGLE_USER(user_id),showLoading : true, showError : true});
  }
  addUser(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : this.endPoints.ADD_USERS(),showLoading : true, showError : true});
  }
  addPatient(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : this.endPoints.ADD_PATIENTS(),showLoading : true, showError : true});
  } 
  singlePatient(frmData) {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.SINGLE_PATIENT(frmData),showLoading : true, showError : true});
  } 
  singlePatientTask(p,a) {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.SINGLE_PATIENT_TASK(p,a),showLoading : true, showError : true});
  } 
  allDisease() {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.ALL_DISEASE,showLoading : false, showError : true});
  } 
  allSpecialties() {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.ALL_SPECIALTY,showLoading : true, showError : true});
  } 
  searchDisease(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : this.endPoints.SEARCH_DISEASE,showLoading : true, showError : true});
  } 
  getCustomProcess(d,s) {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.GET_PROCESS_CUSTOM(d,s),showLoading : true, showError : true});
  }
  getProcessUsers(p) {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.GET_PROCESS_USERS(p),showLoading : true, showError : true});
  }
  startPathway(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : this.endPoints.START_PATHWAY,showLoading : true, showError : true});
  }
  createUser(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : this.endPoints.CREATE_USER,showLoading : true, showError : true});
  }
  editUser(frmData,user_id) {
    return this.api.commonPut(frmData,{isToken :false,endPointUrl : this.endPoints.EDIT_USER(user_id),showLoading : true, showError : true});
  }
}

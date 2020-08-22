import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { EndpointsService } from '../endpoints.service';

@Injectable({
  providedIn: 'root'
})
export class CasesService {

  constructor(private api: ApiService , private endPoints: EndpointsService) { }

  getAllProcess() {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.GET_ALL_CASES,showLoading : true});
  } 
  getDraftCases() {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.GET_ALL_DRAFT_CASES,showLoading : true});
  }
  getAllUnassignedCases() {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.GET_ALL_UNASSIGNED_CASES,showLoading : true});
  }
  getStartCases() {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.GET_ALL_CASES_START,showLoading : true});
  } 
  getSingleCase(caseId) {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.GET_SINGLE_CASE+'/'+caseId,showLoading : true});
  }
  getCurrentTask(caseId) {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.GET_SINGLE_CASE+'/'+caseId+'/'+this.endPoints.GET_CURRENT_TASK,showLoading : true});
  }
  getCurrentTasks(caseId) {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.GET_CURRENT_TASKS(caseId),showLoading : true});
  }
  getCaseVariables(caseId) {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.GET_VARIABLES(caseId),showLoading : true});
  }
  getAllParticipants() {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.GET_ALL_PARTICIPANTS,showLoading : true});
  }
    getSteps(project_id,caseId) {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.GET_STEPS(project_id,caseId),showLoading : true});
  }
  getDynaForm(project_id,formId) {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.GET_DYNA_FORM(project_id,formId),showLoading : true});
  }
  getCustomQueryData(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : this.endPoints.CUSTOM_QUERY_DATA,showLoading : true});
  } 
  updateVariable(frmData,app,index,name) {
    return this.api.commonPut(frmData,{isToken :false,endPointUrl : this.endPoints.UPDATE_VARIABLE(app,index,name),showLoading : true});
  } 
  updateVariables(frmData,app) {
    return this.api.commonPut(frmData,{isToken :false,endPointUrl : this.endPoints.UPDATE_VARIABLES(app),showLoading : true});
  } 
  caseRoute(frmData,app) {
    return this.api.commonPut(frmData,{isToken :false,endPointUrl : this.endPoints.CASE_ROUTED(app),showLoading : true});
  } 
    
  startCase(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : this.endPoints.START_CASE,showLoading : true});
  }
}

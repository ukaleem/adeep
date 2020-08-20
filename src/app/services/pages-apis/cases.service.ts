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
}


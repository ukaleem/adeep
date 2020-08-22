import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  GET_TOKEN = this.config.SERVER_API+'oauth2/token';
  GET_ALL_CASES = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'cases';
  GET_ALL_DRAFT_CASES = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'cases/draft';
  GET_ALL_UNASSIGNED_CASES = ConfigService.SERVER_ADDRESS+'/api/1.0/' + ConfigService.WORKSPACE+'cases/unassigned'
  GET_ALL_CASES_START = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'cases/start-cases';
  GET_ALL_PARTICIPANTS = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'cases/participated';
  GET_SINGLE_CASE = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'cases';
  START_CASE = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'cases';
  GET_CURRENT_TASK = 'current-task';
  GET_CURRENT_TASKS(TASK_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'cases/'+TASK_ID+'/tasks';
  }
  GET_VARIABLES(TASK_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'cases/'+TASK_ID+'/variables';
  }
  GET_STEPS(PROJECT_ID,TASK_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'project/'+PROJECT_ID+'/activity/'+TASK_ID+'/steps';
  }
  GET_DYNA_FORM(PROJECT_ID,FORM_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'project/'+PROJECT_ID+'/dynaform/'+FORM_ID;
  }
  CUSTOM_QUERY_DATA = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'/customPage/customPageApplicationAjax';
  UPDATE_VARIABLE(APP_ID,DEL_INDEX,VARIABLE_NAME){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'variable/'+APP_ID+'/'+DEL_INDEX+'/variable/'+VARIABLE_NAME;
  }  

  constructor(private config: ConfigService) { }
}

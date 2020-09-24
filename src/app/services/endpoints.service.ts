import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  GET_TOKEN = this.config.SERVER_API+'oauth2/token';
  GET_LOGIN_USER_ID = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extraRest/login-user';
  SET_USER_TOKEN= ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE + 'extraRest/set-user-token';
  GET_ALL_CASES = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'cases';
  GET_ALL_DRAFT_CASES = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'cases/draft';
  GET_ALL_UNASSIGNED_CASES = ConfigService.SERVER_ADDRESS+'/api/1.0/' + ConfigService.WORKSPACE+'cases/unassigned'
  GET_ALL_CASES_START = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'cases/start-cases';
  GET_ALL_PARTICIPANTS = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'cases/participated';
  // EXECUTE_QUERY = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'execute_query';
  GET_SINGLE_CASE = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'cases';
  START_CASE = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'cases';
  GET_CURRENT_TASK = 'current-task';
  GET_CURRENT_TASKS(TASK_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'cases/'+TASK_ID+'/tasks';
  }
  GET_VARIABLES(TASK_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'cases/'+TASK_ID+'/variables';
  }
  EXECUTE_QUERY(PROJECT_ID,PROCESS_VARIABLE_ID) {
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'project/'+PROJECT_ID+'/process-variable/'+PROCESS_VARIABLE_ID+'/execute-query-suggest';
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
  UPDATE_VARIABLES(APP_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'cases/'+APP_ID+'/variable';
  }
  CASE_ROUTED(APP_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'cases/'+APP_ID+'/route-case';
  }
  CASE_NOTES(APP_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'cases/'+APP_ID+'/notes';
  }
  GET_FEEDS(APP_ID, TASK_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/feed_backs/'+APP_ID+'/'+TASK_ID;
  }


  //////////ADmin APIS
  GET_PATIENTS(){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/get_patients';
  }
  ADD_PATIENTS(){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/add_patients';
  }
  SINGLE_PATIENT(PATIENT_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/patient_detail/'+PATIENT_ID;
  }
  SINGLE_PATIENT_TASK(P_ID,A_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/patient_application_single/'+P_ID+'/'+A_ID;
  }
  ALL_DISEASE = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/get_disease';
  ALL_SPECIALTY = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/get_specialty';
  SEARCH_DISEASE = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/search_disease';
  GET_PROCESS_CUSTOM(D_ID,S_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/get_process_custom/'+D_ID+'/'+S_ID;
  }
  GET_PROCESS_USERS(P_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/get_process_user/'+P_ID;
  }
  START_PATHWAY = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/start_case';

  /////Feed Backs
  GET_ALL_FEED(U_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/get_all_feed_back/'+U_ID;
  }
  GET_SINGLE_FEED(F_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/get_single_feed/'+F_ID;
  }
  UPDATE_FEED(F_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/update_feed/'+F_ID;
  }
  GET_NOTIFICATIONS(U_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/get_all_notifications/'+U_ID;
  }
  READ_NOTIFICATIONS(N_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/change_notification/'+N_ID;
  }
  
  constructor(private config: ConfigService) { }
}

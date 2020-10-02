import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  // AUTHS
  GET_TOKEN = this.config.SERVER_API+'oauth2/token';
  GET_LOGIN_USER_ID = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extraRest/login-user';
  SET_USER_TOKEN= ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE + 'extraRest/set-user-token';
  UPDATE_PROFILE= ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/user/update';
 
  ///Cases
  GET_ALL_CASES = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'cases';
  GET_ALL_USERS = ConfigService.SERVER_ADDRESS + '/api/1.0/'+ConfigService.WORKSPACE+'users';
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
  CASE_NOTES_ADD(APP_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'cases/'+APP_ID+'/note';
  }
  GET_FEEDS(APP_ID, TASK_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/feed_backs/'+APP_ID+'/'+TASK_ID;
  }
  GET_GUIDE(APP_ID, TASK_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/get_guide_line/'+APP_ID+'/'+TASK_ID;
  }
  GET_ASSIGNEE(APP_ID, TASK_ID){
    // return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'project/'+APP_ID+'/activity/'+TASK_ID+'/assignee';
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/get_task_user/'+APP_ID+'/'+TASK_ID;
  }
  RE_ASSIGN_CASE(APP_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/case/'+APP_ID+'/reassign-case';
  }
  GET_PATH_DETAIL(APP_ID,PROJECT_ID, TASK_ID,START,LIMIT){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/get_path_detail/'+APP_ID+'/'+PROJECT_ID+'/'+TASK_ID;
  }

  ///Physians Apis.......0
  
  GET_PHYSICIAN_HOME(USER_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/get_physician_home/'+USER_ID;
  }
  GET_PHYSICIAN_PATH(PROJECT_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/get_pathway_detail/'+PROJECT_ID;
  }
  //////////ADmin APIS
  GET_PATIENTS(){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/get_patients';
  }

  public  GET_ALL_PATIENTSs(): any{
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/get_all_doctor_patients';
  }
  ADD_PATIENTS(){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/add_patients';
  }
  ADD_USERS() {
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'user';
  }
  SINGLE_PATIENT(PATIENT_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/patient_detail/'+PATIENT_ID;
  }
  SINGLE_USER(USER_ID) {
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'user/'+USER_ID;
  }
  SINGLE_PATIENT_TASK(P_ID,A_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/patient_application_single/'+P_ID+'/'+A_ID;
  }
  ALL_DISEASE = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/get_disease';
  DELETE_DISEASE  = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/delete_disease';
  EDIT_DISEASE = ConfigService.SERVER_ADDRESS+'/api/1.0/' + ConfigService.WORKSPACE+'extrarest/put_disease';

  ALL_SPECIALTY = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/get_specialty';
  DELETE_SPECIALTY = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/delete_specialty';
  EDIT_SPECIALTY = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ ConfigService.WORKSPACE+'extrarest/put_specialty'; 

  SEARCH_DISEASE = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/search_disease';
  GET_ALL_PATIENTS = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/get_all_doctor_patients';
  GET_PROCESS_CUSTOM(D_ID,S_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/get_process_custom/'+D_ID+'/'+S_ID;
  }
  GET_PROCESS_USERS(P_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/get_process_user/'+P_ID;
  }
  START_PATHWAY = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/start_case';
  CREATE_USER = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'user';
  EDIT_USER(U_ID) {
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'user/'+U_ID;
  }
 
  GET_USER_INFORMATION(U_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'user/'+U_ID;
  }
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
  ADD_FEED_BACK = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/add_feeds';

  ////// Notifications
  GET_NOTIFICATIONS(U_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/get_all_notifications/'+U_ID;
  }
  READ_NOTIFICATIONS(N_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/change_notification/'+N_ID;
  }
  

  // patients

  PATIENT_PATHWAY(P_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'extrarest/get_path_pathways/'+P_ID;
  }
  constructor(private config: ConfigService) { }
}

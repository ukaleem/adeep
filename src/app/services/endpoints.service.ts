import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class EndpointsService {
  constructor(private config: ConfigService) {}

  // AUTHS
  public get GET_TOKEN() {
    return this.config.SERVER_API + 'oauth2/token';
  }
  public get GET_LOGIN_USER_ID() {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extraRest/login-user'
    );
  }
  public get SET_USER_TOKEN() {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extraRest/set-user-token'
    );
  }
  public get UPDATE_PROFILE() {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/user/update'
    );
  }

  /// Cases
  public get GET_ALL_CASES() {
    return this.config.SERVER + '/api/1.0/' + ConfigService.WORKSPACE + 'cases';
  }
  public get GET_ALL_USERS() {
    return this.config.SERVER + '/api/1.0/' + ConfigService.WORKSPACE + 'users';
  }
  public get GET_ALL_DRAFT_CASES() {
    return (
      this.config.SERVER + '/api/1.0/' + ConfigService.WORKSPACE + 'cases/draft'
    );
  }
  public get GET_ALL_UNASSIGNED_CASES() {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'cases/unassigned'
    );
  }
  public get GET_ALL_CASES_START() {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'cases/start-cases'
    );
  }
  public get GET_ALL_PARTICIPANTS() {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'cases/participated'
    );
  }
  // EXECUTE_QUERY =  this.config.SERVER+'/api/1.0/'+ConfigService.WORKSPACE+'execute_query';
  public get GET_SINGLE_CASE() {
    return this.config.SERVER + '/api/1.0/' + ConfigService.WORKSPACE + 'cases';
  }
  public get START_CASE() {
    return this.config.SERVER + '/api/1.0/' + ConfigService.WORKSPACE + 'cases';
  }
  public get GET_CURRENT_TASK() {
    return 'current-task';
  }

  public get CASE_SCHEDULE() {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/get_schedule'
    );
  }
  public get CASE_SCHEDULE_SINGLE() {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/get_schedule_single'
    );
  }
  public get UPDATE_SCHEDULE() {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/update_schedule'
    );
  }
  public get SKIP_SCHEDULE() {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/skip_schedule'
    );
  }

  public get CUSTOM_QUERY_DATA() {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      '/customPage/customPageApplicationAjax'
    );
  }
  public get ALL_DISEASE() {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/get_disease'
    );
  }
  public get DELETE_DISEASE() {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/delete_disease'
    );
  }
  public get EDIT_DISEASE() {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/put_disease'
    );
  }
  public get ADD_DISEASE_SPECIAL() {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/add_disease_special'
    );
  }

  public get ALL_SPECIALTY() {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/get_specialty'
    );
  }
  public get DELETE_SPECIALTY() {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/delete_specialty'
    );
  }
  public get EDIT_SPECIALTY() {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/put_specialty'
    );
  }

  public get SEARCH_DISEASE() {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/search_disease'
    );
  }
  public get GET_ALL_PATIENTS() {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/get_all_doctor_patients'
    );
  }
  public get START_PATHWAY() {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/start_case'
    );
  }
  public get CREATE_USER() {
    return this.config.SERVER + '/api/1.0/' + ConfigService.WORKSPACE + 'user';
  }
  public get ADD_FEED_BACK() {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/add_feeds'
    );
  }

  GET_CURRENT_TASKS(TASK_ID) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'cases/' +
      TASK_ID +
      '/tasks'
    );
  }
  GET_VARIABLES(TASK_ID) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'cases/' +
      TASK_ID +
      '/variables'
    );
  }
  EXECUTE_QUERY(PROJECT_ID, PROCESS_VARIABLE_ID) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'project/' +
      PROJECT_ID +
      '/process-variable/' +
      PROCESS_VARIABLE_ID +
      '/execute-query-suggest'
    );
  }
  GET_STEPS(PROJECT_ID, TASK_ID) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'project/' +
      PROJECT_ID +
      '/activity/' +
      TASK_ID +
      '/steps'
    );
  }
  GET_DYNA_FORM(PROJECT_ID, FORM_ID) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'project/' +
      PROJECT_ID +
      '/dynaform/' +
      FORM_ID
    );
  }
  UPDATE_VARIABLE(APP_ID, DEL_INDEX, VARIABLE_NAME) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'variable/' +
      APP_ID +
      '/' +
      DEL_INDEX +
      '/variable/' +
      VARIABLE_NAME
    );
  }
  UPDATE_VARIABLES(APP_ID) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'cases/' +
      APP_ID +
      '/variable'
    );
  }
  CASE_ROUTED(APP_ID) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'cases/' +
      APP_ID +
      '/route-case'
    );
  }
  CASE_NOTES(APP_ID) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'cases/' +
      APP_ID +
      '/notes'
    );
  }
  CASE_NOTES_ADD(APP_ID) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'cases/' +
      APP_ID +
      '/note'
    );
  }
  GET_FEEDS(APP_ID, TASK_ID) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/feed_backs/' +
      APP_ID +
      '/' +
      TASK_ID
    );
  }
  GET_GUIDE(APP_ID, TASK_ID) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/get_guide_line/' +
      APP_ID +
      '/' +
      TASK_ID
    );
  }
  GET_ASSIGNEE(APP_ID, TASK_ID) {
    // return  this.config.SERVER+'/api/1.0/'+ConfigService.WORKSPACE+'project/'+APP_ID+'/activity/'+TASK_ID+'/assignee';
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/get_task_user/' +
      APP_ID +
      '/' +
      TASK_ID
    );
  }
  RE_ASSIGN_CASE(APP_ID) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/case/' +
      APP_ID +
      '/reassign-case'
    );
  }
  GET_PATH_DETAIL(APP_ID, PROJECT_ID, TASK_ID, START, LIMIT) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/get_path_detail/' +
      APP_ID +
      '/' +
      PROJECT_ID +
      '/' +
      TASK_ID
    );
  }

  /// Physians Apis.......0

  GET_PHYSICIAN_HOME(USER_ID) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/get_physician_home/' +
      USER_ID
    );
  }
  GET_PHYSICIAN_PATH(PROJECT_ID) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/get_pathway_detail/' +
      PROJECT_ID
    );
  }
  ////////// ADmin APIS
  GET_PATIENTS() {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/get_patients'
    );
  }
  GET_DASHBOARD() {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/admin-dashboard'
    );
  }

  public GET_ALL_PATIENTSs(): any {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/get_all_doctor_patients'
    );
  }
  ADD_PATIENTS() {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/add_patients'
    );
  }
  ADD_USERS() {
    return this.config.SERVER + '/api/1.0/' + ConfigService.WORKSPACE + 'user';
  }
  SINGLE_PATIENT(PATIENT_ID) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/patient_detail/' +
      PATIENT_ID
    );
  }
  SINGLE_USER(USER_ID) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'user/' +
      USER_ID
    );
  }
  SINGLE_PATIENT_TASK(P_ID, A_ID) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/patient_application_single/' +
      P_ID +
      '/' +
      A_ID
    );
  }
  GET_PROCESS_CUSTOM(D_ID, S_ID) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/get_process_custom/' +
      D_ID +
      '/' +
      S_ID
    );
  }
  GET_PROCESS_USERS(P_ID) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/get_process_user/' +
      P_ID
    );
  }
  EDIT_USER(U_ID) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'user/' +
      U_ID
    );
  }

  GET_USER_INFORMATION(U_ID) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'user/' +
      U_ID
    );
  }
  ///// Feed Backs
  GET_ALL_FEED(U_ID) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/get_all_feed_back/' +
      U_ID
    );
  }
  GET_SINGLE_FEED(F_ID) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/get_single_feed/' +
      F_ID
    );
  }
  UPDATE_FEED(F_ID) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/update_feed/' +
      F_ID
    );
  }

  ////// Notifications
  GET_NOTIFICATIONS(U_ID) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/get_all_notifications/' +
      U_ID
    );
  }
  READ_NOTIFICATIONS(N_ID) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/change_notification/' +
      N_ID
    );
  }

  // patients

  PATIENT_PATHWAY(P_ID) {
    return (
      this.config.SERVER +
      '/api/1.0/' +
      ConfigService.WORKSPACE +
      'extrarest/get_path_pathways/' +
      P_ID
    );
  }
}

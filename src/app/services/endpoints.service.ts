import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  GET_TOKEN = this.config.SERVER_API+'oauth2/token';
  GET_ALL_CASES = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'cases';
  GET_ALL_CASES_START = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'cases/start-cases';
  GET_SINGLE_CASE = ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'cases';
  GET_CURRENT_TASK = 'current-task';
  GET_CURRENT_TASKS(TASK_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'cases/'+TASK_ID+'/tasks';
  }
  GET_VARIABLES(TASK_ID){
    return ConfigService.SERVER_ADDRESS+'/api/1.0/'+ConfigService.WORKSPACE+'cases/'+TASK_ID+'/variables';
  }

  constructor(private config: ConfigService) { }
}

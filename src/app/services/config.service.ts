import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  // static SERVER_ADDRESS = 'http://192.236.147.77:8084';
  // static WORKSPACE = 'workflow/';
  // static SERVER_ADDRESS = 'http://workflow';
  static SERVER_ADDRESS = 'http://adeedcps.iibtech.com';
  static WORKSPACE = 'workflow/';

  static SERVER_ADDRESS2 = 'http://cpstest.iibtech.com';
  static WORKSPACE2 = 'workflow/';
  public get SERVER_API(): string {
    const serverType = localStorage.getItem('server');
    console.log(serverType)
    if(serverType == '2'){
      return ConfigService.SERVER_ADDRESS2 + '/' + ConfigService.WORKSPACE2;
    }
    return ConfigService.SERVER_ADDRESS + '/' + ConfigService.WORKSPACE;
  }
  constructor() { }
}

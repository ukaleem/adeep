import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  static SERVER_ADDRESS = 'http://192.236.147.77:8084';
  static WORKSPACE = 'workflow/';
  public get SERVER_API() : string {
    return ConfigService.SERVER_ADDRESS + '/' + ConfigService.WORKSPACE;
  }
  constructor() { }
}

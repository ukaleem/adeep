import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  static SERVER_ADDRESS = 'http://192.236.147.77:8082';
  static SUBDOMAIN = 'api2/index.php';
  static SUBDOMAIN_ASSET = 'api2';
  public get SERVER_API() : string {
    return ConfigService.SERVER_ADDRESS + '/' + ConfigService.SUBDOMAIN;
  }
  public get SERVER_API_ASSET() : string {
    return ConfigService.SERVER_ADDRESS + '/' + ConfigService.SUBDOMAIN_ASSET;
  }
  constructor() { }
}

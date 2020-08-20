import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  AUTH = 'oauth2/token';
  GET_TOKEN = 'oauth2/token';

  constructor() { }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  public get USERTOKEN() : string {
    return ''
  }
  constructor() { }
}

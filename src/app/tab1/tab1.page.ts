import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Content-Type': undefined
    }),
  };
  
  constructor(public httpClient: HttpClient) {}

  register(form) {
    let postData = {
            "name": "Customer004",
            "email": "customer004@email.com",
            "tel": "0000252525"
    }

    this.httpClient.post("http://192.236.147.77:8082/workflow/oauth2/token", form.value, this.httpOptions)
      .subscribe(data => {
        console.log(data);
       }, error => {
        console.log(error);
      });

    // this.authService.register(form.value).subscribe((res) => {
    //   this.router.navigateByUrl('home');
    // });
  }
}

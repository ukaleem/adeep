import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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

  ngOnInit() {
  }

}

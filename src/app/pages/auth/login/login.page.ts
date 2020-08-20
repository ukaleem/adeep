import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/pages-apis/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };
  constructor(private loginService: AuthService, private router: Router) {}

  register(form) {
    let postData = {
      grant_type   : 'password',
      scope        : '*',
      client_id    : 'FMHZNRPPTGTDANXZWAFPLFJJCSUXSOIX',
      client_secret: '62051212054b530c27f0783019474502',
      username     : form.value.grant_type,
      password     : form.value.grant_type 
    }
    form.value.push({grant_type: '*'});
    this.loginService.login(form.value).subscribe(data=> {
      console.log(data);
      if(data.access_token){
        this.router.navigateByUrl('home');
        localStorage.setItem('token',JSON.stringify(data));
        localStorage.setItem('token_time',new Date().toDateString());
      }
       //   
    },error=>{
      console.log(error);
    });
  }

  ngOnInit() {
  }

}

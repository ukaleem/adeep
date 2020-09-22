import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/pages-apis/auth.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  passeye = 'eye';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  constructor(
    private loginService: AuthService,
     private router: Router,
     private navCtrl: NavController,
    //  private firebaseX: FirebaseX,
    //  private firebaseConfig: FirebaseConfig
     ) {}
     user_fire_base_token: any;
  register(form) {
    // this.router.navigateByUrl('cases/all-cases');
    // return;
    let postData = {
      grant_type   : 'password',
      scope        : '*',
      client_id    : 'MOEPIIKPXCZPHZETAZTTJMGYYTLLWARH',
      client_secret: '6787116325f3dffbfa69216052519218',
      username     : form.value.username,
      password     : form.value.password 
    }
    this.loginService.login(postData).subscribe(data=> {
      console.log(data);
      if(data.access_token){
        this.navCtrl.navigateRoot('cases/all-cases');
        localStorage.setItem('token',JSON.stringify(data));
        localStorage.setItem('token_access',data.access_token);
        localStorage.setItem('token_time',new Date().toDateString());
        
      }
       //   
    },error=>{
      console.log(error);
    });
  }

  ngOnInit() {
  }

  passwordType = 'password';
  managePassword() {
    console.log('eye change');
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passeye = 'eye-off';
    } else {
      this.passwordType = 'password';
      this.passeye = 'eye';
    }
  }

}

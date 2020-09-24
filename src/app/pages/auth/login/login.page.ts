import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/pages-apis/auth.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
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
     private app: AppComponent,
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
        localStorage.setItem('token',JSON.stringify(data));
        localStorage.setItem('token_access',data.access_token);
        localStorage.setItem('token_time',new Date().toDateString());
        this.getUserRoles();
        
      }
       //   
    },error=>{
      console.log(error);
    });
  }

  ngOnInit() {
  }

  getUserRoles(){
    this.loginService.get_user_id().subscribe(data=> {
      console.log(data);
      localStorage.setItem('user',JSON.stringify(data));
      localStorage.setItem('id',data.uid);
      localStorage.setItem('name',data.firstname);
      localStorage.setItem('role',data.position);
      this.app.userName = data.firstname;
      this.app.userRole = data.position;
      if(data.position == 'Administrator'){
        this.app.casesShow = true;
      }
      this.navCtrl.navigateRoot('/cases');
    })
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

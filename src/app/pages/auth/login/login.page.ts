import { Component, OnInit } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/services/pages-apis/auth.service";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { AppComponent } from "src/app/app.component";
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  passeye = "eye";
  passwordType = "password";
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  };

  constructor(
    private loginService: AuthService,
    private router: Router,
    private navCtrl: NavController,
    private app: AppComponent,
    private toastService: ToastService
  ) //  private firebaseX: FirebaseX,
  //  private firebaseConfig: FirebaseConfig
  {}
  user_fire_base_token: any;
  register(form) {
    // this.router.navigateByUrl('cases/all-cases');
    // return;
    let postData = {
      grant_type: "password",
      scope: "*",
      client_id: "MOEPIIKPXCZPHZETAZTTJMGYYTLLWARH",
      client_secret: "6787116325f3dffbfa69216052519218",
      username: form.value.username,
      password: form.value.password,
    };
    this.loginService.login(postData).subscribe(
      (data) => {
        console.log(data);
        if (data.access_token) {
          localStorage.setItem("token", JSON.stringify(data));
          localStorage.setItem("token_access", data.access_token);
          localStorage.setItem("token_time", new Date().toDateString());
          this.getUserRoles();
        }
        //
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {}

  getUserRoles() {
    this.loginService.get_user_id().subscribe((data) => {
      try {
        console.log(data);
        console.log("roleeeeeeeeeeeeeeeeeeeeeeee", data.user_role);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("id", data.uid);
        localStorage.setItem("name", data.firstname);
        localStorage.setItem("role", data.user_role);
        this.app.userName = data.firstname;
        this.app.userRole = data.user_role;

        if (data.user_role == "ADMIN_OFFICE" || data.user_role == "admin_office") {
          this.app.casesShow = true;
          this.app.ADMIN_OFFICE = true;
          this.navCtrl.navigateRoot("/cases");
          this.toastService.SuccessToast('' + data.user_role + ' Login Successfully!', 2000);
        } else if ( data.user_role == "PROCESSMAKER_ADMIN" || data.user_role == "processmaker_admin") {
          this.app.casesShow = true;
          this.app.PROCESSMAKER_ADMIN = true;
          this.navCtrl.navigateRoot("/cases");
          this.toastService.SuccessToast('' + data.user_role + ' Login Successfully!', 2000);
        } else if (data.user_role == "DOCTOR" || data.user_role == "doctor") {
          this.app.DOCTOR = true;
          this.navCtrl.navigateRoot("/cases");
          this.toastService.SuccessToast('' + data.user_role + ' Login Successfully!', 2000);
        } else if (data.user_role == "PATIENT_ROLES" || data.user_role == "patient_roles") {
          this.app.PATIENT = true;
          this.navCtrl.navigateRoot("/patient");
          this.toastService.SuccessToast('' + data.user_role + ' Login Successfully!', 2000);
        } else if (data.user_role == "Caretaker" ||data.user_role == "CARETAKER") {
          this.app.CARETAKER = true;
          this.navCtrl.navigateRoot("/cases");
          this.toastService.SuccessToast('' + data.user_role + ' Login Successfully!', 2000);
        } else if ( data.user_role == "Physician" || data.user_role == "PHYSICIAN") {
          this.app.PHYSICIAN = true;
          this.navCtrl.navigateRoot("/cases");
          this.toastService.SuccessToast('' + data.user_role + ' Login Successfully!', 2000);
        }  else {
          this.navCtrl.navigateRoot("/");
          this.toastService.ErrorToast('Login failed', 1000);
        }
      } catch (error) {
        this.navCtrl.navigateRoot("/");
        this.toastService.ErrorToast('Login failed', 1000);
        console.log('some error occurred ', error);
      }
    });
  }

  managePassword() {
    console.log("eye change");
    if (this.passwordType === "password") {
      this.passwordType = "text";
      this.passeye = "eye-off";
    } else {
      this.passwordType = "password";
      this.passeye = "eye";
    }
  }
}

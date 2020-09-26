import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  ROLE_PATIENT = false;
  SHOW_CASE = false;
  PATIENT_HOME = false;
  constructor(private app: AppComponent) {
    if (localStorage.getItem('role') == "ADMIN_OFFICE" || localStorage.getItem('role') == "PROCESSMAKER_ADMIN" ){
      this.ROLE_PATIENT = true;
    }
  }

  ngOnInit() {
    if (localStorage.getItem('role') == "ADMIN_OFFICE" || localStorage.getItem('role') == "PROCESSMAKER_ADMIN" ){
      this.ROLE_PATIENT = true;
    }

    if (localStorage.getItem('role') == "ADMIN_OFFICE" || localStorage.getItem('role') == "PROCESSMAKER_ADMIN" || localStorage.getItem('role') == "PHYSICIAN" || localStorage.getItem('role') == "CARETAKER" || localStorage.getItem('role') == "DOCTOR" ){
      this.SHOW_CASE = true;
    } else {
      this.SHOW_CASE = false;
    }
    if(localStorage.getItem('role') == "PATIENT_ROLES") {
      this.PATIENT_HOME = true; 
    }
  }

}

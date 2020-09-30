import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminService } from 'src/app/services/pages-apis/admin.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {

  constructor(
    private mdlCtrl: ModalController,
    private admin: AdminService,
    private location: Location,
  ) { }
  firstName: any;
  lastName: any;
  patientAge: any;
  selectedDisease: any;
  patientEmail: any;
  regDate: any;
  phoneNo: any;
  postalCode: any;
  address: any;
  password = '';
  userName = '';
  selectDices = {
    id: null,
    name: '',
  }

  frmData = {
    usr_username: '',
    usr_firstname: '',
    usr_lastname: '',
    usr_email: '',
    usr_due_date: '2050-12-31',
    usr_status: 'ACTIVE',
    usr_role: 'PATIENT_ROLES',
    usr_new_pass: '',
    usr_cnf_pass: '',
    usr_address: '',
    usr_zip_code: '',
    usr_country: 'SA',
    usr_phone: ''
  }

  ngOnInit() {}
  dismiss() {
    this.mdlCtrl.dismiss(null,'ok');
  }
  addUser() {

  }
  saveUser(f) {
    this.admin.createUser(this.frmData).subscribe(data => {
      console.log(data);
      if (data && data.USR_UID) {
        let frmData = {
          p_name: this.userName,
          p_age: this.patientAge,
          p_date: this.regDate,
          p_disease: this.selectDices.id,
          p_password: this.password,
          p_full: this.frmData.usr_firstname.trim() + ' ' + this.frmData.usr_lastname.trim(),
          p_address: this.frmData.usr_address,
          p_zip_code: this.frmData.usr_zip_code,
          p_phone_no: this.frmData.usr_phone,
          USR_UID: data.USR_UID,
        }
        this.admin.addPatient(frmData).subscribe(data => {
          console.log(data);
          this.location.back();
        })
      }
    });
  }

}

import { Component, OnInit, Input } from '@angular/core';
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
  @Input() userId: any = [];
  userDetails = [];
  firstName: any;
  lastName: any;
  userName: any;
  UserEmail: any;
  userAddress: any;
  phoneNo: any;
  userZipCode: any;
  userPassword: any;
  userNewPassword:any;
  userDueDate = "2020-09-10";
  usr_status : any;
  usr_role: any;

  selectDices = {
    id: null,
    name: '',
  }

  frmData = {
    usr_firstname: '',
    usr_lastname: '',
    usr_username: '',
    usr_email: '',
    usr_address: '',
    usr_zip_code: '',
    usr_new_pass: '',
    usr_cnf_pass: '',
    usr_status: '',
    usr_role: '',
    usr_due_date: '2020-09-10',

  }

  ngOnInit() {
    console.log('FRom Wdut Of User');
    if(this.userId != null || this.userId != 'null' || this.userId != 'undefined') {
      this.admin.singleUser(this.userId).subscribe(data=> {
        console.log(data);
        this.userDetails = data;
      });
    }
  }
  dismiss() {
    this.mdlCtrl.dismiss(null,'ok');
  }
  addUser() {

  }
  saveUser(f) {
    this.admin.createUser(this.frmData).subscribe(data => {
      console.log(data);
      let frmData = {
        usr_firstname: this.firstName,
        usr_lastname: this.lastName,
        usr_username: this.userName,
        usr_email: this.UserEmail,
        usr_address: this.userAddress,
        usr_zip_code: this.userZipCode,
        usr_new_pass: this.userPassword,
        usr_cnf_pass: this.userNewPassword,
        // usr_due_date: this.userDueDate,
        usr_status: this.usr_status,
        usr_role: this.usr_role,
      }
      this.admin.addUser(frmData).subscribe(data => {
        console.log(data);
        this.dismiss();
        this.location.back();
      })
    });
  }

}

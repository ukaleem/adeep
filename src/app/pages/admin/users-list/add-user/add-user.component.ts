import { ToastService } from './../../../../services/toast.service';
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
    private toast: ToastService,
  ) { }
  @Input() userId: any;
  userDetails = [];
  firstName: any;
  lastName: any;
  userName: any;
  UserEmail: any;
  userAddress: any;
  phoneNo: any;
  userZipCode: any;
  userPassword: any;
  userNewPassword: any;
  userDueDate = "2020-09-10";
  usr_status: any;
  usr_role: any;

  selectDices = {
    id: null,
    name: '',
  };

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

  };

  getActionSheetHeader(header){
    let customActionSheetOptions: any = {
      header: header,
      // subHeader: 'Select your favorite color'
    };
    return customActionSheetOptions;
  }
  
  topTitle = 'Add New User';
  ngOnInit() {
    if (this.userId) {
      this.admin.singleUser(this.userId).subscribe(data => {
        console.log(data);
        this.topTitle = "Update User";
        // this.userDetails = data;
        this.frmData.usr_firstname = data.usr_firstname;
        this.frmData.usr_lastname = data.usr_lastname;
        this.frmData.usr_username = data.usr_username;
        this.frmData.usr_address = data.usr_address;
        this.frmData.usr_email = data.usr_email;
        this.frmData.usr_status = data.usr_status;
        this.frmData.usr_role = data.usr_role;
        this.frmData.usr_new_pass = data.usr_new_pass;
        this.frmData.usr_cnf_pass = data.usr_cnf_pass;
        this.frmData.usr_zip_code = data.usr_zip_code;
      });
    }
  }
  closeModal() {
    // this.mdlCtrl.dismiss(null,'ok' ,'editUserModal');
    this.mdlCtrl.dismiss(null, 'ok');
  }
  addUser() {

  }

  isPasswordSame(): boolean {
    return this.frmData.usr_cnf_pass == this.frmData.usr_new_pass
  }
  saveUser(f) {
    if (this.userId) {
      this.admin.editUser(this.frmData, this.userId).subscribe(data => {
        console.log(data);
        this.toast.SuccessToast('User Update Successfully', 2000);
        setTimeout(() => {
          this.closeModal();
        }, 1000);


      }, err=> {
        this.toast.ErrorToast('User Can\'t Updated', 2000);
      });
    } else {
      this.admin.createUser(this.frmData).subscribe(data => {
        if (data) {
          this.toast.SuccessToast('User Add Successfully', 2000);
          setTimeout(() => {
            this.closeModal();
          }, 1000);
          // this.closeModal();
        }
      }, err=> {
        this.toast.ErrorToast('User Can\'t Added', 2000);
      });
    }
  }
}

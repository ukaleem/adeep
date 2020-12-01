import { ToastService } from './../../../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/pages-apis/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  firstName: any;
  lastName: any;
  userAddress: any;
  passwordUpdate = false;
  password: any;
  confirmPassword: any;
  constructor(private auth : AuthService,private location: Location,private toast:ToastService) { }

  ngOnInit() {
  }

  saveProfile(e){
    var frmData: {[k: string]: any} = {};
    frmData.usr_firstname = this.firstName;
    frmData.usr_lastname = this.lastName;
    frmData.usr_address = this.userAddress;
    if(this.passwordUpdate){
      frmData.usr_new_pass = this.password;
      frmData.usr_cnf_pass = this.confirmPassword;
    }
    
    console.log(frmData);
    this.auth.updateUser(frmData).subscribe(data=> {
      console.log(data);
      this.location.back();
      this.toast.SuccessToast('Profile Update Successfully', 2000);
    }, error=> {
      this.toast.ErrorToast('Profile Can\'t Update Successfully', 2000);
    })
    //updateUser
  }

  iconName = 'eye';
  inPutType = 'password';
  isPasswordOK(){
    if(this.passwordUpdate && this.password != this.confirmPassword)
      return false;return true;
  }

  ionViewWillEnter(){
    this.loadData();
  }

  changePasswordType(){
    console.log('click');
    this.iconName = this.iconName == 'eye' ? 'eye-off' : 'eye';
    this.inPutType = this.inPutType == 'password' ? 'text' : 'password';
  }
  loadData(){
    const user = localStorage.getItem('id');
    this.auth.get_user_information(user).subscribe(data=> {
      this.firstName= data.usr_firstname;
      this.lastName= data.usr_lastname;
      this.userAddress= data.usr_address;
    })
  }

}

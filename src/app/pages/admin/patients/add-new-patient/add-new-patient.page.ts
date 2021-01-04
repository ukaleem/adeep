import { AlertsService } from './../../../../services/alerts.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminService } from 'src/app/services/pages-apis/admin.service';
import { CustomSearchComponent } from 'src/app/shared/custom-search/custom-search.component';
import { Location } from '@angular/common';
import { PatientMapComponent } from '../patient-map/patient-map.component';
// import { runInThisContext } from 'vm';

@Component({
  selector: 'app-add-new-patient',
  templateUrl: './add-new-patient.page.html',
  styleUrls: ['./add-new-patient.page.scss'],
})
export class AddNewPatientPage implements OnInit {
  @Input('olderData') olderData : any;
  isNew = true;
  constructor(
    private admin: AdminService,
    private location: Location,
    private toast: AlertsService,
    private mdlCtrl: ModalController) { }
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
    usr_phone: '',
    usr_lat: null,
    usr_lng: null,
  }


  ionViewWillEnter(){
    console.log(this.olderData);
    if(this.olderData){
      this.isNew = false;
      this.frmData.usr_firstname = this.olderData.PATIENT_NAME;
      this.frmData.usr_phone = this.olderData.PATIENT_PHONE;
      this.frmData.usr_address = this.olderData.PATIENT_ADDRESS;
      this.frmData.usr_lat = this.olderData.address_lat;
      this.frmData.usr_lng = this.olderData.address_lng;
      this.patientAge = this.olderData.PAITENT_AGE;
    }
  }


  ngOnInit() {
  }
  savePatient(f) {
    
    if(!this.isNew){
      let frmData = {
        p_id: this.olderData.PATIENT_ID,
        p_full: this.frmData.usr_firstname,
        p_address: this.frmData.usr_address,
        p_phone_no: this.frmData.usr_phone,
        usr_lat: this.frmData.usr_lat,
        usr_lng: this.frmData.usr_lng,
        p_age: this.patientAge
      };
      this.admin.updatePatient(frmData).subscribe(data => {
        // console.log(data);
        this.toast.presentToast('Patient Update Successfully');
        this.location.back();
        this.mdlCtrl.dismiss();
      }, error=> {
        this.toast.presentToast("Patient Can't Update Successfully");
      });
      return;
    }
    this.password = this.makeid(8);
    this.frmData.usr_new_pass = this.password;
    this.frmData.usr_cnf_pass = this.password;
    this.userName = this.frmData.usr_firstname.trim().replace(/\s+/g, '') + this.frmData.usr_lastname.trim().replace(/\s+/g, '') + this.makeid(3);
    this.frmData.usr_username = this.userName;
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
          usr_lat: this.frmData.usr_lat,
          usr_lng: this.frmData.usr_lng
        };
        this.admin.addPatient(frmData).subscribe(data => {
          console.log(data);
          this.location.back();
        });
      }
    });
  }
  async patientAssignTask() {
    const modal = await this.mdlCtrl.create({
      component: CustomSearchComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'search_for': 'd',
        'search_id': this.selectDices.id,
        'search_name': this.selectDices.name,
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        if (data.role == 'ok') {
          const returnData = JSON.parse(data.data);
          this.selectDices.id = returnData[0];
          this.selectDices.name = returnData[1];
        }
      });
    return await modal.present();
  }

  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async googleMap() {
    const modal = await this.mdlCtrl.create({
      component: PatientMapComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'dataOld': this.frmData
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
        if (data.role == 'ok') {
          this.frmData.usr_address = data.data.address;
          this.frmData.usr_lat = data.data.latitude;
          this.frmData.usr_lng = data.data.longitude;
        }
      });
    return await modal.present();
  }

  closeMosal(){
    this.mdlCtrl.dismiss();
  }

}

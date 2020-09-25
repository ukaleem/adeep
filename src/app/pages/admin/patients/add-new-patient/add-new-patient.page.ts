import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminService } from 'src/app/services/pages-apis/admin.service';
import { CustomSearchComponent } from 'src/app/shared/custom-search/custom-search.component';

@Component({
  selector: 'app-add-new-patient',
  templateUrl: './add-new-patient.page.html',
  styleUrls: ['./add-new-patient.page.scss'],
})
export class AddNewPatientPage implements OnInit {
  firstName: any;
  lastName: any;
  patientAge:any;
  selectedDisease: any;
  patientEmail:any;
  regDate:any;
  phoneNo:any;
  postalCode:any;
  address:any;
  password =  '';
  userName =  '';
  selectDices = {
    id : null,
    name : '',
  }


  frmData = {
    usr_username : '',
    usr_firstname	: '',
    usr_lastname	: '',
    usr_email	: '',
    usr_due_date	: '2050-12-31',
    usr_status	: 'ACTIVE',
    usr_role	: 'PATIENT_ROLES',
    usr_new_pass	: '',
    usr_cnf_pass	: '',
    usr_address : '',
    usr_zip_code :	'',
    usr_country :	'SA',
    usr_phone : ''
  }

  constructor(private admin: AdminService ,  
    private mdlCtrl : ModalController) { }

  ngOnInit() {
  }
  savePatient(f){
    this.password = this.makeid(8);
    this.frmData.usr_new_pass = this.password;
    this.frmData.usr_cnf_pass = this.password;
    this.userName =  this.frmData.usr_firstname.trim()+this.frmData.usr_lastname.trim()+this.makeid(3);
    this.frmData.usr_username = this.userName;
    this.admin.createUser(this.frmData).subscribe(data=> {
      console.log(data);
    })
    // console.log(f.form.value);
    // this.admin.addPatient(f.form.value).subscribe(data=> {
    //   console.log(data);
    // })
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
        if(data.role == 'ok'){
          const returnData = JSON.parse(data.data);
            this.selectDices.id = returnData[0];
            this.selectDices.name = returnData[1];
        }
    });
    return await modal.present();
  }

  makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

}

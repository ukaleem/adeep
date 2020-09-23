import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/pages-apis/admin.service';

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




  constructor(private admin: AdminService) { }

  ngOnInit() {
  }
  savePatient(f){
    console.log(f.form.value);
    this.admin.addPatient(f.form.value).subscribe(data=> {
      console.log(data);
    })
  }

}

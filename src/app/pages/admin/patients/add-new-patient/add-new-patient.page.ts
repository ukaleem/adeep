import { Component, OnInit } from '@angular/core';

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




  constructor() { }

  ngOnInit() {
  }
  savePatient(f){

  }

}

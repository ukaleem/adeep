import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CustomSearchComponent } from 'src/app/shared/custom-search/custom-search.component';

@Component({
  selector: 'app-patient-assighn-task',
  templateUrl: './patient-assighn-task.component.html',
  styleUrls: ['./patient-assighn-task.component.scss'],
})
export class PatientAssignTaskComponent implements OnInit {

  allDisease : any = [];
  allSpecialty : any = [];
  allProcess : any = [];
  allUsers : any = [];
  patientID  = '';
  constructor(private mdlCtrl : ModalController) { }

  ngOnInit() {}

  closeModal(){
    this.mdlCtrl.dismiss();
  }

  async patientAssignTask(f) {
    const modal = await this.mdlCtrl.create({
      component: CustomSearchComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        // 'PROJECT_ID': p.PRO_UID,
        // 'APP_ID': p.APP_UID,
      }
    });
    return await modal.present();
  }

}

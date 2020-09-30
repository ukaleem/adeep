import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PatientService } from 'src/app/services/pages-apis/patient.service';
import { PatientSingleTaskComponent } from '../../admin/patients/patient-single-task/patient-single-task.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isSearch: false;
  data = [];
  constructor(private patient: PatientService,
    private mdlCtrl:ModalController) { }

  segmentValue = 'current';
  allWorking:any = [];
  allPassed:any = [];
  ngOnInit() {
  }
  changeSegment(ev) {
    this.segmentValue = ev.detail.value;
  }
  showSearch(){}
  closeSearch(){}
  searchDetails() {
  }
  doRefresh(ev){

  }

  ionViewWillEnter(){
    this.loadData();
  }

  loadData(){
    const u = localStorage.getItem('username');
    this.patient.getPatientPaths(u).subscribe(data=> {
      this.allWorking = data.all_data.all;
      this.allPassed =data.all_data.passed;
    })
    //getPatientPaths
  }

  async presentModal(p) {
    const modal = await this.mdlCtrl.create({
      component: PatientSingleTaskComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'PROJECT_ID': p.PRO_UID,
        'APP_ID': p.APP_UID,
        'type' : 'p',
        'status' : p.APP_STATUS
      }
    });
    return await modal.present();
  }

}

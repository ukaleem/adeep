import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { AdminService } from 'src/app/services/pages-apis/admin.service';
import { PatientAssignTaskComponent } from './patient-assighn-task/patient-assighn-task.component';
import { PatientSingleTaskComponent } from './patient-single-task/patient-single-task.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {
  segmentVelue = 'personDetails';
  patientID = null;
  patientDataPath: any = [];
  patientDetail: any = [];

  constructor(private admin: AdminService,    
    private router: ActivatedRoute,
    private modalController: ModalController,
    private navCtrl: NavController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.router.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('patientId')) {
        this.navCtrl.back();
        return;
      }
      this.patientID = paramMap.get('patientId');
      this.loadData();
    });

  }
  changeSegment(ev) {
    this.segmentVelue = ev.detail.value;
    console.log(this.segmentVelue);
  }

  doRefresh(event){
    console.log('Begin async operation');
    this.loadData();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  loadData(){
    this.admin.singlePatient(this.patientID).subscribe(data=> {
      console.log(data);
      this.patientDataPath = data.all_data.paths;
      this.patientDetail  = data.all_data.detail;
    })
  }

  async presentModal(p) {
    const modal = await this.modalController.create({
      component: PatientSingleTaskComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'PROJECT_ID': p.PRO_UID,
        'APP_ID': p.APP_UID,
      }
    });
    return await modal.present();
  }

  async patientAssignTask() {
    const modal = await this.modalController.create({
      component: PatientAssignTaskComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'patientID': this.patientID,
        // 'APP_ID': p.APP_UID,
      }
    });
    return await modal.present();
  }



}

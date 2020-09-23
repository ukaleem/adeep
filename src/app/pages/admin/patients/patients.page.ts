import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { AdminService } from 'src/app/services/pages-apis/admin.service';
import { PatientSingleTaskComponent } from './patient-single-task/patient-single-task.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {
  segmentVelue = 'personDetails';
  patientID = null;
  patientDataPath:any = []
  patientDetail:any = []

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
        'project_id': 'Douglas',
        'app_id': 'Adams',
      }
    });
    return await modal.present();
  }

}

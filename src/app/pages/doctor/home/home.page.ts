import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DoctorService } from 'src/app/services/pages-apis/doctor.service';
import { PatientSingleTaskComponent } from '../../admin/patients/patient-single-task/patient-single-task.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // loading = true;
  isSearch = false;
  segmentVelue = 'onGoingPatients';

  onGoingPatientsData: any = [];
  onCuredPatientData: any = [];
  onRelatedCarePlanData: any = [];

  allPatients: any;
  allPatientsBackUp: any;

  constructor(private doctorService: DoctorService ,  private modalCtrl: ModalController) { 
    this.ionViewWillEnter();
  }

  ngOnInit() {
    // this.loading = false;

  }

  showSearch(){
    this.isSearch = true;
  }

  searchDetails(e){

  }
  closeSearch(){
    this.isSearch = false;
  }
  changeSegment(ev) {
    this.segmentVelue = ev.detail.value;
    console.log(this.segmentVelue);
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.ionViewWillEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  ionViewWillEnter() {
    this.doctorService.getAllPatients().subscribe(data => {
      // this.allPatients = data.all_data as any;
      // this.allPatientsBackUp = this.allPatients;

      this.onGoingPatientsData = data.all_data.onGoing;
      this.onCuredPatientData = data.all_data.Completed;
      this.onRelatedCarePlanData = data.all_data.CarePlans;
      // this.onCuredPatientData = this.allPatients.Completed;
      // this.onRelatedCarePlanData = this.allPatients.CarePlans;

      // console.log(this.allPatients);
      console.log('on going data', this.onGoingPatientsData);
      // this.loading = false;
    });
  }

  async presentModal(p , app ,st) {
    const modal = await this.modalCtrl.create({
      component: PatientSingleTaskComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'PROJECT_ID': p,
        'APP_ID': app,
        'type' : 'cr',
        'status' : st
      }
    });
    return await modal.present();
  }

}

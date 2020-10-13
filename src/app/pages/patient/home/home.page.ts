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
  loading = true;
  isSearch = false;
  data = [];
  constructor(private patient: PatientService,
    private mdlCtrl: ModalController) {
    this.loading = false;
  }

  segmentValue = 'current';
  allWorking: any = [];
  allPassed: any = [];

  allWorkingBackUp: any = [];
  allPassedBackUp: any = [];
  ngOnInit() {
  }
  showSearch() {
    this.isSearch = true;
  }
  closeSearch() {
    this.isSearch = false;
  }
  searchDetails(ev) {
    // console.log(ev.detail.value);
    let searchTerm = ev.detail.value.toLowerCase();
    if (searchTerm === '') {
      this.allWorking = this.allWorkingBackUp;
      this.allPassed = this.allPassedBackUp;
    } else {
      this.allWorking = this.allWorkingBackUp.filter(item => {
        if (item.PRO_TITLE && item.PRO_TITLE.toLowerCase().indexOf(searchTerm) > -1) {
          return true;
        } else if(item.descriptions && item.descriptions.toLowerCase().indexOf(searchTerm) > -1) {
          return true;
        }else if(item.SPECIALTY_NAME && item.SPECIALTY_NAME.toLowerCase().indexOf(searchTerm) > -1) {
          return true;
        }else if(item.APP_STATUS && item.APP_STATUS.toLowerCase().indexOf(searchTerm) > -1) {
          return true;
        }
        return false;
      });

      this.allPassed = this.allPassedBackUp.filter(item => {
        if (item.PRO_TITLE && item.PRO_TITLE.toLowerCase().indexOf(searchTerm) > -1) {
          return true;
        } else if(item.descriptions && item.descriptions.toLowerCase().indexOf(searchTerm) > -1) {
          return true;
        }else if(item.SPECIALTY_NAME && item.SPECIALTY_NAME.toLowerCase().indexOf(searchTerm) > -1) {
          return true;
        }else if(item.APP_STATUS && item.APP_STATUS.toLowerCase().indexOf(searchTerm) > -1) {
          return true;
        }
        return false;
      });

    }
  }

  doRefresh(event) {
    this.ionViewWillEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  changeSegment(ev) {
    this.segmentValue = ev.detail.value;
    console.log(this.segmentValue);
  }
  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    const u = localStorage.getItem('username');
    this.patient.getPatientPaths(u).subscribe(data => {
      this.allWorking = data.all_data.all;
      this.allPassed = data.all_data.passed;
      this.allWorkingBackUp = data.all_data.all;
      this.allPassedBackUp = data.all_data.passed;
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
        'type': 'p',
        'status': p.APP_STATUS
      }
    });
    return await modal.present();
  }

}

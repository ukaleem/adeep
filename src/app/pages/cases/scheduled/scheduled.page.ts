import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DoctorService } from 'src/app/services/pages-apis/doctor.service';

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.page.html',
  styleUrls: ['./scheduled.page.scss'],
})
export class ScheduledPage implements OnInit {

  isSearch = false;
  segmentValue = 'onGoingPatients';

  allNewCases: any = [];
  allDelayed: any = [];
  allScheduling: any = [];

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
    this.segmentValue = ev.detail.value;
    console.log(this.segmentValue);
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
      this.allNewCases = data.all_data.onGoing;
      this.allDelayed = data.all_data.Completed;
      this.allScheduling = data.all_data.CarePlans;
  
    });
  }
}

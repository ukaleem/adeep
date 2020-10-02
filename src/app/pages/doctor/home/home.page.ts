import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/pages-apis/doctor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  loading = true;
  isSearch = false;
  segmentVelue = 'onGoingPatients';

  onGoingPatientsData: any;
  onCuredPatientData: any;
  onRelatedCarePlanData: any;

  allPatients: any;
  allPatientsBackUp: any;

  constructor(private doctorService: DoctorService) { 
    this.ionViewWillEnter();
  }

  ngOnInit() {
    this.loading = false;

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
      this.allPatients = data.all_data as any;
      this.allPatientsBackUp = this.allPatients;

      this.onGoingPatientsData = JSON.parse(this.allPatients.onGoing);
      this.onCuredPatientData = this.allPatients.Completed;
      this.onRelatedCarePlanData = this.allPatients.CarePlans;

      console.log(this.allPatients);
      console.log('on going data', this.onGoingPatientsData);
      this.loading = false;
    });
  }

}

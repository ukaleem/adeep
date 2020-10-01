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
      console.log(this.allPatients);
      this.loading = false;
    });
  }

}

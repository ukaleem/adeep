import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  segmentVelue = 'onGoingCarePlan';
  loading =  true;
  isSearch: false;
  data = [];
  constructor() { 

    this.loading = false;
  }

  ngOnInit() {
  }
  showSearch(){}
  closeSearch(){}
  searchDetails() {
  }
  doRefresh(ev){

  }

  changeSegment(ev) {
    this.segmentVelue = ev.detail.value;
    console.log(this.segmentVelue);
  }

}

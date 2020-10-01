import { Component, OnInit } from '@angular/core';
import { PhysicianService } from 'src/app/services/pages-apis/physician.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private phy: PhysicianService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loadData();
  }
  allData: any = [];
  loadData() {
    this.phy.get_all_my_pathways(localStorage.getItem('id')).subscribe(data => {
      this.allData = data.all_data;
    })
  }

  doRefresh(event) {
    this.ionViewWillEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}

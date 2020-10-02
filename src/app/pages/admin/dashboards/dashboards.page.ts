import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/pages-apis/admin.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.page.html',
  styleUrls: ['./dashboards.page.scss'],
})
export class DashboardsPage implements OnInit {

  constructor(private admin : AdminService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loadData();
  }
  allData: any = [];
  loadData(){
    this.admin.getDashboard().subscribe(data=> {
      this.allData = data;
    })
    //getDashboard
  }

}

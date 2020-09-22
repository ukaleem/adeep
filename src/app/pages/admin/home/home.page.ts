import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/pages-apis/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private admin: AdminService) { }

  ngOnInit() {
  }

  allPatients :any = [];
  ionViewWillEnter(){
    this.admin.getPatients().subscribe(data => {
      this.allPatients = data.all_data  as any;
      console.log(this.allPatients);
    })
  }
}

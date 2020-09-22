import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/pages-apis/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }

  allPatients :any = [];
  ionViewWillEnter(){
    this.adminService.getPatients().subscribe(data => {
      this.allPatients = data;
    })
  }
}

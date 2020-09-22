import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AdminService } from 'src/app/services/pages-apis/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private adminService: AdminService, private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
  }

  allPatients :any = [];
  ionViewWillEnter(){
    this.adminService.getPatients().subscribe(data => {
      this.allPatients = data;
    })
  }

  // showPatientDetails(id) {
  //   this.router.navigateByUrl(['/','admin','patients' ,id]);
  // }
}

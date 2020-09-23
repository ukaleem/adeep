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

  constructor(private admin: AdminService,private adminService: AdminService, private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
  }

  allPatients :any = [];
  ionViewWillEnter(){
    this.admin.getPatients().subscribe(data => {
      this.allPatients = data.all_data  as any;
      console.log(this.allPatients);
    })
  }

  // showPatientDetails(id) {
  //   this.router.navigateByUrl(['/','admin','patients' ,id]);
  // }
}

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

  constructor(private admin: AdminService, private adminService: AdminService, private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
  }

  isSearch = false;
  allPatients: any = [];
  allPatientsBackUp: any = [];
  ionViewWillEnter() {
    this.admin.getPatients().subscribe(data => {
      this.allPatients = data.all_data as any;
      this.allPatientsBackUp = this.allPatients;
      console.log(this.allPatients);
    })
  }

  showSearch() {
    this.isSearch = true;
  }
  closeSearch() {
    this.isSearch = false;
  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.ionViewWillEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  searchPatients(e) {
    const val = e.detail.value;
    this.allPatients = this.allPatientsBackUp.filter(t => {
      if (t.PAITEINT_NAME && t.PAITEINT_NAME.toLowerCase().indexOf(val) > -1) {
        return true;
      }else if (t.PAT_DISEASE_NAME && t.PAT_DISEASE_NAME.toLowerCase().indexOf(val) > -1) {
        return true;
      }
      return false;
    });
  }
  // showPatientDetails(id) {
  //   this.router.navigateByUrl(['/','admin','patients' ,id]);
  // }
}

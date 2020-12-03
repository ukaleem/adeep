import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/pages-apis/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  segmentVelue = 'personalInfo';
  constructor(private auth : AuthService) { }

  isPermission = true;
  ngOnInit() {
  }

  allData:any  = [];
  ionViewWillEnter(){
    this.loadData();
  }

  loadData(){

    this.auth.get_user_id().subscribe(data => {
      console.log(data);
      this.allData = data;
    });
    // const user = localStorage.getItem('id');
    // this.auth.get_user_information(user).subscribe(data=> {
    //   this.allData = data;
    //   this.isPermission = true;
    // }, eeyore=> {
    //   this.isPermission = false;
    // })
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


}
//
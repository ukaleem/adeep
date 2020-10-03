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
    const user = localStorage.getItem('id');
    this.auth.get_user_information(user).subscribe(data=> {
      this.allData = data;
      this.isPermission = true;
    }, eeyore=> {
      this.isPermission = false;
    })
  }

  changeSegment(ev) {
    this.segmentVelue = ev.detail.value;
    console.log(this.segmentVelue);
  } 

}
//
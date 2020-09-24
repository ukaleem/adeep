import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  firstName: any;
  lastName: any;
  constructor() { }

  ngOnInit() {
  }

  saveProfile(e){
    
  }

}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CasesService } from 'src/app/services/pages-apis/cases.service';
import { AddUserComponent } from './add-user/add-user.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
})
export class UsersListPage implements OnInit {

  constructor(
    private casesService : CasesService,
    private modalController: ModalController,
    
  ) { }
    usersList = [];
  ngOnInit() {
  }
  ionViewWillEnter(){
    this.casesService.getAllUsers().subscribe(data=>{
      this.usersList  = data;
      console.log('From Users List View');
      console.log(data);
    });
  }
  async presentModal(p) {
    const modal = await this.modalController.create({
      component: AddUserComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        
      }
    });
    return await modal.present();
  }
}

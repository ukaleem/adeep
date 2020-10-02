import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CasesService } from 'src/app/services/pages-apis/cases.service';
import { AddUserComponent } from './add-user/add-user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

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
  this.loadData();
  }
  loadData() {
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
  async userDetails(user_id: any) {
    const modal = await this.modalController.create({
      component: UserDetailComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        user_id: user_id,
      }
    });
    return await modal.present();
  }
  
  doRefresh(event){
    console.log('Begin async operation');
    this.loadData();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}

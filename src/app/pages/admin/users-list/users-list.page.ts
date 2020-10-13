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
    private casesService: CasesService,
    private modalController: ModalController,

  ) { }
  usersList = [];
  usersListBackUp: any = [];
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.loadData();
  }
  loadData() {
    this.casesService.getAllUsers().subscribe(data => {
      this.usersList = data;
      this.usersListBackUp = this.usersList;
      console.log('From Users List View');
      console.log(data);
    });
  }
  async presentModal() {
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
      id: 'editUserModal',
      componentProps: {
        user_id: user_id,
      }
    });

    modal.onDidDismiss().then(data =>{
      this.loadData();
    });

    return await modal.present();
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.loadData();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  isSearch = false;
  showSearch() {
    this.isSearch = true;
  }
  closeSearch() {
    this.isSearch = false;
  }
  doSearch(ev) {
    console.log(ev.detail.value);
    let searchTerm = ev.detail.value.toLowerCase();
    if (searchTerm === '') {
      this.usersList = this.usersListBackUp;
    } else {
      this.usersList = this.usersListBackUp.filter(item => {
        if (item.usr_username && item.usr_username.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }else if (item.usr_lastname && item.usr_lastname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }else if (item.usr_firstname && item.usr_firstname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }else if (item.usr_role && item.usr_role.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      });
    }
  }
}

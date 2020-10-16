import { Component,Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminService } from 'src/app/services/pages-apis/admin.service';
import { CasesService } from 'src/app/services/pages-apis/cases.service';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {

  constructor(
    private admin: AdminService,
    private modalController: ModalController,
    private mdlCtrl: ModalController,
  ) { }
  userDetails :any = [];
  

  ngOnInit() {}
  @Input() user_id: any;
  ionViewWillEnter(){
    this.loadData();
  }

  loadData(){
    this.admin.singleUser(this.user_id).subscribe(data=> {
      console.log(data);
      this.userDetails = data;
    });
  }
  async editUser() {
    const modal = await this.modalController.create({
      component: AddUserComponent,
      cssClass: 'my-custom-class',
      id: 'editUserModal',
      componentProps: {
        userId: this.userDetails.usr_uid,
      }
    });
    modal.onDidDismiss().then(data =>{
      this.loadData();
    });
    return await modal.present();
  }
  closeModal() {
    this.mdlCtrl.dismiss(null,'ok');
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

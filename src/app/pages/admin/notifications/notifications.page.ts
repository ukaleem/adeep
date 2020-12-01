import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController, PopoverController } from '@ionic/angular';
import { NotificationsService } from 'src/app/services/pages-apis/notifications.service';
import { PatientSingleTaskComponent } from '../patients/patient-single-task/patient-single-task.component';
import { FilterNotificationComponent } from './filter-notofication/filter-notofication.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  caseFilter = {
      newCase : true,
      caseData: true,
      // caseSchedule : false,
      caseDerivate : true,
    };
  constructor(private not : NotificationsService , 
              private modalCtrl: ModalController,
              private actionSheetController: ActionSheetController,
              private popoverController:PopoverController,
              private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loadData();
  }
  allNotifications : any = [];
  loadData(){
    const user  =localStorage.getItem('id');
    this.not.getAllNotifications(user).subscribe(data=> {
      this.allNotifications  = data.all_data;
    })
  }

  filterNotification(note_type){
    if ((note_type == '1' || note_type == '4') && this.caseFilter.caseData) { return true; }
    else if (( note_type == '2') && this.caseFilter.newCase) { return true; }
    else if (( note_type == '3') && this.caseFilter.caseDerivate) { return true; }
    
  }
  async viewNotifications(data){
    console.log(data);
    this.changeStatus(data.note_id,2);
    // this.router.navigate(['/','cases','single-page',data.application_id]);
    if(data.note_type == '2'){
      this.router.navigate(['/','cases','single-page',data.application_id]);
    }else{
      const modal = await this.modalCtrl.create({
        component: PatientSingleTaskComponent,
        cssClass: 'my-custom-class',
        componentProps: {
          'PROJECT_ID': data.process_id,
          'APP_ID': data.application_id,
          'type' : 'io',
          'status' : 'NOTIFICATIONS'
        }
      });
      return await modal.present();
    }

    // this.router.navigateByUrl('/cases/tabs/inbox');
//['/','cases','single-page',single.app_uid]
  }

  async presentActionSheet(data) {
    const id = data.note_id;

    let ViewButton = {
      text: 'Detail View',
        role: 'destructive',
        icon: 'open',
        handler: () => {
          this.viewNotifications(data);
        }
    };

    let readButton = {
      text: 'Mark as Read',
        role: 'destructive',
        icon: 'mail-open',
        handler: () => {
          this.changeStatus(id,2);
        }
    };

    let delButton = {
      text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.changeStatus(id,3);
        }
    }

    let canSelButton = {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }

    let projectButton = {
      text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
    }

    let taskButton = {
      text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
    }

    var allButtons = [];
    if(data.current_status == '0'){
      allButtons.push(readButton);
    }
    allButtons.push(ViewButton);
    allButtons.push(delButton);
    allButtons.push(canSelButton);


    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      cssClass: 'my-custom-class',
      buttons: allButtons,
    });
    await actionSheet.present();
  }

  changeStatus(id,type){
    this.not.changeNotifications(id , {type1 : type}).subscribe(data=> {
      console.log(data);
      this.loadData();
    })
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: FilterNotificationComponent,
      cssClass: 'my-custom-class',
      event: ev,
      componentProps : {filterData: this.caseFilter},
      translucent: true
    });
    return await popover.present();
  }

}

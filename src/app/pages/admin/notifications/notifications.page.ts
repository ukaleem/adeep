import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { NotificationsService } from 'src/app/services/pages-apis/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor(private not : NotificationsService , private actionSheetController: ActionSheetController) { }

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


  async presentActionSheet(data) {
    const id = data.note_id;
    let readButton = {
      text: 'Read',
        role: 'destructive',
        icon: 'trash',
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
    allButtons.push(readButton);
    allButtons.push(delButton);
    allButtons.push(canSelButton);


    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: allButtons,
    });
    await actionSheet.present();
  }

  changeStatus(id,type){
    this.not.changeNotifications(id , {type1 : type}).subscribe(data=> {
      console.log(data);
    })
  }

}

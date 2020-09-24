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
    let delButton = {
      text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
    };

    let readButton = {
      text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
    }

    let canSelButton = {
      text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
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
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'caret-forward-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  changeStatus(id,type){

  }

}

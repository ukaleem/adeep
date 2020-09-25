import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FeedsService } from 'src/app/services/pages-apis/feeds.service';
import { ViewFeedComponent } from './view-feed/view-feed.component';
import { PopoverController } from '@ionic/angular';
import { FeedBackSortingFilterPopoverPage } from 'src/app/shared/popovers/feed-backsorting-popovers';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.page.html',
  styleUrls: ['./feedbacks.page.scss'],
})
export class FeedbacksPage implements OnInit {

  constructor(private feed: FeedsService , 
    private popoverCtrl: PopoverController,
    private mdlCtrl: ModalController) { }
  activeSegment = 'detail';
  allFeedBack:any = [];
  sortBy = 'none';

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    this.activeSegment = ev.detail.value;
  }
    // For Sorting
    async presentPopover(event: Event) {
      const popover = await this.popoverCtrl.create({
        component: FeedBackSortingFilterPopoverPage,
        componentProps : {
          sortBy:this.sortBy,
          thisFrom : 'ag',  
        },
        event
      }).then(popOver => {
        popOver.present();
        return popOver.onDidDismiss();
      }).then(resultData => {
        console.log(resultData);
     
      });
    }

  ionViewWillEnter(){
    this.loadData();
  }

  loadData(){
    const user = localStorage.getItem('id');
    this.feed.getAllFeeds(user).subscribe(data=> {
      this.allFeedBack = data;
    })
  }

  async viewFeedBack(id) {
    const modal = await this.mdlCtrl.create({
      component: ViewFeedComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'feedId': id,
        // 'APP_ID': p.APP_UID,
      }
    });
    modal.onDidDismiss().then(data =>{
      this.loadData();
    })
    return await modal.present();
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.loadData();
      event.target.complete();
    }, 2000);
  }
}

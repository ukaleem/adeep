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
 
  sortBy = 'none';
  isSearch = false;

  allFeedBackFilterMy: any = [];
  allFeedBackFilterNew: any = [];
  allFeedBackFilterReplied: any = [];
  allFeedBackMy:any = [];
  allFeedBackNew:any = [];
  allFeedBackReplied:any = [];

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
      this.allFeedBackMy = data.my;
      this.allFeedBackNew = data.new;
      this.allFeedBackReplied = data.all;

      this.allFeedBackFilterMy = this.allFeedBackMy;
      this.allFeedBackFilterNew = this.allFeedBackNew;
      this.allFeedBackFilterReplied  = this.allFeedBackReplied;

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
    this.ionViewWillEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  showSearch() { 
    this.isSearch = true;
  }
  closeSearch() {
    this.isSearch = false;
  }
  searchCase(ev){
    console.log(ev.detail.value);
    let searchTerm = ev.detail.value.toLowerCase();
    if(this.activeSegment === 'detail') {
      if (searchTerm === '') {
        this.allFeedBackNew = this.allFeedBackFilterNew;
      } else {
        this.allFeedBackNew = this.allFeedBackFilterNew.filter(item => {
          if( item.FEED_CONTENT !== null && item.FEED_CONTENT.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
            return true;
          }
          return false;
        });
      }
    } else if(this.activeSegment === 'my') {
      if (searchTerm === '') {
        this.allFeedBackMy= this.allFeedBackFilterMy;
      } else {
        this.allFeedBackMy = this.allFeedBackFilterMy.filter(item => {
          if( item.FEED_CONTENT !== null && item.FEED_CONTENT.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
            return true;
          }
          return false;
        });
      }
    } else if(this.activeSegment === 'replied') {
      if (searchTerm === '') {
        this.allFeedBackReplied= this.allFeedBackFilterReplied;
      } else {
        this.allFeedBackReplied = this.allFeedBackFilterReplied.filter(item => {
          if( item.FEED_CONTENT !== null && item.FEED_CONTENT.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
            return true;
          }
          return false;
        });
      }
    } 

  }
}

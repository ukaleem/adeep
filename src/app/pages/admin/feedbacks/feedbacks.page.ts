import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FeedBackSortingFilterPopoverPage } from 'src/app/shared/popovers/feed-backsorting-popovers';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.page.html',
  styleUrls: ['./feedbacks.page.scss'],
})
export class FeedbacksPage implements OnInit {

  constructor(
    private popoverCtrl: PopoverController,
    
  ) { }
  activeSegment = 'detail';
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

}

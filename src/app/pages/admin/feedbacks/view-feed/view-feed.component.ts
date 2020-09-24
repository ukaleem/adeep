import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FeedsService } from 'src/app/services/pages-apis/feeds.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-view-feed',
  templateUrl: './view-feed.component.html',
  styleUrls: ['./view-feed.component.scss'],
})
export class ViewFeedComponent implements OnInit {

  @Input() feedId: any;
  constructor(private feed: FeedsService,
    private toast : ToastService,
     private mdlCtrl : ModalController) { }

  allData: any = [];
  feedReply  = '';
  ngOnInit() {}

  ionViewWillEnter(){
    this.loadData();
  }

  loadData(){
    this.feed.getSingleFeeds(this.feedId).subscribe(data => {
      this.allData = data.all_data;
      console.log(data);
    })
  }

  closeModal(){
    this.mdlCtrl.dismiss();
  }

  updateFeed(type){
    let frmData = {
      feed_response : this.feedReply,
      response_type : type,
      USER_LOGGED : localStorage.getItem('id')
    }
    this.feed.updateFeed(frmData , this.feedId).subscribe(data =>{
      if(data.status){
        this.toast.SuccessToast('Update Successfully', 2000);
        this.loadData();
      }else{
        this.toast.ErrorToast('Some error Occurred', 2000);
      }
    }, error=> {
      this.toast.ErrorToast('Some error Occurred', 2000);
    });
  }
}

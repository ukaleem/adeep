import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FeedsService } from 'src/app/services/pages-apis/feeds.service';

@Component({
  selector: 'app-add-feed',
  templateUrl: './add-feed.component.html',
  styleUrls: ['./add-feed.component.scss'],
})
export class AddFeedComponent implements OnInit {

  @Input() taskID: any;
  @Input() ProjectID: any;
  @Input() AppID: any;
  @Input() fromType: any;
  @Input() i: any;
  constructor(private feed: FeedsService,
     private modalCtrl : ModalController ) { }
  to_admin = true;
  to_patient = true;
  to_care = true;
  to_doctor = true;
  to_physian = true;
  feedBack = '';
  feed_type = '3';

  i_am = '';
  ngOnInit() {}

  ionViewWillEnter(){
    if(this.i== 1){
      this.i_am = 'admin'
    }else if(this.i== 2){
      this.i_am = 'care'
    }else if(this.i== 3){
      this.i_am = 'Patient'
    }else if(this.i== 5){
      this.i_am = 'phy'
    }
  } 
  saveFeed(f){
    let frmData = {
      APP_UID_ : this.AppID,
      PRO_UID : this.ProjectID,
      USER_LOGGED : localStorage.getItem('id'),
      to_admin : this.to_admin ? '1' : '0',
      to_patient : this.to_patient ? '1' : '0',
      to_care : this.to_care ? '1' : '0',
      to_doctor : this.to_doctor ? '1' : '0',
      to_physian : this.to_physian ? '1' : '0',
      optradio : this.feed_type,
      feed_back : this.feedBack,
      task_id : this.taskID,
      USER_FROM : this.fromType,
    }
    this.feed.addFeedBack(frmData).subscribe(data=> {
      console.log(data);
      setTimeout(() => {
        this.modalCtrl.dismiss(null,'ok');
      }, 1000);
    })
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

}
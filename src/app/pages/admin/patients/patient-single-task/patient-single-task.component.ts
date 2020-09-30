import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AdminService } from 'src/app/services/pages-apis/admin.service';
import { AddFeedComponent } from '../../feedbacks/add-feed/add-feed.component';

@Component({
  selector: 'app-patient-single-task',
  templateUrl: './patient-single-task.component.html',
  styleUrls: ['./patient-single-task.component.scss'],
})
export class PatientSingleTaskComponent implements OnInit {

  @Input() APP_ID: any;
  @Input() PROJECT_ID: any;
  @Input() type: any;
  @Input() status: any;

  segmentVelue = 'current';
  taskData :any = [];
  constructor(private admin: AdminService, 
    private modalCtrl : ModalController) { }


  ngOnInit(
    
  ) {}

  doRefresh(e){
    
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }
  changeSegment(ev) {
    this.segmentVelue = ev.detail.value;
    console.log(this.segmentVelue);
  }

  ionViewWillEnter(){
    this.loadData();
  }

  loadData(){
    this.admin.singlePatientTask(this.PROJECT_ID,this.APP_ID).subscribe(data=> {
      console.log(data);
      this.taskData = data;
    });
  }


  async feedBack(p) {
    console.log(p);
    const modal = await this.modalCtrl.create({
      component: AddFeedComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        taskID: p.TAS_UID,
         ProjectID: p.PRO_UID,
         AppID: p.APP_UID,
         fromType: '3',
          i: 1
      }
    });
    return await modal.present();
  }
}

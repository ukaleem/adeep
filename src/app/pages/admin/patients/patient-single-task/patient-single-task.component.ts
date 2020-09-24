import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AdminService } from 'src/app/services/pages-apis/admin.service';

@Component({
  selector: 'app-patient-single-task',
  templateUrl: './patient-single-task.component.html',
  styleUrls: ['./patient-single-task.component.scss'],
})
export class PatientSingleTaskComponent implements OnInit {

  @Input() APP_ID: any;
  @Input() PROJECT_ID: any;
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
    })
  }
}

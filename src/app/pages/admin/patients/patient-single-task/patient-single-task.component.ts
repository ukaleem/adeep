import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AdminService } from 'src/app/services/pages-apis/admin.service';

@Component({
  selector: 'app-patient-single-task',
  templateUrl: './patient-single-task.component.html',
  styleUrls: ['./patient-single-task.component.scss'],
})
export class PatientSingleTaskComponent implements OnInit {

  @Input() value: any;
  @Input() value: any;
  segmentVelue = 'current';
  taskData :any = [];
  APP_ID ;
  PROJECT_ID
  constructor(private admin: AdminService, 
    private modalCtrl : ModalController, 
    private router: ActivatedRoute,
    private modalController: ModalController,) { }


  ngOnInit(
    
  ) {}

  closeModal(){
    this.modalCtrl.dismiss();
  }
  changeSegment(ev) {
    this.segmentVelue = ev.detail.value;
    console.log(this.segmentVelue);
  }

  ionViewWillEnter(){
    this.router.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('project_id')) {
        // this.navCtrl.back();
        return;
      }
      this.PROJECT_ID = paramMap.get('project_id');
      this.APP_ID = paramMap.get('app_id');
      this.loadData();
    });
  }

  loadData(){
    this.admin.singlePatientTask(this.PROJECT_ID,this.APP_ID).subscribe(data=> {
      console.log(data);
      this.taskData = data;
    })
  }
}

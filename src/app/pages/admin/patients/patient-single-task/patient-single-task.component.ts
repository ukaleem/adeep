import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AdminService } from 'src/app/services/pages-apis/admin.service';
import { CasesService } from 'src/app/services/pages-apis/cases.service';
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

  isPatient = false;
  isComplete = false;
  isPhysician = false;
  segmentVelue = 'current';
  taskData: any = [];
  constructor(private admin: AdminService,
    private cases: CasesService,
    private modalCtrl: ModalController) { }


  ngOnInit(

  ) { }

  doRefresh(e) {

  }

  allData: any = [];
  closeModal() {
    this.modalCtrl.dismiss();
  }
  changeSegment(ev) {
    this.segmentVelue = ev.detail.value;
    console.log(this.segmentVelue);
  }

  ionViewWillEnter() {
    if(this.type == 'p'){
      this.isPatient = true;
    }else if(this.type == 'ph'){
      this.isPhysician = true;
    }
    if(this.status == 'COMPLETED'){
      this.isComplete = true;
      this.segmentVelue = 'pass';
    }
    this.loadData();
  }
  
  getTaskName(task) {
    let xyz = task.split("/", 3);
    return xyz[0];
    console.log(xyz);
  }
  getTaskDate(task) {
    let xyz = task.split("/", 3);
    return xyz[2];
    console.log(xyz);
  }
  getUserName(task) {
    return task.split("/", 5)[3].split(':', 2)[1];
    let xyz = task.split("/", 5)[3].split(':', 2)[1];
    let abc = xyz[3];
    let fgh = abc.split(":", 2);
    return fgh[1];
    console.log(xyz);
  }
  filterData(data) {
    if (data.field.indexOf("_label") > -1) {
      return true;
    }else if(data.field == "USER_LOGGED"){
      return true;
    }
    return false;
  }
  loadData() {
    this.admin.singlePatientTask(this.PROJECT_ID, this.APP_ID).subscribe(data => {
      console.log(data);
      this.taskData = data;
    });
    let isFirst = true;
    var singleOne: any = [];
    let pr = '';
    var i = 0;
    this.cases.getPathDetail(this.APP_ID, this.PROJECT_ID, '456789074', 0, 15).subscribe(data => {
      // console.log(data);
      const result = data;
      try {
        result.data.forEach(element => {
          // console.log(element.record);
          // console.log(element);
          if (!this.filterData(element)) {
            if (isFirst) {
              pr = element.record;
              this.allData.push({ task: element.record, variables: [element] });
              isFirst = false;
            } else {
              if (this.getTaskName(pr) == this.getTaskName(element.record)) {
                this.allData[i].variables.push(element);
              } else {
                pr = element.record;
                this.allData.push({ task: element.record, variables: [element] });
                i++;
              }
              //this.allData.push({task: element.record,variables: [element]});
            }
          }

        });
        console.log('all', this.allData);
      } catch (ex) {
        console.log(ex);
      }

      return;
    }, err => {
      console.log(err);
    });
  }


  async feedBack(p) {
    console.log(p);
    let frm = this.isPatient ? '2' : '3';
    let i_am =  this.isPatient ? 3 : 1;
    if(this.isPhysician){
      frm = '5';
      i_am = 5;
    }
    const modal = await this.modalCtrl.create({
      component: AddFeedComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        taskID: p.TAS_UID,
        ProjectID: p.PRO_UID,
        AppID: p.APP_UID,
        fromType: frm,
        i: i_am
      }
    });
    return await modal.present();
  }
}


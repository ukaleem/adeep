import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { CasesService } from 'src/app/services/pages-apis/cases.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-single-schedule',
  templateUrl: './single-schedule.component.html',
  styleUrls: ['./single-schedule.component.scss'],
})
export class SingleScheduleComponent implements OnInit {
  constructor(private mdlCtrl: ModalController, private cases: CasesService , private alert: AlertsService) {}
  @Input('id') id: any;


  activeSegment = 'detail';
  allDetail: any = [];
  allScheduled: any = [];
  allScheduledList: any = [];
  allScheduledCombing: any = [];
  currentDate = new Date().toISOString();
  currentDueDate = '';
  currentDateWas = '';
  newDateIs = '';

  ngOnInit() {}

  ionViewWillEnter() {
    this.allScheduledCombing = [];
    console.log(this.id);
    this.cases.getCalenderSingle({ id: this.id }).subscribe((detail) => {
      console.log(detail);
      this.allDetail = detail.data.detail[1];
      this.currentDueDate =  this.allDetail.DEL_TASK_DUE_DATE;
      console.log(this.currentDueDate);

      let  currentDate = this.allDetail.TASK_START_TIME;
      if (!currentDate){
            currentDate = this.allDetail.DEL_INIT_DATE
            ? new Date(this.allDetail.DEL_INIT_DATE)
            : new Date(this.allDetail.DEL_TASK_DUE_DATE);
        }
      this.currentDateWas = currentDate;
      console.log(this.currentDateWas);
      this.allScheduled = detail.data.other;
      const object = detail.data.list;
      this.allScheduledList = [];
      // tslint:disable-next-line: forin
      for (const property in object) {
        this.allScheduledList.push(object[property]);
      }
      // console.log(this.allDetail);
      // console.log(this.allScheduledList);

      if (this.allScheduled && this.allScheduled[1]) {
        console.log('In No other');
        const scheduled = this.allScheduled[1];
        if (scheduled.schedule_status == 1) {
          const allNotes = JSON.parse(scheduled.schedule_times);
          // console.log(allNotes);

          let i = 0;
          while (i < 5) {
            allNotes.forEach((element) => {
              let res = element.split(':');
              let d = new Date();
              d.setHours(res[0]);
              d.setMinutes(res[1]);
              console.log(d);
              this.allScheduledCombing.push(d.toLocaleString());
            });
            i++;
          }
        } else if (scheduled.schedule_status == 2) {
          console.log('kkd');
        }
      } else {
        console.log('No other');
      }
    });
  }

  closeModal() {
    this.mdlCtrl.dismiss();
  }

  segmentChanged(ev: any) {
    this.activeSegment = ev.detail.value;
  }
  openCase() {
    this.mdlCtrl.dismiss(this.allDetail.APP_UID, 'ok');
  }
  skipTask(task){
    const frmData = {
      id : this.id,
      schedule: task
    };
    this.cases.skipSchedule(frmData).subscribe(data => {
      if (data.status){
        this.alert.presentToastAlert('Success', 'Update Successfully', 'success', 4000);
      }else{
        this.alert.presentToastAlert('Failure', data.message, 'danger', 4000);
      }
      this.ionViewWillEnter();
    }, error => {
      this.alert.presentToastAlert('Failure', 'Network Error', 'danger', 4000);
    });
  }
  isUpdate(){
    return true;
  }

  updateSchedule(){
    let frmData = {
      caseId : this.id,
      startTime: this.currentDateWas,
      endTime : this.currentDueDate
    };
    console.log(frmData);
    this.cases.scheduleUpdate(frmData).subscribe(data => {
      console.log(data);
      if(data.status){
        this.alert.presentToastAlert('Success', 'Update Successfully', 'success', 4000);
      }else{
        this.alert.presentToastAlert('Failure', data.message, 'danger', 4000);
      }
    }, error=> {
      this.alert.presentToastAlert('Failure', 'Network Error', 'danger', 4000);
    });
  }
}

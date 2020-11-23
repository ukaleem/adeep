import { ModalController } from "@ionic/angular";
import { Component, Input, OnInit } from "@angular/core";
import { CasesService } from "src/app/services/pages-apis/cases.service";

@Component({
  selector: "app-single-schedule",
  templateUrl: "./single-schedule.component.html",
  styleUrls: ["./single-schedule.component.scss"],
})
export class SingleScheduleComponent implements OnInit {
  @Input("id") id: any;
  activeSegment = "detail";
  allDetail: any = [];
  allScheduled: any = [];
  allScheduledList: any = [];
  allScheduledCombing: any = [];
  constructor(private mdlCtrl: ModalController, private cases: CasesService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.allScheduledCombing = [];
    console.log(this.id);
    this.cases.getCalenderSingle({ id: this.id }).subscribe((detail) => {
      console.log(detail);
      this.allDetail = detail.data.detail[1];
      this.allScheduled = detail.data.other;
      this.allScheduledList = detail.data.list;
      console.log(this.allDetail);
      console.log(this.allScheduled);

      if (this.allScheduled && this.allScheduled[1]) {
        console.log("In No other");
        let scheduled = this.allScheduled[1];
        if (scheduled.schedule_status == 1) {
          let allNotes = JSON.parse(scheduled.schedule_times);
          console.log(allNotes);

          let i = 0;
          while (i < 5) {
            allNotes.forEach((element) => {
              var res = element.split(":");
              var d = new Date();
              d.setHours(res[0]);
              d.setMinutes(res[1]);
              console.log(d);
              this.allScheduledCombing.push(d.toLocaleString());
            });
            i++;
          }
        } else if (scheduled.schedule_status == 2) {
          console.log("kkd");
        }
      } else {
        console.log("No other");
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
    this.mdlCtrl.dismiss(this.allDetail.APP_UID,'ok');
  }
}

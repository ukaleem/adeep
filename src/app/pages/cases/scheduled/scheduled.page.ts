import { Component, OnInit, ViewChild } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";
// import { DoctorService } from "src/app/services/pages-apis/doctor.service";
import { CalendarOptions, FullCalendarComponent } from "@fullcalendar/angular";
import { CasesService } from "src/app/services/pages-apis/cases.service";
import { SingleScheduleComponent } from './single-schedule/single-schedule.component';
// import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
// import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
@Component({
  selector: "app-scheduled",
  templateUrl: "./scheduled.page.html",
  styleUrls: ["./scheduled.page.scss"],
})
export class ScheduledPage implements OnInit {
  constructor(private cases: CasesService, private modalCtrl: ModalController,  private navCtrl : NavController) {
    // this.ionViewWillEnter();
  }
  @ViewChild("calendar") calendarComponent: FullCalendarComponent;
  isSearch = false;
  isDeebDetacion = true;
  segmentValue = "onGoingPatients";

  allNewCases: any = [];
  allDelayed: any = [];
  allScheduling: any = [];

  allPatients: any;
  allPatientsBackUp: any;

  calendarOptions: CalendarOptions = {
    initialView: "dayGridMonth",
    height: 500,
    dateClick: this.handleDateClick.bind(this), // bind is important!
    eventClick: this.handleEventClick.bind(this),
    // plugins: [ dayGridPlugin ],

    events: [
      // { title: "event 1", date: "2020-11-11" },
      // { title: "event 2", date: "2020-11-12" },
    ],
  };

  ngOnInit() {
    // this.loading = false;
  }

  showSearch() {
    this.isSearch = true;
  }

  searchDetails(e) {}
  closeSearch() {
    this.isSearch = false;
  }
  changeSegment(ev) {
    this.segmentValue = ev.detail.value;
    console.log(this.segmentValue);
  }

  doRefresh(event) {
    console.log("Begin async operation");
    this.ionViewWillEnter();
    setTimeout(() => {
      console.log("Async operation has ended");
      event.target.complete();
    }, 2000);
  }

  ionViewWillEnter() {
    // this.calendarOptions.events.push({}) = [{
    //   title: 'Updaten Event',
    //   start: yearMonth + '-08',
    //   end: yearMonth + '-10'
    // }];

    let allEvents = [];
    this.cases.getCalender().subscribe((data) => {
      ////Data is Ok!!!
      data.data.expired.forEach((element) => {
        let currentDate = element.DEL_INIT_DATE
          ? new Date(element.DEL_INIT_DATE).toISOString()
          : new Date().toISOString();
        let dueDate = new Date(element.DEL_INIT_DATE).toISOString();
        console.log(currentDate);
        let events: any = {
          title: element.APP_TAS_TITLE + "(" + " " + element.USR_LASTNAME + ")",
          start: currentDate, // a property!
          backgroundColor: "red",
          textColor: "white",
          link: element.link,
          id: element.AUTO_ID,
          groupId: element.APP_UID,
        };
        if (element.DEL_TASK_DUE_DATE) {
          events.end = new Date(element.DEL_TASK_DUE_DATE).toISOString();
        }
        console.log(events);
        allEvents.push(events);
      });
      data.data.new.forEach((element) => {
        let currentDate = element.DEL_INIT_DATE
          ? new Date(element.DEL_INIT_DATE).toISOString()
          : new Date().toISOString();
        let dueDate = new Date(element.DEL_INIT_DATE).toISOString();
        console.log(currentDate);
        let events: any = {
          title: element.APP_TAS_TITLE + "(" + " " + element.USR_LASTNAME + ")",
          groupId: element.APP_UID,
          id: element.AUTO_ID,
          link: element.link,
          start: currentDate, // a property!
          // backgroundColor : 'blue',
          // textColor : white
        };
        if (element.DEL_TASK_DUE_DATE) {
          events.end = new Date(element.DEL_TASK_DUE_DATE).toISOString();
        }
        console.log(events);
        allEvents.push(events);
      });
      data.data.scheduled.forEach((element) => {
        let currentDate = element.DEL_INIT_DATE
          ? new Date(element.DEL_INIT_DATE).toISOString()
          : new Date().toISOString();
        let dueDate = new Date(element.DEL_INIT_DATE).toISOString();

        let events: any = {
          title: element.APP_TAS_TITLE + "(" + " " + element.USR_LASTNAME + ")",
          start: currentDate, // a property!
          backgroundColor: "blue",
          textColor: "white",
          link: element.link,
          id: element.AUTO_ID,
          groupId: element.APP_UID,
        };
        if (element.DEL_TASK_DUE_DATE) {
          events.end = new Date(element.DEL_TASK_DUE_DATE).toISOString();
        }
        console.log(events);
        allEvents.push(events);
      });
      // const nowDate = new Date();
      // const yearMonth = nowDate.getUTCFullYear() + '-' + (nowDate.getUTCMonth() + 1);

      // console.log(this.calendarOptions);
      // console.log(this.calendarOptions.events);
      this.calendarOptions.events = allEvents;
    });
  }

  ionViewDidEnter() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.next();
    calendarApi.prev();
  }
  handleEventClick(arg) {
    // alert("date click! " + arg.dateStr);
    console.log("date click! ", arg);
    this.viewSingle(arg.event.id)
  }
  handleDateClick(arg) {
    // alert("date click! " + arg.dateStr);
  }

  async viewSingle(id) {
    const modal = await this.modalCtrl.create({
      component: SingleScheduleComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        id:id,
        // 'APP_ID': p.APP_UID,
      }
    });
    modal.onDidDismiss().then(data =>{
      // this.loadData();
      if(data.role == 'ok'){
          this.navCtrl.navigateForward(['/', 'cases', 'single-page', data.data]);
      }
    });
    return await modal.present();
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScheduledPageRoutingModule } from './scheduled-routing.module';
import { ScheduledPage } from './scheduled.page';

import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { SingleScheduleComponent } from './single-schedule/single-schedule.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  listPlugin,
  timeGridPlugin
]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduledPageRoutingModule,
    FullCalendarModule // register FullCalendar with you app
  ],
  declarations: [ScheduledPage, SingleScheduleComponent],
  entryComponents : [SingleScheduleComponent]
})
export class ScheduledPageModule {}

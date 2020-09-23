import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.page.html',
  styleUrls: ['./feedbacks.page.scss'],
})
export class FeedbacksPage implements OnInit {

  constructor() { }
  activeSegment = 'detail';

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    this.activeSegment = ev.detail.value;
  }

}

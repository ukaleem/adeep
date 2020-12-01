import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-notofication',
  templateUrl: './filter-notofication.component.html',
  styleUrls: ['./filter-notofication.component.scss'],
})
export class FilterNotificationComponent implements OnInit {

  @Input() filterData;
  // caseFilter = {
  //   newCase : false,
  //   caseData: false,
  //   caseSchedule : false,
  // };
  constructor() { }

  ngOnInit() {}

}

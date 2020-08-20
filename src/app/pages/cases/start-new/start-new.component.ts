import { Component, OnInit } from '@angular/core';
import { CasesService } from 'src/app/services/pages-apis/cases.service';

@Component({
  selector: 'app-start-new',
  templateUrl: './start-new.component.html',
  styleUrls: ['./start-new.component.scss'],
})
export class StartNewComponent implements OnInit {

  allCasesNew :any = [];
  constructor(private casesService : CasesService) { 
    this.casesService.getStartCases().subscribe(data=>{
      console.log(data);
      this.allCasesNew = data as any;
    })
   }

  ngOnInit() {}

}

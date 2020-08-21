import { Component, OnInit } from '@angular/core';
import { CasesService } from 'src/app/services/pages-apis/cases.service';

@Component({
  selector: 'app-draft-cases',
  templateUrl: './draft-cases.page.html',
  styleUrls: ['./draft-cases.page.scss'],
})
export class DraftCasesPage implements OnInit {

  constructor(
    private casesService : CasesService ,
  ) { }
  allDraftCases:any = [];
  ionViewWillEnter(){
    this.casesService.getDraftCases().subscribe(data=>{
      console.log(data);
      this.allDraftCases = data;
    });
  }
  ngOnInit() {
  }

}

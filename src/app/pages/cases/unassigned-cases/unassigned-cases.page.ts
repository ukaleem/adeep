import { Component, OnInit } from '@angular/core';
import { CasesService } from 'src/app/services/pages-apis/cases.service';

@Component({
  selector: 'app-unassigned-cases',
  templateUrl: './unassigned-cases.page.html',
  styleUrls: ['./unassigned-cases.page.scss'],
})
export class UnassignedCasesPage implements OnInit {

  constructor(
    private casesService : CasesService ,
  ) { }
  allUnassignedCases:any = [];
  ionViewWillEnter(){
    this.casesService.getAllUnassignedCases().subscribe(data=>{
      console.log(data);
      this.allUnassignedCases = data;
    });
  }
  ngOnInit() {
  }

}

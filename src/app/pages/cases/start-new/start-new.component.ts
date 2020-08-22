import { Component, OnInit } from '@angular/core';
import { CasesService } from 'src/app/services/pages-apis/cases.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-start-new',
  templateUrl: './start-new.component.html',
  styleUrls: ['./start-new.component.scss'],
})
export class StartNewComponent implements OnInit {

  allCasesNew :any = [];
  constructor(
    private casesService : CasesService ,
     private modalCtrl: ModalController,
     ) { 
    this.casesService.getStartCases().subscribe(data=>{
      console.log(data);
      this.allCasesNew = data as any;
    })
   }

  ngOnInit() {}

  closeModal(){
    this.modalCtrl.dismiss();
  }
  startCase(caseDetail: any) {
    console.log("From Start Case");
    console.log(caseDetail);
    this.casesService.startCase(caseDetail).subscribe(data=>{
      console.log(data);
    });
  }
}

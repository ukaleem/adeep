import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CasesService } from 'src/app/services/pages-apis/cases.service';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.page.html',
  styleUrls: ['./single-page.page.scss'],
})
export class SinglePagePage implements OnInit {

  caseData:any = [];
  caseId: any = '';
  constructor(
    private router:ActivatedRoute, 
    private navCtrl: NavController,
    private casesService: CasesService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.router.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('caseId')) {
        console.log('No resId In exit');
        this.navCtrl.back();
        return;
      }
      this.caseId = paramMap.get('caseId');
      this.loadCaseData();
    });
  }

  loadCaseData(){
    this.casesService.getSingleCase(this.caseId).subscribe(data=>{
      console.log(data);
      this.caseData = data;
    });
    this.casesService.getCurrentTask(this.caseId).subscribe(data=>{
      console.log(data);
      this.caseData = data;
    })
    this.casesService.getCurrentTasks(this.caseId).subscribe(data=>{
      console.log(data);
      this.caseData = data;
    })
    this.casesService.getCaseVariables(this.caseId).subscribe(data=>{
      console.log(data);
      this.caseData = data;
    });
    this.casesService.getSteps('9889347885f336c48542fb2083536155' , '4928001005f3e40f0eb7f67073400016').subscribe(data=>{
      console.log(data);
      this.caseData = data;
      this.casesService.getDynaForm('9889347885f336c48542fb2083536155' , this.caseData[0].step_uid_obj).subscribe(data1=>{
        console.log('DynaForm',data1);
        // this.caseData = data;
        var allResult = JSON.parse(data1.dyn_content);
        console.log(allResult);


        
      })
    })
  }
}


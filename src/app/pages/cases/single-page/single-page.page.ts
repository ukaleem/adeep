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
  constructor(private router:ActivatedRoute, private navCtrl: NavController,
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

  allForms: any = [];
  loadCaseData(){
    this.casesService.getSingleCase(this.caseId).subscribe(data=>{
      console.log('Single Case',data);
      this.caseData = data;
      let projectId = data.pro_uid;
      let caseID = data.current_task[0].tas_uid;

      this.casesService.getSteps(projectId,caseID).subscribe(data=>{
        console.log(data);
        this.caseData = data;
        this.casesService.getDynaForm(projectId, this.caseData[0].step_uid_obj).subscribe(data1=>{
          console.log('DynaForm',data1);
          
          // this.caseData = data;
          var allResult = JSON.parse(data1.dyn_content);
          this.allForms = allResult.items;

          console.log(allResult);
        });
      });

    });

    let frmData = {
      option: 'LST',
      pageSize: 15,
      limit: 15,
      start: 0
    }
     this.casesService.getCustomQueryData(frmData).subscribe(data=>{
      console.log('Variables',data);
      this.caseData = data;
    });
    
    // this.casesService.getCurrentTask(this.caseId).subscribe(data=>{
    //   console.log('currentTask',data);
    //   let currentTask  = data.tas_uid;
    //   this.caseData = data;
    // })
    // this.casesService.getCurrentTasks(this.caseId).subscribe(data=>{
    //   console.log(data);
    //   this.caseData = data;
    // })
    // this.casesService.getCaseVariables(this.caseId).subscribe(data=>{
    //   console.log('Variables',data);
    //   this.caseData = data;
    // });

  }
  updateVariable(){
    this.casesService.updateVariable('','','','').subscribe(data=>{
      console.log('Variables',data);
      this.caseData = data;
    });
    
  }
}


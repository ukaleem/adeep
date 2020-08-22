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
  allForms: any = [];
  allVariables:any = [];
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
      console.log('Single Case',data);
      this.caseData = data;
      let projectId = data.pro_uid;
      let caseID = data.current_task[0].tas_uid;

      this.casesService.getSteps(projectId,caseID).subscribe(data=>{
        console.log(data);
        this.caseData = data;
        this.casesService.getDynaForm(projectId, this.caseData[0].step_uid_obj).subscribe(data1=>{
          console.log('DynaForm',data1);
          var allResult = JSON.parse(data1.dyn_content);
          this.allForms = allResult.items;
          this.allForms.forEach(element => {
            
          });

          this.casesService.getCaseVariables(this.caseId).subscribe(data3=>{
            console.log('Variables',data3);

           
            this.allForms.forEach(element => {
              element.items.forEach(element2 => {
                element2.forEach(element3 => {
                  let readOnly = false;
                  if(element3.type == 'dropdown'){
                    let items = {
                      itemName : element3.variable,
                      itemValue : '',
                      itemLabel : element3.label,
                      isRequired : element3.required,
                      isReadonly : element3.variable,
                      SQLQuery : element3.sql,
                      allOptions : element3.options,
                      itemType : element3.type,
                    };
                    items.itemValue = data3.hasOwnProperty(items.itemName) ? data3[items.itemName] : '';
                    this.allVariables.push(items);
                  }else if(element3.type == 'text'){

                    let items = {
                      itemName : element3.variable,
                      itemValue : '',
                      itemLabel : element3.label,
                      isRequired : element3.required,
                      isReadonly : element3.variable,
                      SQLQuery : element3.sql,
                      itemType : element3.type,
                    };
                    items.itemValue = data3.hasOwnProperty(items.itemName) ? data3[items.itemName] : '';
                    this.allVariables.push(items);
                  }


                });
              });
            });
            console.log(this.allVariables);
  
            console.log(allResult);
    
            // this.caseData = data3;
          });

          
          // this.caseData = data;
         
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

    // this.casesService.getDynaForm('9889347885f336c48542fb2083536155', '6343624405f362b93c5ef77004296138').subscribe(data1=>{
    // this.casesService.getDynaForm('9889347885f336c48542fb2083536155', '6343624405f362b93c5ef77004296138').subscribe(data1=>{
    //   console.log('DynaForm',data1);
      
    //   this.casesService.getCaseVariables(this.caseId).subscribe(data3=>{
    //     console.log('Variables',data3);

    //     // this.caseData = data3;
    //   });

    //   // this.caseData = data;
    //   var allResult = JSON.parse(data1.dyn_content);
    //   this.allForms = allResult.items;

    //   console.log(allResult);
    // });
    
    
    // this.casesService.getCurrentTask(this.caseId).subscribe(data=>{
    //   console.log('currentTask',data);
    //   let currentTask  = data.tas_uid;
    //   this.caseData = data;
    // })
    // this.casesService.getCurrentTasks(this.caseId).subscribe(data=>{
    //   console.log(data);
    //   this.caseData = data;
    // })
   

  }
  // updateVariable(){
  //   var oVars = {
  //     "textVar001"      : "Kelly Cline",      //textbox with string variable
  //     "dropdownVar001"        : 56789,              //textbox with integer variable
  //  };

  //   this.casesService.updateVariables(oVars,'3614823735f3e41b3746319025944715').subscribe(data=>{
  //     console.log('Variables',data);
  //     this.caseData = data;
  //   });
    
  // }

  // caseRoute(){
  //   this.casesService.caseRoute([],'3614823735f3e41b3746319025944715').subscribe(data=>{
  //     console.log('Variables',data);
  //     this.caseData = data;
  //   });
  // }

  doNextStep(form){
      console.log(form);
      console.log(this.allVariables);
      var obj: {[k: string]: any} = {};
      this.allVariables.forEach(element => {
        obj[element.itemName] = element.itemValue;
      });
      console.log(obj);
      this.casesService.updateVariables(obj,this.caseId).subscribe(data=>{
        console.log('Variables',data);
        this.caseData = data;
        this.casesService.caseRoute([],this.caseId).subscribe(data2=>{
          this.navCtrl.back();
        });
      });
  }
}


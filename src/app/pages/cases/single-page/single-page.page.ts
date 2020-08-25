import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CasesService } from 'src/app/services/pages-apis/cases.service';
import { InAppBrowserOptions, InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.page.html',
  styleUrls: ['./single-page.page.scss'],
})
export class SinglePagePage implements OnInit {

  caseData: any = [];
  allForms: any = [];
  allVariables: any = [];
  caseId: any = '';
  formName: any = '';
  checkBoxOptions = [];
  gridOptions = [];
  loadScript = '';
  projectId = '';
  caseUid = '';
  dropDownValues = [];
  constructor(
    private router: ActivatedRoute,
    private navCtrl: NavController,
    private iab: InAppBrowser,
    private casesService: CasesService,
    private toaster: ToastService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.router.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('caseId')) {
        this.navCtrl.back();
        return;
      }
      this.caseId = paramMap.get('caseId');
      this.loadCaseData();
    });
  }
  loadCaseData() {
    this.casesService.getSingleCase(this.caseId).subscribe(data => {
      // this.caseData = data;
      let projectId = data.pro_uid;
      let caseID = data.current_task[0].tas_uid;
      this.projectId = projectId;
      this.casesService.getSteps(projectId, caseID).subscribe(data5 => {
        this.caseData = data5;
        console.log('CaseData', this.caseData);
        this.caseUid = data5[0].step_uid_obj;
        this.casesService.getDynaForm(projectId, this.caseData[0].step_uid_obj).subscribe(data1 => {
          console.log('DynaForm', data1);
          var allResult = JSON.parse(data1.dyn_content);
          this.allForms = allResult.items;


          this.casesService.getCaseVariables(this.caseId).subscribe(data3 => {
            console.log('Variables', data3);
            this.allForms.forEach(element => {
              console.log(element);
              // element.script.forEach(eachScript => {
              if (element.script.type == 'js') {
                this.loadScript = element.script.code
              }
              // })
              console.log(this.loadScript);
              element.items.forEach(element2 => {

                element2.forEach(element3 => {
                  let readOnly = false;
                  if (element3.type == 'dropdown') {
                    this.dropDownValues = [];
                    let items = {
                      itemName: element3.variable,
                      itemValue: '',
                      itemLabel: element3.label,
                      isRequired: element3.required,
                      isReadonly: element3.variable,
                      SQLQuery: element3.sql,
                      allOptions: [],
                      itemType: element3.type,
                    };
                    element3.options.forEach(item => {
                      let dropdownoption = {
                        value: item.value,
                        label: item.label,
                      }
                      items.allOptions.push(dropdownoption);
                    });
                    if (element3.sql != '' || element3.sql != null || element3.sql != 'null') {
                      let formData = {
                        dyn_uid: data1.dyn_uid,
                        field_id: element3.var_name,
                      }
                      this.casesService.executeQuery(formData, projectId, element3.var_name).subscribe(response => {
                        this.dropDownValues = [];
                        console.log('From Case Sql')
                        console.log(response);
                        response.forEach(item => {
                          let dropdownoption = {
                            value: item.text,
                            label: item.value,
                          }
                          items.allOptions.push(dropdownoption);
                        });
                      });
                    }
                    items.itemValue = data3.hasOwnProperty(items.itemName) ? data3[items.itemName] : '';
                    this.allVariables.push(items);
                  } else if (element3.type == 'text') {
                    let items = {
                      itemName: element3.variable,
                      itemValue: '',
                      itemLabel: element3.label,
                      isRequired: element3.required,
                      isReadonly: element3.variable,
                      SQLQuery: element3.sql,
                      itemType: element3.type,
                      allOptions: [],
                    };
                    items.itemValue = data3.hasOwnProperty(items.itemName) ? data3[items.itemName] : '';
                    this.allVariables.push(items);
                  } else if (element3.type === 'radio') {
                    let items = {
                      itemName: element3.variable,
                      itemValue: [],
                      itemLabel: element3.label,
                      isRequired: element3.required,
                      isReadonly: element3.variable,
                      itemType: element3.type,
                      allOptions: [],
                    };
                    element3.options.forEach(item => {
                      items.allOptions.push(item);
                    });
                    items.itemValue = data3.hasOwnProperty(items.itemName) ? data3[items.itemName] : '';
                    this.allVariables.push(items);
                  } else if (element3.type == 'checkgroup') {

                    let items = {
                      itemName: element3.variable,
                      itemValue: [],
                      itemLabel: element3.label,
                      isRequired: element3.required,
                      isReadonly: element3.variable,
                      itemType: element3.type,
                      allOptions: [],
                    };
                    this.checkBoxOptions = [];
                    element3.options.forEach(item => {
                      // items.allOptions.push(item);
                      let itms = {
                        item: item,
                        isSelected: false,
                      }
                      items.allOptions.push(item);
                    });

                    items.itemValue = data3.hasOwnProperty(items.itemName) ? data3[items.itemName] : '';
                    this.allVariables.push(items);
                  } else if (element3.type == 'grid') {
                    this.gridOptions = [];
                    console.log('From Form Grid Type');
                    console.log(element3);

                    let items = {
                      itemName: element3.variable,
                      itemValue: '',
                      itemLabel: element3.label,
                      isRequired: element3.required,
                      isReadonly: element3.variable,
                      itemType: element3.type,
                      itemOptions: [],
                    };
                    element3.columns.forEach(item => {
                      console.log(item);
                      item.itemOptions.push(item);
                    });
                    items.itemValue = data3.hasOwnProperty(items.itemName) ? data3[items.itemName] : '';
                    this.allVariables.push(items);
                  } else if (element3.type == 'textarea') {
                    let items = {
                      itemName: element3.variable,
                      itemValue: '',
                      itemLabel: element3.label,
                      isRequired: element3.required,
                      isReadonly: element3.variable,
                      SQLQuery: element3.sql,
                      itemType: element3.type,
                    };
                    items.itemValue = data3.hasOwnProperty(items.itemName) ? data3[items.itemName] : '';
                    this.allVariables.push(items);
                  } else if (element3.type == 'disease') {
                    let items = {
                      itemName: element3.variable,
                      itemValue: '',
                      itemLabel: element3.label,
                      isRequired: element3.required,
                      isReadonly: element3.variable,
                      itemType: element3.type,
                      allOptions: [],
                    };
                    if (element3.sql != '' || element3.sql != null || element3.sql != 'null') {
                      let formData = {
                        dyn_uid: data1.dyn_uid,
                        field_id: element3.var_name,
                      }
                      this.casesService.executeQuery(formData, projectId, element3.var_name).subscribe(response => {
                        console.log(response);
                        response.forEach(item => {
                          items.allOptions.push(item);
                        });
                      });
                    }
                    console.log('From Disease List');
                    console.log(items.allOptions);
                    items.itemValue = data3.hasOwnProperty(items.itemName) ? data3[items.itemName] : '';
                    this.allVariables.push(items);
                  }
                });
              });
            });
            console.log(this.allVariables);
            console.log(allResult);
            this.formName = allResult.name;
          });
        });
      });
    });

    let frmData = {
      option: 'LST',
      pageSize: 15,
      limit: 15,
      start: 0
    }
    //  this.casesService.getCustomQueryData(frmData).subscribe(data=>{
    //   console.log('Variables',data);
    //   this.caseData = data;
    // });

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
  pushArrayValue(checkbox_id: any, ev, item) {
    if (ev.detail.checked) {
      this.checkBoxOptions.push(checkbox_id);
      console.log(checkbox_id);
    } else {
      const index = this.checkBoxOptions.indexOf(checkbox_id, 0);
      if (index > -1) {
        this.checkBoxOptions.splice(index, 1);
        console.log(this.checkBoxOptions);
      }
    }
    item.itemValue = this.checkBoxOptions;
  }
  doNextStep(form) {
    console.log('From DE Next Step');
    console.log(form);
    console.log(this.allVariables);
    var obj: { [k: string]: any } = {};
    this.allVariables.forEach(element => {
      obj[element.itemName] = element.itemValue;
    });
    console.log(obj);
    this.casesService.updateVariables(obj, this.caseId).subscribe(data => {
      console.log('Variables', data);
      this.caseData = data;
      this.casesService.caseRoute([], this.caseId).subscribe(data2 => {
        this.toaster.SuccessToast('Success Fully Submit Case', 2000);
        this.navCtrl.back();
      });
    });
  }

  loadExternal() {
    var xyz: InAppBrowserOptions = {
      location: 'yes',
      closebuttoncolor: 'red',
      closebuttoncaption: 'X',
    }
    var allToken = localStorage.getItem('token_access');
    let url = 'http://192.236.147.77:8082/pm/loadpage.php';
    url += '?case=' + this.caseId;
    url += '&dynaID=' + this.caseUid;
    url += '&project=' + this.projectId;
    url += '&token=' + allToken;
    const browser = this.iab.create(url, '_blank', xyz);
    browser.executeScript({ code: this.loadScript }).catch(x => {
      console.log(x);
    });
  }
}


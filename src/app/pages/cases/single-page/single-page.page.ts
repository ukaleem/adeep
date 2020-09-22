import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
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
  currentTaskId = '';
  addNewGridOption = [];

  nodata = false;
  constructor(
    private router: ActivatedRoute,
    private rout: Router,
    private navCtrl: NavController,
    private iab: InAppBrowser,
    private casesService: CasesService,
    private toaster: ToastService,
    private alertController: AlertController,
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
    ///First Request To load Case Detail
    this.casesService.getSingleCase(this.caseId).subscribe(data => {
      console.log('First Single Case', data);

      try {
        this.projectId = data.pro_uid;
        this.currentTaskId = data.current_task[0].tas_uid;
      } catch (ex) {
        console.log(ex);
      }

      ////Second inner Request to load Steps Of case
      this.casesService.getSteps(this.projectId, this.currentTaskId).subscribe(data5 => {
        console.log('All stesps 2', data5);
        this.caseData = data5;
        try{
          this.caseUid = data5[0].step_uid_obj;
          this.loadExternal();
        }catch(ex){
          console.log(ex);
          this.nodata = true;
          // this.navCtrl.back();
        }
        //this.caseUid = data5[0].step_uid_obj;
        console.log('0 Steps to load', this.caseUid);


        
        return;
        /////Third Call to Load DynaForm fields
        this.casesService.getDynaForm(this.projectId, this.caseUid).subscribe(data1 => {
          console.log('DynaForm', data1);

          try {
            var allResult = JSON.parse(data1.dyn_content);
            this.allForms = allResult.items;
          } catch (ex) {
            console.log(ex);
          }



          //// Fourth Request To load All Variables..
          this.casesService.getCaseVariables(this.caseId).subscribe(data3 => {
            console.log('All Variables', data3);


            this.allForms.forEach(element => {
              console.log('DynaFormElement', element);

              ////Set Javascript
              if (element.script.type == 'js') {
                this.loadScript = element.script.code
              }

              /////Loop Throug Every element
              element.items.forEach(element2 => {

                console.log('DynaFormElementSingle', element2);
                element2.forEach(element3 => {

                  console.log('DynaFormElementSingleInner', element3);
                  let readOnly = false;

                  /////Drop Down Value
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
                    ///Check if SQL EXIST                     
                    if (element3.sql != '' && element3.sql != null && element3.sql != 'null') {
                      let formData = {
                        dyn_uid: data1.dyn_uid,
                        field_id: element3.var_name,
                      }
                      this.casesService.executeQuery(formData, this.projectId, element3.var_name).subscribe(response => {
                        console.log('From Case Sql')
                        console.log(response);
                        let allFromCheckList = response;
                        allFromCheckList.forEach(item => {
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

                    //// Type Text
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

                    ///Radios
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
                  } 
                  else if (element3.type == 'grid') {
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
                      items.itemOptions.push(item);
                    });
                    // items.itemValue = data3.hasOwnProperty(items.itemName) ? data3[items.itemName] : '';
                    this.allVariables.push(items);
                  } 
                  else if (element3.type == 'textarea') {
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
                      this.casesService.executeQuery(formData, this.projectId, element3.var_name).subscribe(response => {
                        response.forEach(item => {
                          items.allOptions.push(item);
                        });
                      });
                    }
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
    },err => {
      console.log(err);
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
      // location: 'no',
      // closebuttoncolor: 'red',
      closebuttoncaption: 'Done',
      // toolbar: 'no',
      toolbarcolor : '#202453',
      hideurlbar: 'yes', // hide the url toolbar
      hidenavigationbuttons: 'yes'
      
    }
    var allToken = localStorage.getItem('token_access');
   // let url = 'http://192.236.147.77:8082/pm/loadpage.php';
  //  var url2 = 'http://192.236.147.77:8084/sysworkflow/en/classic/cases/cases_Step?TYPE=DYNAFORM&UID=6343624405f362b93c5ef77004296138&POSITION=1&ACTION=EDIT&sid=' + '5254092845f4494fd103856033432596';
    var url3 = 'http://192.236.147.77:8082/pm/PMDForms'
    url3 += '?case=' + this.caseId;
    url3 += '&dynaID=' + this.caseUid;
    url3 += '&project=' + this.projectId;
    url3 += '&token=' + allToken;
    const browser = this.iab.create(url3, '_self', xyz);
    browser.on('exit').subscribe(test=> {
      console.log('Broswe Close now backe');
      this.rout.navigateByUrl('cases/all-cases');
    });

    browser.on('message').subscribe(msg=> {
      
      console.log(msg);
      browser.close();
      this.rout.navigateByUrl('cases/all-cases');
    });

    browser.on('loadstart').subscribe(msg=> {
      
      if(msg.url == 'http://192.236.147.77:8082/pm/close') {
        browser.close();
      }
      
      this.rout.navigateByUrl('cases/all-cases');
    })
  }

  isExternal = false;
  showExternal(){
    this.isExternal = true;
    this.presentAlert()
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention',
      message: 'This Case have Some Extra Action That Cant be Performs in Web Edition, Please Use Web Edition, Click On Browser(top-right) Icon to open Web View',
      buttons: ['OK']
    });

    await alert.present();
  }
  addGridItems(item: any) {
  
    item.itemOptions.forEach(itm => {
      this.addNewGridOption.push(itm);
    });
    console.log('From Add Grid Items');
    console.log(item);
    console.log(this.addNewGridOption);
  }
}


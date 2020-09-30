import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertsService } from 'src/app/services/alerts.service';
import { CasesService } from 'src/app/services/pages-apis/cases.service';

@Component({
  selector: 'app-re-assighn',
  templateUrl: './re-assighn.component.html',
  styleUrls: ['./re-assighn.component.scss'],
})
export class ReAssignComponent implements OnInit {

  @Input() taskID: any;
  @Input() ProjectID: any;
  @Input() AppID: any;
  @Input() fromType: any;
  @Input() i: any;
  selectCareTacker = '';
  allUsers : any = [];
  constructor(private mdlCtrl:  ModalController,
    private showAlerts: AlertsService,
    private cases: CasesService) { 
      
     }

  ngOnInit() {}

  closeModal(){
    this.mdlCtrl.dismiss();
  }
  ionViewWillEnter(){
    this.loadData();
  }

  loadData(){
    this.cases.caseAssignee(this.ProjectID , this.taskID).subscribe(data=> {
      
      this.allUsers = data.all_data;
      const index = this.allUsers.indexOf('id', localStorage.getItem('id'));
      if (index > -1) {
        this.allUsers.splice(index, 1);
      }
    });
  }

  saveFeed(f){
    this.cases.reAssignCase(this.AppID , {usr_uid_target:this.selectCareTacker}).subscribe(data=> {
      console.log(data);
      this.mdlCtrl.dismiss([],'ok');
    },err=> {
      this.showAlerts.showAlertNormal('Error Occurred!', '1:Internat Problem\n2:Limited Permission\n3:Target and Origin user are the same')
    })
  }
}
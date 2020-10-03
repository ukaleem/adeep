import { Component, OnInit } from '@angular/core';
import { CasesService } from 'src/app/services/pages-apis/cases.service';
import { ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-participants',
  templateUrl: './single-participants.page.html',
  styleUrls: ['./single-participants.page.scss'],
})
export class SingleParticipantsPage implements OnInit {

  caseId: any = '';
  activeSegment = 'basic';
  participatedCase:any = [];
  caseData = [];
  basicDetails :any = [];
  constructor(
    private casesService : CasesService ,
    private modalController:ModalController,
    private router:ActivatedRoute, 
    private navCtrl: NavController,
  ) { }
 
  ionViewWillEnter(){
    this.router.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('caseId')) {
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
      this.basicDetails = data;
    });
    this.casesService.getCurrentTask(this.caseId).subscribe(data=>{
      console.log(data);
      this.caseData = data;
    });
    this.casesService.getCaseVariables(this.caseId).subscribe(data=>{
      console.log(data);
      this.caseData = data;
    });
  }
  ngOnInit() {
  }
  segmentChanged(ev: any) {
    console.log(ev.detail.value);
    this.activeSegment = ev.detail.value;
  }
}

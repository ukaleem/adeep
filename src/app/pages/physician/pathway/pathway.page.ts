import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { PhysicianService } from 'src/app/services/pages-apis/physician.service';
import { PatientSingleTaskComponent } from '../../admin/patients/patient-single-task/patient-single-task.component';

@Component({
  selector: 'app-pathway',
  templateUrl: './pathway.page.html',
  styleUrls: ['./pathway.page.scss'],
})
export class PathwayPage implements OnInit {

  constructor(
    private router: ActivatedRoute,
    // private rout: Router,
    private navCtrl: NavController,
    private phy: PhysicianService,
    // private iab: InAppBrowser,
    // private casesService: CasesService,
    // private toaster: ToastService,
    // private alertController: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  projectID = '';
  allCurrent:any = [];
  allPassed:any = [];
  allTaSKS : any = [];
  ionViewWillEnter() {
    this.router.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('id')) {
        this.navCtrl.back();
        return;
      }
      this.projectID = paramMap.get('id');
      this.loadCaseData();
    });
  }

  loadCaseData(){
    this.phy.get_path_detail(this.projectID).subscribe(data=> {
      this.allCurrent = data.all_data.current;
      this.allPassed = data.all_data.passed;
      this.allTaSKS = data.all_data.tasks;
      console.log(this.allCurrent);
    })
  }

  activeSegment = 'current';
  segmentChanged(ev: any) {
    this.activeSegment = ev.detail.value;
  }
  doRefresh(event) {
    this.ionViewWillEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
//COMPLETED
  async presentModal(app, status) {
    const modal = await this.modalCtrl.create({
      component: PatientSingleTaskComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'PROJECT_ID': this.projectID,
        'APP_ID': app,
        'type' : 'ph',
        'status' : status
      }
    });
    return await modal.present();
  }

}

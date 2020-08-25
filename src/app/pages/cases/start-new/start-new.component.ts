import { Component, OnInit } from '@angular/core';
import { CasesService } from 'src/app/services/pages-apis/cases.service';
import { ModalController, ToastController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';

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
     private toaster: ToastService,
     private toastController: ToastController,
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
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
  }

  startCase(caseDetail: any) {
    this.casesService.startCase(caseDetail).subscribe(data=>{
      // console.log(data);
      if(data) {
        this.toaster.SuccessToast('Success Fully Start a New Case',2000);
      } else {
        this.toaster.ErrorToast('Cannot Success Fully Start a New Case',2000);
      }
      this.closeModal();
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CasesService } from 'src/app/services/pages-apis/cases.service';
import { ModalController } from '@ionic/angular';
import { StartNewComponent } from '../start-new/start-new.component';

@Component({
  selector: 'app-all-cases',
  templateUrl: './all-cases.page.html',
  styleUrls: ['./all-cases.page.scss'],
})
export class AllCasesPage implements OnInit {

  allCases:any = [];
  ionViewWillEnter(){
    this.casesService.getAllProcess().subscribe(data=>{
      console.log(data);
      this.allCases = data;
    });
  }
  constructor(
    private casesService : CasesService ,
    private modalController:ModalController,
    ) { 
   
  }

  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: StartNewComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}

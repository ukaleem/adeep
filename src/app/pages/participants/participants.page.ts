import { Component, OnInit } from '@angular/core';
import { CasesService } from 'src/app/services/pages-apis/cases.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.page.html',
  styleUrls: ['./participants.page.scss'],
})
export class ParticipantsPage implements OnInit {

  constructor(
    private casesService : CasesService ,
    private modalController:ModalController,
  ) { }

  allParticipants:any = [];
  ionViewWillEnter(){
    this.casesService.getAllParticipants().subscribe(data=>{
      console.log(data);
      this.allParticipants = data;
    })
  }
  ngOnInit() {
  }

}

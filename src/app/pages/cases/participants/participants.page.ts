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
  
  isSearch = false;
  allParticipantsFilter: any = [];

  ionViewWillEnter(){
    this.casesService.getAllParticipants().subscribe(data=>{
      console.log(data);
      this.allParticipants = data;
      this.allParticipantsFilter = this.allParticipants;
    })
  }
  ngOnInit() {
  }
  showSearch() { 
    this.isSearch = true;
  }
  closeSearch() {
    this.isSearch = false;
  }
  searchCase(ev){
    console.log(ev.detail.value);
    let searchTerm = ev.detail.value.toLowerCase();
    if (searchTerm === '') {
      this.allParticipants = this.allParticipantsFilter;
    } else {
      this.allParticipants = this.allParticipantsFilter.filter(item => {
        if( item.app_tas_title !== null && item.app_tas_title.toLowerCase().indexOf(searchTerm.toLowerCase() || item.usr_firstname !== null && item.usr_firstname.toLowerCase().indexOf(searchTerm.toLowerCase())) > -1){
          return true;
        }
        return false;
      });
    }
  }
    doRefresh(event) {
    this.ionViewWillEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}

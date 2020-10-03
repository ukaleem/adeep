import { Component, OnInit } from '@angular/core';
import { CasesService } from 'src/app/services/pages-apis/cases.service';

@Component({
  selector: 'app-draft-cases',
  templateUrl: './draft-cases.page.html',
  styleUrls: ['./draft-cases.page.scss'],
})
export class DraftCasesPage implements OnInit {

  allCases:any = [];
  user_id: any;
  isSearch = false;
  allDraftCassFilter: any = [];
  allDraftCases:any = [];
  constructor(
    private casesService : CasesService ,
  ) { }
 
  ionViewWillEnter(){
    this.casesService.getDraftCases().subscribe(data=>{
      console.log(data);
      this.allDraftCases = data;
      this.allDraftCassFilter = this.allDraftCases;
    });
  }

  reLoad(){
    this.ionViewWillEnter();
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
      this.allDraftCases = this.allDraftCassFilter;
    } else {
      this.allDraftCases = this.allDraftCassFilter.filter(item => {
        if( item.app_tas_title !== null && item.app_tas_title.toLowerCase().indexOf(searchTerm.toLowerCase() || item.app_pro_title !== null && item.app_pro_title.toLowerCase().indexOf(searchTerm.toLowerCase())) > -1){
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

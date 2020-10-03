import { Component, OnInit } from '@angular/core';
import { CasesService } from 'src/app/services/pages-apis/cases.service';

@Component({
  selector: 'app-unassigned-cases',
  templateUrl: './unassigned-cases.page.html',
  styleUrls: ['./unassigned-cases.page.scss'],
})
export class UnassignedCasesPage implements OnInit {

  constructor(
    private casesService : CasesService ,
  ) { }
  
  allCases:any = [];
  isSearch = false;
  allUnassignedCassFilter: any = [];
  allUnassignedCases:any = [];
  ionViewWillEnter(){
    this.casesService.getAllUnassignedCases().subscribe(data=>{
      console.log(data);
      this.allUnassignedCases = data;
      this.allUnassignedCassFilter = this.allUnassignedCases;
    });
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
      this.allUnassignedCases = this.allUnassignedCassFilter;
    } else {
      this.allUnassignedCases = this.allUnassignedCassFilter.filter(item => {
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

  reLoad(){
    this.ionViewWillEnter();
  }
}

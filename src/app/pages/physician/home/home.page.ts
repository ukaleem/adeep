import { Component, OnInit } from '@angular/core';
import { PhysicianService } from 'src/app/services/pages-apis/physician.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  loading = true;
  isSearch = false;

  constructor(private phy: PhysicianService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loadData();
    this.loading = false;
  }
  allData: any = [];
  dataFilter: any = [];
  loadData() {
    this.phy.get_all_my_pathways(localStorage.getItem('id')).subscribe(data => {
      this.allData = data.all_data;
      this. dataFilter = this.allData;
    })
  }

  showSearch() { 
    this.isSearch = true;
  }
  closeSearch() {
    this.isSearch = false;
  }
  doSearch(ev){
    console.log(ev.detail.value);
    let searchTerm = ev.detail.value.toLowerCase();
    if (searchTerm === '') {
      this.allData = this.dataFilter;
    } else {
      this.allData = this.dataFilter.filter(item => {
        if( item.PRO_TITLE !== null && item.PRO_TITLE.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
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

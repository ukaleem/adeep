import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminService } from 'src/app/services/pages-apis/admin.service';

@Component({
  selector: 'app-custom-search',
  templateUrl: './custom-search.component.html',
  styleUrls: ['./custom-search.component.scss'],
})
export class CustomSearchComponent implements OnInit {
  selectedDisease: any;
  @Input() search_for: any;
  @Input() search_id: any;
  @Input() search_name: any;
  isRadio  = true;
  isCheckbox = false;
  allLoadData:any = [];
  allDataBackUp:any = [];
  selectValue = '';

  constructor(private mdlCtrl: ModalController,
    private admin: AdminService) { }

  ngOnInit() {}

  changeSearch(e){
    if(this.search_for == 'd'){
      this.searchDisease(e.detail.value);
    }else if(this.search_for == 's'){
      this.searchSpecialties(e.detail.value);
    }     
    console.log(e.detail.value);
  }
  closeModal(){
    this.mdlCtrl.dismiss();
  }
  ionViewWillEnter(){
    console.log(this.search_for);
    if(this.search_for == 'd'){
      this.loadDieses()
    }else if(this.search_for == 's'){
      this.loadSpecialties()
    }
  }

  loadDieses(){
    this.admin.allDisease().subscribe(data=> {
      this.allLoadData = data.all_data;
    })
  }

  loadSpecialties(){
    this.admin.allSpecialties().subscribe(data=> {
      this.allLoadData = data.all_data;
      this.allDataBackUp = data.all_data;
    })
  }

  diseaseValue(d){
    return JSON.stringify([d.PAT_DISEASE_ID,d.PAT_DISEASE_NAME]);
  }

  speciositiesValue(s){
    return JSON.stringify([s.SPECIALTY_ID,s.SPECIALTY_NAME]);
  }

  
  selectValueOK(){
    console.log(this.selectValue);
    if(this.selectValue){
      this.mdlCtrl.dismiss(this.selectValue , 'ok');
    }
  }
  searchDisease(val){
    this.admin.searchDisease({search : val}).subscribe(data=> {
      this.allLoadData = data.all_data;
    })
  }
  searchSpecialties(val){
    this.allLoadData = this.allDataBackUp.filter(t => { 
      if(t.SPECIALTY_NAME.toLowerCase().indexOf(val) > -1)
      return true;return false;
    });
  }
  patientAssignTask(){

  }
  save(e){

  }
}

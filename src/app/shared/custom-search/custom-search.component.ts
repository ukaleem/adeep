import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

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

  constructor(private mdlCtrl: ModalController) { }

  ngOnInit() {}

  changeSearch(e){
    console.log(e.detail.value);
  }
  closeModal(){
    this.mdlCtrl.dismiss();
  }
  ionViewWillEnter(){
    
  }
  patientAssignTask(){

  }
  save(e){

  }
}

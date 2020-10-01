import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AdminService } from 'src/app/services/pages-apis/admin.service';

@Component({
  selector: 'app-diseases',
  templateUrl: './diseases.page.html',
  styleUrls: ['./diseases.page.scss'],
})
export class DiseasesPage implements OnInit {

  segmentVelue = 'disease';
  diseaseList : any = [];
  specilatiesList : any = [];
  
  constructor(
    private admin: AdminService, 
    private alertController : AlertController,
  ) { }
  ngOnInit() {
  }
  changeSegment(ev) {
    this.segmentVelue = ev.detail.value;
    console.log(this.segmentVelue);
  }
  doRefresh(e){
    this.loadData();
  }

  ionViewWillEnter(){
    this.loadData();
  }

  loadData(){
    this.admin.allDisease().subscribe(data=> {
      console.log('Disease List');
      // console.log(data);
      this.diseaseList = data.all_data;
      console.log(this.diseaseList);
    });
    this.admin.allSpecialties().subscribe(data=> {
      console.log('Specialties List');
   
      this.specilatiesList = data.all_data;
      console.log(this.specilatiesList);
    });
  }
  deleteDisease(diease) {

  }
  async editDiease() {
    const alert = await this.alertController.create({
      header: 'Set Disease Name',
      message: 'Diease Name',
      inputs: [
        {
          name: 'disease_name',
          type: 'text',
          placeholder: 'Disease Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }
}

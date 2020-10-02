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
  deleteDisease(PAT_DISEASE_ID: any) {
    let disease =  {
      disease_id: PAT_DISEASE_ID,
    }
    this.admin.deleteDisease(disease).subscribe(data=> {
      console.log(data);
    });
  }
  deleteSpecilaity(SPECIALTY_ID) {
    let spec = {
      specility_id:SPECIALTY_ID, 
    }
    this.admin.deleteSpecialty(spec).subscribe(data=> {
      console.log(data);
    });
  }

  async editSpeciality(specialityId: any) {
    const alert = await this.alertController.create({
      header: 'Set Speciality Name',
      message: 'Specilaity Name',
      inputs: [
        {
          name: 'specilaity_name',
          type: 'text',
          placeholder: 'Specilaity Name'
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
      
          handler: specialityData => {
            let specilaity = {
              specility_id: specialityId,
              specilaity_name: specialityData.specilaity_name,
              // specilaity_name: 'KKKKKKKKKKK',
            }
            this.admin.editSpecialty(specilaity).subscribe(data=> {
              console.log(data);
            });
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }
  async editDiease(PAT_DISEASE_ID: any) {
    const alert = await this.alertController.create({
      header: 'Set Disease Name',
      message: 'Disease Name',
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
          text: 'Save',
          // type: submit,
          handler: dataForm => {
            let disease = {
              disease_id: PAT_DISEASE_ID,
              disease_name:dataForm.disease_name
            }
            this.admin.editDisease(disease).subscribe(data=> {
              console.log(data);
            });
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }
}

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
  searchTerm = '';
  isSearch = false;
  isLoading = true;
  result = false;
  diseaseList : any = [];
  filterDisease: any = [];
  specilatiesList : any = [];
  allRestaurants:any = [];
  filteredRestaurants: any = [];
  specilatiesListFilter : any = [];
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
      this.diseaseList = data.all_data;
      this.isLoading = false;
      
      console.log(this.diseaseList);
    }, (error) => {
      console.log(error);
    });
    this.admin.allSpecialties().subscribe(data=> {
      console.log('Specialties List');
      this.specilatiesList = data.all_data;
      this. specilatiesListFilter = this.specilatiesList;
      console.log(this.specilatiesList);
    }, (error) => {
      console.log(error);
    });
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
    if(this.segmentVelue == 'disease') {
      if (searchTerm === '') {
        this.result = true;
        this.filterDisease = this.diseaseList;
      } else {
        this.result = true;
        this.filterDisease = this.diseaseList.filter(item => {
          if( item.PAT_DISEASE_NAME !== null && item.PAT_DISEASE_NAME.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
            return true;
          }
          return false;
        });
      }
    } else {
      if (searchTerm === '') {
        this.result = true;
        this.specilatiesList = this.specilatiesListFilter;
      } else {
        this.result = true;
        this.specilatiesList = this.specilatiesListFilter.filter(item => {
          if( item.SPECIALTY_NAME !== null && item.SPECIALTY_NAME.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
            return true;
          }
          return false;
        });
      }
    }
   
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

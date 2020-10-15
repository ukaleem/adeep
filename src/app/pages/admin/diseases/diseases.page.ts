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

  doRefresh(event) {
    console.log('Begin async operation');
    this.ionViewWillEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  ionViewWillEnter(){
    this.loadData();
  }

  searched = '';
  loadData(){
    // this.admin.allDisease().subscribe(data=> {
    //   console.log('Disease List');
    //   this.diseaseList = data.all_data;
    //   this.isLoading = false;
    //   console.log(this.diseaseList);
    // }, (error) => {
    //   console.log(error);
    // });
    this.admin.searchDisease({search:this.searched }).subscribe(data => {
      this.filterDisease = data.all_data;
      this.isLoading = false;
      this.result = true;
    }, error=> {
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
      this.admin.searchDisease({search:searchTerm }).subscribe(data => {
        this.filterDisease = data.all_data;
      })
      this.searched = searchTerm;
      // if (searchTerm === '') {
      //   this.result = true;
      //   this.filterDisease = this.diseaseList;
      // } else {
      //   this.result = true;
      //   this.filterDisease = this.diseaseList.filter(item => {
      //     if( item.PAT_DISEASE_NAME !== null && item.PAT_DISEASE_NAME.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
      //       return true;
      //     }
      //     return false;
      //   });
      // }
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

  addDisease(){
    this.addData();
  }
  deleteDisease(PAT_DISEASE_ID: any) {
    let disease =  {
      disease_id: PAT_DISEASE_ID,
    }
    this.admin.deleteDisease(disease).subscribe(data=> {
      console.log(data);
      this.loadData();
    });
  }
  deleteSpecilaity(SPECIALTY_ID) {
    let spec = {
      specility_id:SPECIALTY_ID, 
    }
    this.admin.deleteSpecialty(spec).subscribe(data=> {
      console.log(data);
      this.loadData();
    });
  }

  async editSpeciality(specialityId: any , spName) {
    const alert = await this.alertController.create({
      header: 'Set Specialty Name',
      message: 'Specialty Name',
      inputs: [
        {
          name: 'specialty_name',
          type: 'text',
          value: spName,
          placeholder: 'Specialty Name'
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
              specilaity_name: specialityData.specialty_name,
            }
            this.admin.editSpecialty(specilaity).subscribe(data=> {
              console.log(data);
              this.loadData();
            });
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }
  async editDiease(PAT_DISEASE_ID: any , DISEASE_NAME) {
    const alert = await this.alertController.create({
      header: 'Set Disease Name',
      message: 'Disease Name',
      inputs: [
        {
          name: 'disease_name',
          type: 'text',
          value: DISEASE_NAME,
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

              this.loadData();
            });
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }

  async addData() {
    let head = this.segmentVelue == 'disease' ? 'Add Disease' : 'Add Specialty'
    const alert = await this.alertController.create({
      header: head,
      inputs: [
        {
          name: 'disease_name',
          type: 'text',
          placeholder: 'Enter Name',
          attributes : {
            minLength : 3
          }
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
            if(!dataForm.disease_name || dataForm.disease_name.length < 3){
              return;
            }
            let disease = {
              form_type: this.segmentVelue,
              disease_name:dataForm.disease_name
            }
            this.admin.addDisease(disease).subscribe(data=> {
              // console.log(data);

              this.loadData();
            });
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminService } from 'src/app/services/pages-apis/admin.service';
import { ToastService } from 'src/app/services/toast.service';
import { CustomSearchComponent } from 'src/app/shared/custom-search/custom-search.component';

@Component({
  selector: 'app-patient-assighn-task',
  templateUrl: './patient-assighn-task.component.html',
  styleUrls: ['./patient-assighn-task.component.scss'],
})
export class PatientAssignTaskComponent implements OnInit {

  @Input() patientID: any;
  // allDisease : any = [];
  // allSpecialty : any = [];
  allProcess : any = [];
  allUsers : any = [];

  selectedDisease :any;
  selectPathway ;
  selectPatient ;
  selectDisease = {
    id : null,
    name: '',
  }
  selectSpecialty = {
    id : null,
    name: '',
  }
  constructor(private mdlCtrl : ModalController,
    private toastService : ToastService,
    private admin: AdminService) { }

  ngOnInit() {}

  closeModal(){
    this.mdlCtrl.dismiss();
  }

  async patientAssignTask(f) {
    const modal = await this.mdlCtrl.create({
      component: CustomSearchComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'search_for': f,
        'search_id': this.selectDisease.id,
        'search_name': this.selectDisease.name,
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        if(data.role == 'ok'){
          const returnData = JSON.parse(data.data);
          if(f == 'd'){
            this.selectDisease.id = returnData[0];
            this.selectDisease.name = returnData[1];
          }else if(f == 's'){
            this.selectSpecialty.id = returnData[0];
            this.selectSpecialty.name = returnData[1];
          }
          this.loadProjects();
        }
    });
    return await modal.present();
  }

  loadProjects(){
    if(this.selectSpecialty.id && this.selectDisease.id){
      this.admin.getCustomProcess(this.selectDisease.id,this.selectSpecialty.id).subscribe(data=> {
        console.log(data);
        this.allProcess = data.all_data;
      })
    }
  }
  changeProcess(e){
    this.admin.getProcessUsers(e.detail.value).subscribe(data=> {
      console.log(data);
      this.allUsers = data.all_data;
    })
  }

  savePatient(f){
    let formData ={
      pid : this.patientID,
      guid: this.selectPathway,
      uid: this.selectPatient,
    }
    this.admin.startPathway(formData).subscribe(data=> {
      console.log(data);
      if(data.status){
        this.mdlCtrl.dismiss(null,'ok');
        this.toastService.SuccessToast('Successfully',2000);
      }else{
        this.toastService.ErrorToast('Some Error',2000);
      }
    }, error => {
      this.toastService.ErrorToast('Some Error',2000);
    });
  }
}

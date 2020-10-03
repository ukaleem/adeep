import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/pages-apis/admin.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.page.html',
  styleUrls: ['./dashboards.page.scss'],
})
export class DashboardsPage implements OnInit {

  showPathway = false;
  showPatients = false;
  showAllUsers = false;
  showDisease = false;
  showSpecial = false;
  showCases = false;
  allPathwaysCount: any;
  activePathwaysCount: any;
  unactivePathwaysCount: any;

  curedPatients: any;
  onGoingPatients: any;
  remainingPatients: any;

  activeUsers: any;
  unactiveUsers: any;
  allUsers: any;
  careTackers: any;
  doctors: any;
  patients: any;
  physicans: any;
  allAdmins: any;

  allDisease: any;
  withPatient: any;
  withProcess: any;

  allSpecilities: any;
  allSpecilitiesWithProcess: any;

  inboxCount: any;
  draftCount: any;
  participatedCount: any;

  constructor(private admin : AdminService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loadData();
    this.loadRoles();
  }

  loadRoles(){
    const ROLE= localStorage.getItem('role');
    if(ROLE == 'ADMIN_OFFICE'){
      this.showPathway = true;
      this.showPatients = true;
      this.showAllUsers = true;
      this.showDisease = true;
      this.showSpecial = true;
      this.showCases = true;
    }else if(ROLE == 'CARETAKER'){
      this.showCases = true;
    }else if(ROLE == 'PHYSICIAN'){
      this.showCases = true;
      this.showPathway = true;
      this.showPatients = true;
      this.showDisease = true;
      this.showSpecial = true;
    }else if(ROLE == 'DOCTOR'){
      this.showCases = true;
      this.showPathway = true;
      this.showPatients = true;
      this.showDisease = true;
      this.showSpecial = true;
    }
  }
  allData: any = [];
  loadData(){
    this.admin.getDashboard().subscribe(data => {
      this.allData = data;
      console.log('All data',this.allData);
      this.allPathwaysCount = this.allData.all_data.proList[1].proList;
      this.activePathwaysCount = this.allData.all_data.proListActive[1].proListActive;
      this.unactivePathwaysCount = this.allData.all_data.proListInactive[1].proListInactive;

      this.curedPatients = this.allData.all_data.patientCured[1].allCured;
      this.onGoingPatients = this.allData.all_data.patientOnGoing[1].allGoing;
      this.remainingPatients = this.allData.all_data.patientRemaining[1].allUsed;

      this.activeUsers = this.allData.all_data.allUser[1].active;
      this.unactiveUsers= this.allData.all_data.allUser[1].unActive;
      this.allUsers = this.allData.all_data.allUser[1].allUser;
      this.careTackers = this.allData.all_data.allUser[1].careTacker;
      this.doctors= this.allData.all_data.allUser[1].doctor;
      this.patients= this.allData.all_data.allUser[1].patient;
      this.physicans= this.allData.all_data.allUser[1].physican;
      this.allAdmins= this.allData.all_data.allUser[1].admin;

      this.allDisease =this.allData.all_data.allDisease[1].allDiseas;
      this.withPatient = this.allData.all_data.allDisease[1].withPatient;
      this.withProcess = this.allData.all_data.allDisease[1].withProcess;


      this.allSpecilities = this.allData.all_data.allSpecial[1].allSpecilities;
      this.allSpecilitiesWithProcess = this.allData.all_data.allSpecial[1].withProcess;


      this.inboxCount = this.allData.all_data.allCases[1].inbox;
      this.draftCount = this.allData.all_data.allCases[1].draft;
      this.participatedCount = this.allData.all_data.allCases[1].particpate;

      console.log(this.allPathwaysCount); 

    });
    //getDashboard
  }

}

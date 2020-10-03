import { Component, OnInit } from '@angular/core';
import { CasesService } from 'src/app/services/pages-apis/cases.service';


@Component({
  selector: 'app-cases',
  templateUrl: './cases.page.html',
  styleUrls: ['./cases.page.scss'],
})
export class CasesPage implements OnInit {
  ROLE_ADMIN = false;
  ROLE_PHYSICIAN = false;
  ROLE_CARETAKER = false;
  constructor(private casesService : CasesService) { 
    const ROLE = localStorage.getItem('role');
    if (ROLE == "ADMIN_OFFICE" || ROLE == "PROCESSMAKER_ADMIN" ){
      this.ROLE_ADMIN = true;
    }else if (ROLE == "PHYSICIAN"){
      this.ROLE_PHYSICIAN = true;
    }else if (ROLE == "CARETAKER"){
      this.ROLE_CARETAKER = true;
    }
   }

  ngOnInit() {
  }

  
}

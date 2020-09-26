import { Component, OnInit } from '@angular/core';
import { CasesService } from 'src/app/services/pages-apis/cases.service';


@Component({
  selector: 'app-cases',
  templateUrl: './cases.page.html',
  styleUrls: ['./cases.page.scss'],
})
export class CasesPage implements OnInit {
  ROLE_PATIENT = false;
  constructor(private casesService : CasesService) { 
    if (localStorage.getItem('role') == "ADMIN_OFFICE" || localStorage.getItem('role') == "PROCESSMAKER_ADMIN" ){
      this.ROLE_PATIENT = true;
    }
   }

  ngOnInit() {
  }

}

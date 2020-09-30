import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CasesService } from 'src/app/services/pages-apis/cases.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent implements OnInit {

  @Input() taskID: any;
  @Input() ProjectID: any;
  @Input() AppID: any;
  @Input() fromType: any;
  @Input() i: any;
  constructor(
    private modalCtrl : ModalController,
    private cases: CasesService) { }

  caseNote = '';
  ngOnInit() {}

  closeModal(){
    this.modalCtrl.dismiss();
  }

  saveFeed(f){
    this.cases.caseNotesAdd(this.AppID, {note_content: this.caseNote}).subscribe(data=> {
      console.log(data);
      this.modalCtrl.dismiss(null,'ok');
    }, error=> {
      console.log(error);
    });
  }

}

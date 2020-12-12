import { PopoverController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-login-setting',
  templateUrl: './login-setting.component.html',
  styleUrls: ['./login-setting.component.scss'],
})
export class LoginSettingComponent implements OnInit {

  @Input() serverType;
  @Input() languageType;
  // serverType  = ;
  constructor(private popOver: PopoverController, private language: LanguageService) { }

  ngOnInit() {
    // localStorage.setItem('server',this.serverType);
  }

  ionViewWillEnter(){
    let languageType = localStorage.getItem("LNG_KEY");
    // this.serverType = localStorage.getItem('server');
    // if(!this.serverType){
    //   this.serverType = '1';
    //   localStorage.setItem('server',this.serverType);
    // }
  }
  ionViewDidEnter(){
    console.log(this.serverType);
  }
  changeValue($event){
    console.log(this.serverType);
    localStorage.setItem('server',this.serverType);
    this.popOver.dismiss();
  }

  changeLanguage(){
    this.language.setLanguage(this.languageType)
  }
}

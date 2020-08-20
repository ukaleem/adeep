import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  
  selectedLng = '';

  constructor(private translate: TranslateService, private storage: Storage) { }

  setInitialAppLanguage() {
    let language = this.translate.getBrowserLang();
    console.log('default language is', language);
    this.translate.setDefaultLang(language);
    this.storage.get(LNG_KEY).then(val=>{
      if(val){
        this.setLanguage(val);
        this.selectedLng = val;
      }
    });
    
  }

  getLanguage(): any {
    return [
      {text:'English',value:'en',img:'assets/images/en.png'},
      {text:'spanish',value:'es',img:'assets/images/es.png'},
    ];
  }

setLanguage(lng) {
this.translate.use(lng);
this.selectedLng = lng ;
this.storage.set(LNG_KEY, lng);
}
}

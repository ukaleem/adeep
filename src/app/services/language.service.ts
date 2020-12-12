import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
const LNG_KEY = "SELECTED_LANGUAGE";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  selectedLng = "";

  constructor(private translate: TranslateService) {}

  setInitialAppLanguage() {
    let language = this.translate.getBrowserLang();
    console.log("default language is", language);
    this.translate.setDefaultLang('en');
    // this.setLanguage('en');
    return;
    let lang = localStorage.getItem("LNG_KEY");
    if (lang) {
      this.setLanguage(lang);
      this.selectedLng = lang;
    }

    // this.storage.get(LNG_KEY).then(val=>{
    //   if(val){
    //     this.setLanguage(val);
    //     this.selectedLng = val;
    //   }
    // });
  }

  getLanguage() {
    return [
      { text: "English", value: "en", img: "assets/images/en.png" },
      { text: "spanish", value: "es", img: "assets/images/es.png" },
    ];
  }

  setLanguage(lng) {
    this.translate.use(lng);
    this.selectedLng = lng;
    localStorage.setItem('LNG_KEY',lng);
  }
}

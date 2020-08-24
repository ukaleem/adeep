import { Component, OnInit, ViewChild , ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DomSanitizer} from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
import { SecurityContext } from '@angular/compiler/src/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-single-case',
  templateUrl: './single-case.component.html',
  styleUrls: ['./single-case.component.scss'],
})
export class SingleCaseComponent implements OnInit {

  constructor(private modalCtrl:ModalController,
    private iab: InAppBrowser,
    private sanitizer: DomSanitizer) { 
    this.testIframe = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
    <div>Hello How Are You Are You ok</div>
    <h2></h2>
    </body>
    </html>
    `;
  }

  ngOnInit() {}

  closeModal(){
    this.modalCtrl.dismiss();
  }

  transform() {
    let text1 = `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
      <div>Hello How Are You Are You ok</div>
      <h2></h2>
      </body>
      </html>
  
    `
    //this.sanitizer.sanitize(SecurityContext.URL,'ok');
  //  this.sanitizer.bypassSecurityTrustHtml(text1);
    return this.sanitizer.bypassSecurityTrustHtml(text1);
  }

  testIframe = '';

  loadBrowser(){
    var xyz: InAppBrowserOptions = {
      location : 'yes',
      closebuttoncolor : 'red',
      closebuttoncaption: 'X',
    }
    const browser = this.iab.create('http://192.236.147.77:8082/pm/loadpage.php','_self',xyz);
  }

}

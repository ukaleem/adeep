import { Component, Input } from "@angular/core";

import { PopoverController, NavParams } from "@ionic/angular";

@Component({
  template: `
    <ion-content>
    <ion-list>
    <ion-radio-group>
      <ion-list-header>
        <ion-label>
          <b>Sorted By</b>
        </ion-label>
      </ion-list-header>
  
      <ion-item style="border-bottom: 1px solid #3880ff;margin-left: 19px;margin-right: 19px;">All
        <ion-label></ion-label>
        <ion-radio value="all"></ion-radio>
      </ion-item>
  
      <ion-item style="border-bottom: 1px solid #3880ff;margin-left: 19px;margin-right: 19px;">
        <ion-label>New</ion-label>
        <ion-radio value="new"></ion-radio>
      </ion-item>
  
      <ion-item style="border-bottom: 1px solid #3880ff;margin-left: 19px;margin-right: 19px;">
        <ion-label>My</ion-label>
        <ion-radio value="my"></ion-radio>
      </ion-item>
  
      <ion-item style="margin-left: 19px;margin-right: 19px;">
        <ion-label>Replied</ion-label>
        <ion-radio value="replied"></ion-radio>
      </ion-item>
    </ion-radio-group>
  </ion-list>
    </ion-content>
  `
})
export class FeedBackSortingFilterPopoverPage {
  // @Input() thisFrom: string;
  @Input("thisFrom") thisFrom;
  @Input() sortBy: string;

  showExtra = false;

  showSortBy = false;
  showViewBy = false;
  simpleView = false;

  theSort;
  theSortArray: any = [];
  constructor(public popoverCtrl: PopoverController,params: NavParams) {

      this.thisFrom = params.get('thisFrom');
      this.sortBy = params.get('sortBy');
      console.log(this.sortBy);
    console.log(this.thisFrom);

    if(this.thisFrom == 'ag'){
      this.showSortBy = true;
      this.theSort = this.sortBy;
      this.theSortArray = [
        {
          name: 'By Name',
          id: 'title'
        },
        {
          name: 'By ID',
          id: 'id'
        },
      ]
    }
  }
  search1 = false;

  support() {
    // this.app.getRootNavs()[0].push('/support');
    this.popoverCtrl.dismiss();
  }

  close(url: string) {
    // window.open(url, '_blank');
    this.popoverCtrl.dismiss("Hello", "cansel");
  }

  changeSort(ev: any) {
    console.log(ev);
    this.popoverCtrl.dismiss(ev.detail.value, "sort_OK");
  }
  sortedBy(ev: any) {
   // console.log(this.thisView);
    this.popoverCtrl.dismiss(ev.detail.value, "view");
  }
  applyChanges() {
    this.popoverCtrl.dismiss(
      {
        sort: "abc",
        view: "abc"
      },
      "save"
    );
  }
  changeView() {
    this.search1 = !this.search1;
    console.log(this.search1);
  }
  showFilter() { 
   // this.popoverCtrl.dismiss(this.simpleView, 'ok');
  }
}

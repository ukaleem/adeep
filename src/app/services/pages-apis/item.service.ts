import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private api: ApiService) { } 

  getSingleItem(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : 501,showLoading : true});
  } 
  getSingleCategory(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : 502,showLoading : true});
  } 
  getSingleDeal(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : 503,showLoading : true});
  } 
  addCategory(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : 504,showLoading : true});
  } 
  updateMenuCategory(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : 505,showLoading : true});
  } 
  allCategories(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : 506,showLoading : true});
  } 
  allGradient(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : 507,showLoading : true});
  } 
  addGradient(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : 508,showLoading : true});
  } 
  singleGradient(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : 509,showLoading : true});
  } 
  deleteGradient(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : 510,showLoading : true});
  }
  changeGradientStatus(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : 511,showLoading : true});
  }
  deleteItemFromGradient(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : 512,showLoading : true});
  }
  addItemInGradient(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : 513,showLoading : true});
  }
  addMenuItem(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : 514,showLoading : true});
  }
  updateMenuItem(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : 515,showLoading : true});
  }
  getAllItems(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : 516,showLoading : true});
  }
  deletMenuItem(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : 517,showLoading : true});
  }
  changeItemAvailability(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : 518,showLoading : true});
  }
  deletItemGradient(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : 519,showLoading : true});
  }
  addItemGradient(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : 520,showLoading : true});
  }
  getItemGradient(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : 521,showLoading : true});
  }
  deletCategory(frmData) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : 522,showLoading : true});
  }
}

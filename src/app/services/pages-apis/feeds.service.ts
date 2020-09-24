import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { EndpointsService } from '../endpoints.service';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {

  constructor(private api: ApiService , private endPoints: EndpointsService) { }

  getAllFeeds(u) {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.GET_ALL_FEED(u),showLoading : true, showError : true});
  }
  getSingleFeeds(f) {
    return this.api.commonGet({isToken :false,endPointUrl : this.endPoints.GET_SINGLE_FEED(f),showLoading : true, showError : true});
  }
  updateFeed(frmData , f) {
    return this.api.commonPost(frmData,{isToken :false,endPointUrl : this.endPoints.UPDATE_FEED(f),showLoading : true, showError : true});
  }
}

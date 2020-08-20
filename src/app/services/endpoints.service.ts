import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  //Modules
  AUTH = 'registration'; //100



  //Urls For  AUTH --100
  ADMIN_LOGIN = 'owner_login'; //101
  FORGET_PASSWORD = 'forget_password';  //102  
  FORGET_PASSWORD_TOKEN = 'check_user_recover_token';  //103
  FORGET_PASSWORD_NEW = 'recover_password_update';  //104
  PROFILE_ADDRESS_UPDATE = 'profile_update';  //105
  UPDATE_PASSWORD = 'owner_update_password';  //106
  UPDATE_PROFILE = 'owner_profile_detail_updation';  //107
  GET_PROFILE = 'owner_profile_details';  //108
  OWNER_NOTIFICATION = 'owner_notification';  //109
  READ_NOTIFICATIONS = 'read_Notifications'; //110
  
  
  RESTAURANTS = 'restaurent';  //200
  RESTAURANTS_GET = 'restaurent_get';  //200


  // URLS FOR RESTURANRS
  ADD_RESTAURANT = 'add_restaurent';  //201
  GET_RESTAURANT = 'get_restaurents' ; //202
  SINGLE_RESTAURANT = 'single_restaurent' ; //203 
  DELETE_RESTAURANT = 'delete_restaurent' ; //204 
  BLOCK_RESTAURANT = 'blocked_restaurent' ; //205 
  ACTIVE_RESTAURANT = 'reactive_restaurent' ; //206   
  ADD_RESTAURANT_MANGER = 'restaurent_manager' ; //207 
  ADD_RESTAURANT_IMAGE = 'upload_restaurent_image' ; //208  

  GET_CONTACT_LIST = 'contact_us'; //209

  UPDATE_RESTAURANT = 'update_restaurent' ; //220 
  MSG_STATUS_AS_READ = 'franchise_message_change_status_as_read' ; //215

// 
  RESTAURANTS_ORDERS = 'restaurant_orders';  // 600
  GET_TODAY_ORDER_CLIENT = 'today_restaurant_details'; // 601
  KIKOUT_BLOCK_CLIENT = 'change_client_status'; // 602

   // Customers Module 300
   GET_ALL_CUSTOMERS = 'client_list'; // 301

   // Franchises Module 400
   GET_ALL_FRANCHISES = 'franchise_list'; // 401

  RESTAURANT_MENU = 'restaurant_menu'; // 500
  // Urls For  RESTAURANTS MENU --500
  SINGLE_MENU_ITEM = 'single_menu_items'; // 501
  GET_SINGLE_CATEGORY = 'menu_category_details';  // 502
  GET_DEALS_SINGLE = 'restaurant_deal_single';  // 503
  ADD_CATEGORY = 'add_restaurent_menu_categories'  //504
  UPDATE_CATEGORY = 'edit_menu_category'  //505 upload_menu_category_imagemenu_categories_admin
  ALL_CATEGORY = 'menu_categories_admin'  //506

  GET_ALL_GRADIENTS = 'get_all_restaurent_sub_menu_category_admin'  //507
  ADD_GRADIENT = 'static_menu_category_selection'  //508
  GET_SINGLE_GRADIENT = 'single_menu_category_type_selection'  //509
  DELETE_SINGLE_GRADIENT = 'delete_static_menu_category'  //510
  CHANGE_STAT_SINGLE_GREGIENT = 'static_menu_category_stat' //511
  DELETE_GRADIENT_SUB_CATEGORY = 'delete_menu_item_sub_category'  //512
  ADD_SUB_IN_MENU_CATEGORY = 'add_menu_item_sub_category'  //513

  ADD_MENU_DETAIL = 'add_menu_item'  //514
  UPDATE_MENU_ITEM = 'edit_menu_item'  //515   get_admin_categories
  GET_ALL_ITEMS = 'get_admin_categories'  //516   

  DELETE_MENU_ITEM = 'delete_menu_item'  //517
  CHANGE_ITEM_AVALIBILTY_STATUS = 'change_menu_item_stat'  // 518
  DELETE_ITEM_GREDIENT = 'delete_item_gredient' //519
  ADD_ITEM_GRADIENTS = 'add_item_gredients'  //520
  GET_ITEM_GRADIENTS = 'get_item_gredients_admin'  //521
  DELETE_MENU_CATEGORY = 'delete_menu_category'  //522 

 

  


  UPDATE_CATEGORY_IMAGE = 'upload_menu_category_image'  //000
  UPDATE_MENU_IMAGE = 'upload_menu_item_image'  //000



  public get UPDATE_USER_IMAGE() : string {
    return ConfigService.SERVER_ADDRESS + '/' + ConfigService.SUBDOMAIN + '/' + this.AUTH  + '?op=' + 'owner_profile_photo_update';
  }
  public get RESTURANT_IMAGE() : string {
    return ConfigService.SERVER_ADDRESS + '/' + ConfigService.SUBDOMAIN + '/' + this.AUTH  + '?op=' + 'update_restaurent_image';
  }

  public get UPDATE_CATEGORY_IMAGE_URL() : string {
    return ConfigService.SERVER_ADDRESS + '/' + ConfigService.SUBDOMAIN + '/' + this.RESTAURANT_MENU  +'?op=' + this.UPDATE_CATEGORY_IMAGE;
  }
  // public get UPDATE_DEALS_IMAGE_URL() : string {
  //   return ConfigService.SERVER_ADDRESS + '/' + ConfigService.SUBDOMAIN + '/' + this.RESTAURANT_MENU  + '?op=' + this.UPDATE_DEALS_IMAGE;
  // }
  public get UPDATE_MENU_IMAGE_URL() : string {
    return ConfigService.SERVER_ADDRESS + '/' + ConfigService.SUBDOMAIN + '/' + this.RESTAURANT_MENU  + '?op=' + this.UPDATE_MENU_IMAGE;
  }
  // public get UPDATE_RESTAURANT_IMAGE_URL() : string {
  //   return ConfigService.SERVER_ADDRESS + '/' + ConfigService.SUBDOMAIN + '/' + this.RESTAURANTS + '?op=' + this.UPDATE_RESTAURANT_IMAGE;
  // }

  constructor() { }
}

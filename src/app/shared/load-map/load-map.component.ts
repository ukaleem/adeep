import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Platform, AlertController, LoadingController, NavController, ModalController } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Subscription } from 'rxjs';

declare var google;
var marker;
@Component({
  selector: 'app-load-map',
  templateUrl: './load-map.component.html',
  styleUrls: ['./load-map.component.scss'],
})
export class LoadMapComponent implements OnInit {
  map: any;
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  address;

  positionSubscription: Subscription;


  /** input variables declaration */
  customAddress: any;
  mapCheck = false;
  mapLocation: any;
  lat: any;
  lng: any;

  userCurrentLocationData: any = [];
  constructor(private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private plateform: Platform,
    private modelCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController) {
    this.loadMap();
  }

  ngOnInit() { }
  async loadMap() {
    const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Loading Map...',
      translucent: true,
    });
    loading.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      const latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      const mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        streetViewControl: true,
      };

      const myAdrres = this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
      loading.dismiss();
      console.log('finall address form lat long' + myAdrres);
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.map.addListener('click', (event) => {
        // placeMarker(event.latLng);
        if (marker == undefined) {
          marker = new google.maps.Marker({
            position: event.latLng,
            map: this.map,
            animation: google.maps.Animation.DROP,
          });
        }
        else {
          marker.setPosition(event.latLng);
        }
        this.map.setCenter(event.latLng);
      });

      this.map.addListener('tilesloaded', () => {
        console.log('accuracy', this.map);
        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng());
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log('getAddressFromCoords ' + lattitude + ' ' + longitude);
    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        console.log('Revearse Geo Code Results', result);
        this.address = '';
        const responseAddress = [];
        for (const value of Object.entries(result[0])) {
          if (value.length > 0) {
            responseAddress.push(value);
          }
        }
        responseAddress.reverse();
        console.log('Single address of Geo Code', result[0]);
        this.userCurrentLocationData = result[0];
        this.mapLocation = result[0].locality + ' ' + result[0].countryName + this.address;
        console.log('selected location: ', this.mapLocation);
        for (const value of responseAddress) {
          this.address += value + ', ';
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = 'Address Not Available!';
        console.log(error);
      });

  }
  afterMapContineu() {
    this.modelCtrl.dismiss(this.userCurrentLocationData, 'ok');
  }

}

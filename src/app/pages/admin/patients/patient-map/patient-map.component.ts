import { ModalController } from '@ionic/angular';
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from "@ionic-native/native-geocoder/ngx";
import { Plugins } from "@capacitor/core";
import { HttpClient } from "@angular/common/http";

const { Geolocation } = Plugins;
declare var google;

@Component({
  selector: "app-patient-map",
  templateUrl: "./patient-map.component.html",
  styleUrls: ["./patient-map.component.scss"],
})
export class PatientMapComponent implements OnInit {
  @ViewChild("map", { static: false }) mapElement: ElementRef;
  map: any;
  address: string;
  searchAddress: string;

  latitude: number;
  longitude: number;

  marker: any;

  constructor(private nativeGeocoder: NativeGeocoder,private mdlCtrl:ModalController, private http: HttpClient,) {}

  OnInit() {}

  ngOnInit() {
    this.getCurrentPosition();
  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log("Current", coordinates);
    this.latitude = coordinates.coords.latitude;
    this.longitude = coordinates.coords.longitude;

    let latLng = new google.maps.LatLng(
      coordinates.coords.latitude,
      coordinates.coords.longitude
    );
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.getAddressFromCoords(
      coordinates.coords.latitude,
      coordinates.coords.longitude
    );
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.map.addListener("dragend", () => {
      this.latitude = this.map.center.lat();
      this.longitude = this.map.center.lng();

      this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng());
      this.placeMarker(this.map.center);
    });

    this.map.addListener("click", (event) => {
      this.placeMarker(event.latLng);
      console.log(event);
    });
  }

  placeMarker(location) {
    console.log(location);

    this.latitude = location.lat();
    this.longitude = location.lng();

    this.getAddressFromCoords(location.lat(), location.lng());

    if (this.marker == undefined) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        animation: google.maps.Animation.DROP,
      });
    } else {
      this.marker.setPosition(location);
    }
    this.map.setCenter(location);
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords " + lattitude + " " + longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5,
    };

    this.nativeGeocoder
      .reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0) responseAddress.push(value);
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = "Address Not Available!";
      });
  }

  searchLocation() {
    console.log(this.searchAddress);
    this.searchApi(this.searchAddress);
  }

  closeModel(){
    this.mdlCtrl.dismiss();
  }
  searchApi(query){
    const url = 'https://api.geoapify.com/v1/geocode/autocomplete?text=' + query + '&limit=3&apiKey=dcb06cb71c704af39e964e8ee6f2dbb1';
    this.http.get(url).subscribe(data => {
      let result = data as any;
      if(result.features.length){
          let totalAddress = result.features[0].properties;
          this.placeMarker(new google.maps.LatLng({lat:  totalAddress.lat, lng: totalAddress.lon}));
          // $('#p_address_map').val(totalAddress.formatted);

      }
    });
  }
  saveAddress(){
    this.mdlCtrl.dismiss({ address: this.address,latitude: this.latitude,longitude: this.longitude} , 'ok');
  }
}

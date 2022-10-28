import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {

  tittle= 'google-maps'

  constructor() { }

  ngOnInit(): void {
    const loader = new Loader({
      apiKey: "AIzaSyClcRCRwMT-83T_vUXHKsWPzwFyexZx0fU"
    });
    
    loader.load().then(() => {
      new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: -33.4300444, lng: -70.6909324 },
        zoom: 8,
        styles:[
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "visibility": "simplified"
              },
              {
                "weight": 3
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "visibility": "simplified"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.icon",
            "stylers": [
              {
                "color": "#fdec4e"
              }
            ]
          }
        ]
      })
    })
    
   

}
}

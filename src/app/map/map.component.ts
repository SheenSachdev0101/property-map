import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as googleMaps from '@google/maps';
//import { } from '@types/googlemaps';
import { MarkerInfo } from '../shared/model/marker-info';
import { PropertyInfoService } from '../property-info.service';
import * as _ from 'lodash';
import { markParentViewsForCheck } from '@angular/core/src/view/util';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  @ViewChild('googleMap') gmapElement: ElementRef;
  map: google.maps.Map;

  markers: MarkerInfo[] = [];
  private mapMarkers = [];
  
  constructor(private propertyInfoService: PropertyInfoService) { }

  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(-87.6656354999999, 41.8857718),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };
  
    this.map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    // var marker = new google.maps.Marker({ position: mapProp.center });
    // marker.setMap(this.map);
    this.setMarkers();
  }

  //This function is used to set the markers 
  //on the basis of list of markers available in property info service
  setMarkers() {
    this.propertyInfoService.getMarkers();
    this.propertyInfoService.markerData.subscribe(data => {
      this.clearMarkers();
      _.forEach(data, marker => {
        let latlng = new google.maps.LatLng(marker.latitude, marker.longitude);
        let color = 'FF0000';
        if (marker.estimatedMarketValue === this.propertyInfoService.maxEstimatedValue) {
          color = '008000';
        } else if (marker.estimatedMarketValue === this.propertyInfoService.minEstimatedValue){
          color = 'FF0000';
        } else {
          color = 'FFFF00';
        }
        let iconStr = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|' + color;
        let mapMarker = new google.maps.Marker({ position: latlng, icon: iconStr});
        this.mapMarkers.push(mapMarker);
        mapMarker.setMap(this.map);
        let estimatedMarketValue = Number(marker.estimatedMarketValue)
        if((estimatedMarketValue))
        var infowindow = new google.maps.InfoWindow({
          content: marker.fullAddress
        });
        //show the location full address in info window on hover
        google.maps.event.addListener(mapMarker, 'mouseover', function() {
          console.log(mapMarker);
          infowindow.open(this.map, mapMarker);
        });
        google.maps.event.addListener(mapMarker, 'mouseout', function() {
          infowindow.close();
        });
      })
      console.log(data);
    });
    
  }

  //This function is used to clear the markers on each subscribtion i.e. each time setMarkers() is called 
  //and load the latest list of markers as per the filter
  clearMarkers() {
    for (let i = 0; i < this.mapMarkers.length; i++) {
      this.mapMarkers[i].setMap(null);
    }
    this.mapMarkers = [];
  }


  // ngOnInit() {
  //   let mapProp = {
  //       center: new google.maps.LatLng(28.4595, 77.0266),
  //       zoom: 5,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP
  //   };
  //   let map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  //   var marker = new google.maps.Marker({ position: mapProp.center });
  //   marker.setMap(this.map);
    
  //   var infowindow = new google.maps.InfoWindow({
  //     content: 'Hi here'
  //   });
  //   infowindow.open(this.map, marker);
  // }

}

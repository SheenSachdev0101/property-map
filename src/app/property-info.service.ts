import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { MarkerInfo } from '../app/shared/model/marker-info';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyInfoService {
  arrayBuffer: any;
  file: File;
  minEstimatedValue: number;
  maxEstimatedValue: number;

  markers: MarkerInfo[] = [];

  //Dummy display data 
  DATA = [{
    fullAddress: '210 N JUSTINE ST, CHICAGO, IL',
    latitude: '-87.6656354999999',
    longitude: '41.8857718',
    zip: '60607',
    estimatedMarketValue: 595820,
    resType: 'Two Story'
  },
  {
    fullAddress: '1529 W TAYLOR ST, CHICAGO, IL',
    latitude: '-87.6654183999999',
    longitude: '41.8690533999999',
    zip: '60607',
    estimatedMarketValue: 1302750,
    resType: 'Three Story'
  },
  {
    fullAddress: '1903 W 19TH ST, CHICAGO, IL',
    latitude: '-87.6744779999999',
    longitude: '41.8556463999999',
    zip: '60608',
    estimatedMarketValue: 401760,
    resType: 'Two Story'
  }]

  private markerSubject = new BehaviorSubject([]);
  markerData = this.markerSubject.asObservable();

  constructor() {  
  
  }

  //getMarkers(): Array<MarkerInfo> {
  getMarkers() {
    this.initializeMarkerColorData();
    _.forEach(this.DATA, elm => {
      let marker: MarkerInfo = {
        fullAddress: elm.fullAddress,
        latitude: elm.latitude,
        longitude: elm.longitude,
        estimatedMarketValue: elm.estimatedMarketValue
      }
      this.markers.push(marker);
    });
    //return this.markers;
    this.setMarkers(this.markers);

  }

  setMarkers(currentData: MarkerInfo[]) {
    this.markerSubject.next(currentData);
  }

  initializeMarkerColorData(){  
    let estimatedValueArr = Array.from(new Set(this.DATA.map((itemInArray) => itemInArray.estimatedMarketValue)));
    this.minEstimatedValue = Math.max(...estimatedValueArr); //used spread operator to combine Array
    this.maxEstimatedValue = Math.min(...estimatedValueArr); //used spread operator to combine Array
    // _.forEach(this.DATA, elm => {
    //   if(elm.estimatedMarketValue > this.minEstimatedValue){}
    //   });
  }
} 

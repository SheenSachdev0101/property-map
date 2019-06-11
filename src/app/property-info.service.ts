import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { MarkerInfo } from '../app/shared/model/marker-info';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { PROPERTIES } from '../app/shared/constants/property-info'

@Injectable({
  providedIn: 'root'
})
export class PropertyInfoService {
  arrayBuffer: any;
  file: File;
  minEstimatedValue: string;
  maxEstimatedValue: string;

  markers: MarkerInfo[] = [];

  DATA = PROPERTIES;
  
  private markerSubject = new BehaviorSubject([]);
  markerData = this.markerSubject.asObservable();

  constructor() {  
    this.DATA = PROPERTIES; 
  }

  //getMarkers(): Array<MarkerInfo> {
  getMarkers() {
    this.initializeMarkerColorData();
    _.forEach(this.DATA, elm => {
      let marker: MarkerInfo = {
        fullAddress: elm.fullAddress,
        latitude: elm.latitude,
        longitude: elm.longitude,
        zip: elm.zip,
        classDescription: elm.classDescription,
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
    let estimatedValueArr = Array.from(new Set(this.DATA.map((itemInArray) => Number(itemInArray.estimatedMarketValue))));
    this.maxEstimatedValue = Math.max(...estimatedValueArr).toString(); //used spread operator to combine Array
    this.minEstimatedValue = Math.min(...estimatedValueArr).toString(); //used spread operator to combine Array
    // _.forEach(this.DATA, elm => {
    //   if(elm.estimatedMarketValue > this.minEstimatedValue){}
    //   });
  }
} 

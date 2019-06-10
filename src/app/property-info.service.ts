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
    fullAddress: '2229 W HURON ST, CHICAGO, IL',
    latitude: '-87.6830293999999',
    longitude: '41.8938058999999',
    zip: '60612',
    estimatedMarketValue: 379420,
    resType: 'Two to Six Apartments, Over 62 Years'
  },
  {
    fullAddress: '328 S WESTERN AVE, CHICAGO, IL',
    latitude: '-87.6866284',
    longitude: '41.8765324',
    zip: '60612',
    estimatedMarketValue: 379420,
    resType: 'Apartment buildings over three stories'
  },
  {
    fullAddress: '1001 N WESTERN AVE, CHICAGO, IL',
    latitude: '-87.686592',
    longitude: '41.8995097999999',
    zip: '60622',
    estimatedMarketValue: 575060,
    resType: 'Special residential improvements'
  },
  {
    fullAddress: '2032 W OHIO ST, CHICAGO, IL',
    latitude: '-87.6783669',
    longitude: '41.8924312999999',
    zip: '60612',
    estimatedMarketValue: 834640,
    resType: 'Two to Six Apartments, Over 62 Years'
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

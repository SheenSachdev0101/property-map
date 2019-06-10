import { Component, OnInit } from '@angular/core';
import { PropertyInfoService } from '../property-info.service';
import {NgForm} from '@angular/forms';
import { MarkerInfo } from '../shared/model/marker-info';
import * as _ from 'lodash';

@Component({
  selector: 'app-property-filter',
  templateUrl: './property-filter.component.html',
  styleUrls: ['./property-filter.component.css']
})


export class PropertyFilterComponent implements OnInit {
  resTypes: any[] = [];
  constructor(private propertyInfoService: PropertyInfoService) { }

  filterChanged(selectedValue: String){
    console.log('value is'+selectedValue);

  } 

  submitted = false;

  applyFilter(f: NgForm) {
    let markers = [];
    this.submitted = true;
    console.log(f.value.resType); //{resType: "Three Story", estValue1: "66"}
    _.forEach(this.propertyInfoService.DATA, elm => {
      let matchesResType = f.value.resType == '' || f.value.resType === elm.resType;
      let matchesMinValue = f.value.minValue == '' || elm.estimatedMarketValue > f.value.minValue;
      let matchesMaxValue = f.value.maxValue == '' || elm.estimatedMarketValue < f.value.maxValue;
      if (matchesResType && matchesMinValue && matchesMaxValue) {
        let marker: MarkerInfo = {    
          fullAddress: elm.fullAddress,
          latitude: elm.latitude,
          longitude: elm.longitude,
          estimatedMarketValue: elm.estimatedMarketValue
        }
        markers.push(marker);
      }
    });
    //return this.markers;
    this.propertyInfoService.setMarkers(markers);
  
  }

  ngOnInit() {
    let masterData = this.propertyInfoService.DATA;
    this.resTypes = Array.from(new Set(masterData.map((itemInArray) => itemInArray.resType)));
    console.log(this.resTypes);
  }


}

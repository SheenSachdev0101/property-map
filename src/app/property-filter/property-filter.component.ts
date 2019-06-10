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
  
  // This function is used to display the values after applying the property filter based on category,
  // min and max value of estimated market value
  applyFilter(form: NgForm) {
    let markers = [];
    console.log(form.value.resType); //{resType: "Three Story", estValue1: "66"}
    _.forEach(this.propertyInfoService.DATA, elm => {
      let matchesResType = form.value.resType == '' || form.value.resType === elm.resType;
      let matchesMinValue = form.value.minValue == '' || elm.estimatedMarketValue > form.value.minValue;
      let matchesMaxValue = form.value.maxValue == '' || elm.estimatedMarketValue < form.value.maxValue;
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

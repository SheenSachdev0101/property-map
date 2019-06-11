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
  
  // This function is used to display the values after applying the property filter based on category,
  // min and max value of estimated market value
  applyFilter(form: NgForm) {
    let markers = [];
    _.forEach(this.propertyInfoService.DATA, elm => {
      let matchesResType = form.value.resType == '' || form.value.resType.trim() === elm.classDescription.trim();
      let matchesZip = form.value.zip == '' || form.value.zip.trim() === elm.zip.trim();
      let matchesMinValue = form.value.minValue == '' || Number(elm.estimatedMarketValue) > Number(form.value.minValue);
      let matchesMaxValue = form.value.maxValue == '' || Number(elm.estimatedMarketValue) < Number(form.value.maxValue);
      if (matchesResType && matchesMinValue && matchesMaxValue && matchesZip) {
        let marker: MarkerInfo = {    
          fullAddress: elm.fullAddress,
          latitude: elm.latitude,
          longitude: elm.longitude,
          zip: elm.zip,
          classDescription: elm.classDescription,
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
    this.resTypes = Array.from(new Set(masterData.map((itemInArray) => itemInArray.classDescription.trim())));
   //console.log(this.resTypes);//DEBUG ONLY 
  }


}

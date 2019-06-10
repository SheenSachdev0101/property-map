import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/Forms';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { PropertyInfoService } from './property-info.service';
import { PropertyFilterComponent } from './property-filter/property-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    FileUploadComponent,
    PropertyFilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule 
  ],
  entryComponents: [
    MapComponent,
    PropertyFilterComponent
  ],
  providers: [PropertyInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

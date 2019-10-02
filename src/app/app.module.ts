import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarFormComponent } from './navbar-manager/navbar-form/navbar-form.component';
import { LoginFormComponent } from './login-manager/login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from './common/models/material-module';
import { CookieService } from 'ngx-cookie-service';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppBootstrapModule } from './common/models/app-bootstrap-module';
import { AttentionFormComponent } from './dialog-windows/attention-dialog/attention-form/attention-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WmsMapEditFormComponent } from './wms-map/wms-map-edit-form/wms-map-edit-form.component';
import { HorizontalThreeFourComponent } from './stillages/horizontal-three-four/horizontal-three-four.component';
import { VertverticalThreeFourComponent } from './stillages/vertvertical-three-four/vertvertical-three-four.component';
import { DetailViewCellComponent } from './dialog-windows/detail-view-cell-manager/detail-view-cell/detail-view-cell.component';
import { RoadFormComponent } from './other-items/road-form/road-form.component';
import { WmsMapFormComponent } from './wms-map/wms-map-form/wms-map-form.component'; 
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { InventoryDialogFormComponent } from './dialog-windows/inventory-dialog-manager/inventory-dialog-form/inventory-dialog-form.component';
import { HorizontalThreeFourActionComponent } from './stillages/horizontal-three-four-action/horizontal-three-four-action.component';
import { VertverticalThreeFourActionComponent } from './stillages/vertvertical-three-four-action/vertvertical-three-four-action.component';
import { ProductGroupAccountingFormComponent } from './product-manager/product-group-accounting-form/product-group-accounting-form.component';
import { StoragePlacesComponent } from './dialog-windows/storage-places-manager/storage-places/storage-places.component';
import { TaskComponent } from './processes-manager/task/task.component';
import { ChipsNewTaskComponent } from './helpers/chips-new-task/chips-new-task.component';
import { SelectProcessesFormComponent } from './processes-manager/dialog-windows/select-processes-form/select-processes-form.component';
import { SelectCellFormComponent } from './processes-manager/dialog-windows/select-cell-form/select-cell-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarFormComponent,
    LoginFormComponent,
    InventoryDialogFormComponent,
    AttentionFormComponent,
    WmsMapEditFormComponent,
    HorizontalThreeFourComponent,
    VertverticalThreeFourComponent,
    DetailViewCellComponent,
    RoadFormComponent,
    WmsMapFormComponent,
    HorizontalThreeFourActionComponent,
    VertverticalThreeFourActionComponent,
    ProductGroupAccountingFormComponent,
    StoragePlacesComponent,
    TaskComponent,
    ChipsNewTaskComponent,
    SelectProcessesFormComponent,
    SelectCellFormComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    PinchZoomModule,
    HttpClientModule,
    AppRoutingModule,
    DemoMaterialModule,
    AppBootstrapModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })
  ],
  providers: [
    HttpClient,
    CookieService
  ],
  entryComponents: [
    AttentionFormComponent,
    DetailViewCellComponent,
    NavbarFormComponent,
    InventoryDialogFormComponent,
    StoragePlacesComponent,
    SelectProcessesFormComponent,
    SelectCellFormComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

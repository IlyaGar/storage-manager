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
import { VerticalThreeFourComponent } from './stillages/vertical-three-four/vertical-three-four.component';
import { DetailViewCellComponent } from './dialog-windows/detail-view-cell-manager/detail-view-cell/detail-view-cell.component';
import { RoadFormComponent } from './stillages/road-form/road-form.component';
import { WmsMapFormComponent } from './wms-map/wms-map-form/wms-map-form.component'; 
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { InventoryDialogFormComponent } from './dialog-windows/inventory-dialog-manager/inventory-dialog-form/inventory-dialog-form.component';
import { HorizontalThreeFourActionComponent } from './stillages/horizontal-three-four-action/horizontal-three-four-action.component';
import { VerticalThreeFourActionComponent } from './stillages/vertical-three-four-action/vertical-three-four-action.component';
import { ProductGroupAccountingFormComponent } from './product-manager/product-group-accounting-form/product-group-accounting-form.component';
import { StoragePlacesComponent } from './dialog-windows/storage-places-manager/storage-places/storage-places.component';
import { TaskComponent } from './processes-manager/task/task.component';
import { BaseFormComponent } from './processes-manager/components/base-form/base-form.component';
import { ProcessesFormComponent } from './processes-manager/components/processes-form/processes-form.component';
import { SelectCellFormComponent } from './processes-manager/dialog-windows/select-cell-form/select-cell-form.component';
import { DocListComponent } from './processes-manager/dialog-windows/doc-list/doc-list.component';
import { VerticalThreeThreeComponent } from './stillages/vertical-three-three/vertical-three-three.component';
import { HorizontalThreeThreeComponent } from './stillages/horizontal-three-three/horizontal-three-three.component';
import { VerticalThreeTwoComponent } from './stillages/vertical-three-two/vertical-three-two.component';
import { HorizontalThreeTwoComponent } from './stillages/horizontal-three-two/horizontal-three-two.component';
import { VerticalThreeFiveComponent } from './stillages/vertical-three-five/vertical-three-five.component';
import { HorizontalThreeFiveComponent } from './stillages/horizontal-three-five/horizontal-three-five.component';
import { HorizontalTwoFiveComponent } from './stillages/horizontal-two-five/horizontal-two-five.component';
import { VerticalTwoFiveComponent } from './stillages/vertical-two-five/vertical-two-five.component';
import { VerticalTwoFourComponent } from './stillages/vertical-two-four/vertical-two-four.component';
import { HorizontalTwoFourComponent } from './stillages/horizontal-two-four/horizontal-two-four.component';
import { LongThreeOneFiveComponent } from './stillages/long-three-one-five/long-three-one-five.component';
import { LongTwoThreeFourComponent } from './stillages/long-two-three-four/long-two-three-four.component';
import { LongThreeFiveComponent } from './stillages/long-three-five/long-three-five.component';
import { LongThreeFourComponent } from './stillages/long-three-four/long-three-four.component';
import { UsersFormComponent } from './personal-manager/components/users-form/users-form.component';
import { PersonalManagementFormComponent } from './personal-manager/personal-management-form/personal-management-form.component';
import { PersonalListFormComponent } from './personal-manager/dialog-windows/personal-list-form/personal-list-form.component';
import { GroupsFormComponent } from './personal-manager/components/groups-form/groups-form.component';
import { EditUserFormComponent } from './personal-manager/dialog-windows/edit-user-form/edit-user-form.component';
import { EditGroupFormComponent } from './personal-manager/dialog-windows/edit-group-form/edit-group-form.component';
import { VerticalTwoThreeComponent } from './stillages/vertical-two-three/vertical-two-three.component';
import { ProcPersonalListFormComponent } from './processes-manager/components/proc-personal-list-form/proc-personal-list-form.component';
import { SelectGroupFormComponent } from './processes-manager/dialog-windows/select-group-form/select-group-form.component';
import { SelectUserFormComponent } from './processes-manager/dialog-windows/select-user-form/select-user-form.component';
import { DetailDocFormComponent } from './processes-manager/dialog-windows/detail-doc-form/detail-doc-form.component';
import { DocTableFormComponent } from './processes-manager/components/doc-table-form/doc-table-form.component';
import { StillgeDialogFormComponent } from './wms-map/dialog-windows/stillge-dialog-form/stillge-dialog-form.component';
import { NgxPrintModule } from 'ngx-print';
import { UsersInGroupFormComponent } from './processes-manager/dialog-windows/users-in-group-form/users-in-group-form.component';
import { ConfirmationNewTaskFormComponent } from './processes-manager/dialog-windows/confirmation-new-task-form/confirmation-new-task-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarFormComponent,
    LoginFormComponent,
    InventoryDialogFormComponent,
    AttentionFormComponent,
    WmsMapEditFormComponent,
    HorizontalThreeFourComponent,
    VerticalThreeFourComponent,
    DetailViewCellComponent,
    RoadFormComponent,
    WmsMapFormComponent,
    HorizontalThreeFourActionComponent,
    VerticalThreeFourActionComponent,
    ProductGroupAccountingFormComponent,
    StoragePlacesComponent,
    TaskComponent,
    BaseFormComponent,
    ProcessesFormComponent,
    SelectCellFormComponent,
    DocListComponent,
    VerticalThreeThreeComponent,
    HorizontalThreeThreeComponent,
    VerticalThreeTwoComponent,
    HorizontalThreeTwoComponent,
    VerticalThreeFiveComponent,
    HorizontalThreeFiveComponent,
    HorizontalTwoFiveComponent,
    VerticalTwoFiveComponent,
    VerticalTwoFourComponent,
    HorizontalTwoFourComponent,
    LongThreeOneFiveComponent,
    LongTwoThreeFourComponent,
    LongThreeFiveComponent,
    LongThreeFourComponent,
    PersonalManagementFormComponent,
    UsersFormComponent,
    PersonalListFormComponent,
    GroupsFormComponent,
    EditUserFormComponent,
    EditGroupFormComponent,
    VerticalTwoThreeComponent,
    ProcPersonalListFormComponent,
    SelectGroupFormComponent,
    SelectUserFormComponent,
    DetailDocFormComponent,
    DocTableFormComponent,
    StillgeDialogFormComponent,
    UsersInGroupFormComponent,
    ConfirmationNewTaskFormComponent,
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
    NgxPrintModule,
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
    ProcessesFormComponent,
    SelectCellFormComponent,
    DocListComponent,
    PersonalListFormComponent,
    EditUserFormComponent,
    EditGroupFormComponent,
    SelectGroupFormComponent,
    SelectUserFormComponent,
    DetailDocFormComponent,
    StillgeDialogFormComponent,
    UsersInGroupFormComponent,
    ConfirmationNewTaskFormComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

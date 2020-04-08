import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapRoutingModule } from './map-routing.module';
import { InventoryDialogFormComponent } from 'src/app/dialog-windows/inventory-dialog-manager/inventory-dialog-form/inventory-dialog-form.component';
import { WmsMapEditFormComponent } from '../wms-map-edit-form/wms-map-edit-form.component';
import { SelectCellFormComponent } from 'src/app/processes-manager/dialog-windows/select-cell-form/select-cell-form.component';
import { DetailViewCellComponent } from 'src/app/dialog-windows/detail-view-cell-manager/detail-view-cell/detail-view-cell.component';
import { RoadFormComponent } from 'src/app/stillages/road-form/road-form.component';
import { WmsMapFormComponent } from '../wms-map-form/wms-map-form.component';
import { HorizontalThreeFourComponent } from 'src/app/stillages/horizontal-three-four/horizontal-three-four.component';
import { VerticalThreeFourComponent } from 'src/app/stillages/vertical-three-four/vertical-three-four.component';
import { HorizontalThreeFourActionComponent } from 'src/app/stillages/horizontal-three-four-action/horizontal-three-four-action.component';
import { VerticalThreeFourActionComponent } from 'src/app/stillages/vertical-three-four-action/vertical-three-four-action.component';
import { VerticalThreeThreeComponent } from 'src/app/stillages/vertical-three-three/vertical-three-three.component';
import { HorizontalThreeThreeComponent } from 'src/app/stillages/horizontal-three-three/horizontal-three-three.component';
import { VerticalThreeTwoComponent } from 'src/app/stillages/vertical-three-two/vertical-three-two.component';
import { HorizontalThreeTwoComponent } from 'src/app/stillages/horizontal-three-two/horizontal-three-two.component';
import { VerticalThreeFiveComponent } from 'src/app/stillages/vertical-three-five/vertical-three-five.component';
import { HorizontalThreeFiveComponent } from 'src/app/stillages/horizontal-three-five/horizontal-three-five.component';
import { HorizontalTwoFiveComponent } from 'src/app/stillages/horizontal-two-five/horizontal-two-five.component';
import { VerticalTwoFiveComponent } from 'src/app/stillages/vertical-two-five/vertical-two-five.component';
import { VerticalTwoFourComponent } from 'src/app/stillages/vertical-two-four/vertical-two-four.component';
import { HorizontalTwoFourComponent } from 'src/app/stillages/horizontal-two-four/horizontal-two-four.component';
import { LongTwoThreeFourComponent } from 'src/app/stillages/long-two-three-four/long-two-three-four.component';
import { LongThreeOneFiveComponent } from 'src/app/stillages/long-three-one-five/long-three-one-five.component';
import { LongThreeFourComponent } from 'src/app/stillages/long-three-four/long-three-four.component';
import { VerticalTwoThreeComponent } from 'src/app/stillages/vertical-two-three/vertical-two-three.component';
import { LongThreeFiveComponent } from 'src/app/stillages/long-three-five/long-three-five.component';
import { StillgeDialogFormComponent } from '../dialog-windows/stillge-dialog-form/stillge-dialog-form.component';
import { VerticalThreeThreeActionComponent } from 'src/app/stillages/vertical-three-three-action/vertical-three-three-action.component';
import { VerticalThreeTwoActionComponent } from 'src/app/stillages/vertical-three-two-action/vertical-three-two-action.component';
import { VerticalThreeFiveActionComponent } from 'src/app/stillages/vertical-three-five-action/vertical-three-five-action.component';
import { CellHistoryFormComponent } from '../components/cell-history-form/cell-history-form.component';
import { ErrorLogFormComponent } from '../components/error-log-form/error-log-form.component';
import { ZonaStorageActionComponent } from 'src/app/stillages/zona-storage-action/zona-storage-action.component';
import { ZonaStorageComponent } from 'src/app/stillages/zona-storage/zona-storage.component';
import { VerticalTwoFiveRightActionComponent } from 'src/app/stillages/vertical-two-five-right-action/vertical-two-five-right-action.component';
import { VerticalTwoFiveRightComponent } from 'src/app/stillages/vertical-two-five-right/vertical-two-five-right.component';
import { VerticalThreeTwoRightComponent } from 'src/app/stillages/vertical-three-two-right/vertical-three-two-right.component';
import { VerticalTwoFourRightComponent } from 'src/app/stillages/vertical-two-four-right/vertical-two-four-right.component';
import { VerticalTwoFourRightActionComponent } from 'src/app/stillages/vertical-two-four-right-action/vertical-two-four-right-action.component';
import { VerticalThreeTwoRightActionComponent } from 'src/app/stillages/vertical-three-two-right-action/vertical-three-two-right-action.component';
import { VerticalThreeThreeRightComponent } from 'src/app/stillages/vertical-three-three-right/vertical-three-three-right.component';
import { VerticalThreeThreeRightActionComponent } from 'src/app/stillages/vertical-three-three-right-action/vertical-three-three-right-action.component';
import { VerticalThreeFiveRightActionComponent } from 'src/app/stillages/vertical-three-five-right-action/vertical-three-five-right-action.component';
import { VerticalThreeFourRightActionComponent } from 'src/app/stillages/vertical-three-four-right-action/vertical-three-four-right-action.component';
import { VerticalThreeFourRightComponent } from 'src/app/stillages/vertical-three-four-right/vertical-three-four-right.component';
import { VerticalThreeFiveRightComponent } from 'src/app/stillages/vertical-three-five-right/vertical-three-five-right.component';
import { LongThreeFourActionComponent } from 'src/app/stillages/long-three-four-action/long-three-four-action.component';
import { LongThreeFiveActionComponent } from 'src/app/stillages/long-three-five-action/long-three-five-action.component';
import { LongTwoThreeFourActionComponent } from 'src/app/stillages/long-two-three-four-action/long-two-three-four-action.component';
import { LongThreeOneFiveActionComponent } from 'src/app/stillages/long-three-one-five-action/long-three-one-five-action.component';
import { VerticalTwoThreeActionComponent } from 'src/app/stillages/vertical-two-three-action/vertical-two-three-action.component';
import { VerticalTwoFourActionComponent } from 'src/app/stillages/vertical-two-four-action/vertical-two-four-action.component';
import { VerticalTwoFiveActionComponent } from 'src/app/stillages/vertical-two-five-action/vertical-two-five-action.component';
import { DemoMaterialModule } from 'src/app/common/models/material-module';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { FormsModule } from '@angular/forms';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [
    InventoryDialogFormComponent,
    WmsMapEditFormComponent,
    SelectCellFormComponent,
    DetailViewCellComponent,
    RoadFormComponent,
    WmsMapFormComponent,
    HorizontalThreeFourComponent,
    VerticalThreeFourComponent,
    HorizontalThreeFourActionComponent,
    VerticalThreeFourActionComponent,
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
    VerticalTwoThreeComponent,
    StillgeDialogFormComponent,
    VerticalThreeThreeActionComponent,
    VerticalThreeTwoActionComponent,
    VerticalThreeFiveActionComponent,
    VerticalTwoFiveActionComponent,
    VerticalTwoFourActionComponent,
    VerticalTwoThreeActionComponent,
    LongThreeOneFiveActionComponent,
    LongTwoThreeFourActionComponent,
    LongThreeFiveActionComponent,
    LongThreeFourActionComponent,
    VerticalThreeFiveRightComponent,
    VerticalThreeFourRightComponent,
    VerticalThreeFourRightActionComponent,
    VerticalThreeFiveRightActionComponent,
    VerticalThreeThreeRightActionComponent,
    VerticalThreeThreeRightComponent,
    VerticalThreeTwoRightComponent,
    VerticalThreeTwoRightActionComponent,
    VerticalTwoFourRightActionComponent,
    VerticalTwoFourRightComponent,
    VerticalTwoFiveRightComponent,
    VerticalTwoFiveRightActionComponent,
    ZonaStorageComponent,
    ZonaStorageActionComponent,
    ErrorLogFormComponent,
    CellHistoryFormComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgxPrintModule,
    PinchZoomModule,
    DemoMaterialModule,
    MapRoutingModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })
  ],
  entryComponents: [
    DetailViewCellComponent,
    InventoryDialogFormComponent,
    SelectCellFormComponent,
    StillgeDialogFormComponent,
  ]
})
export class MapModule { }
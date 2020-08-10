import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapRoutingModule } from './map-routing.module';
import { InventoryDialogFormComponent } from 'src/app/dialog-windows/inventory-dialog-manager/inventory-dialog-form/inventory-dialog-form.component';
import { WmsMapEditFormComponent } from '../wms-map-edit-form/wms-map-edit-form.component';
import { DetailViewCellComponent } from 'src/app/dialog-windows/detail-view-cell-manager/detail-view-cell/detail-view-cell.component';
import { StillgeDialogFormComponent } from '../dialog-windows/stillge-dialog-form/stillge-dialog-form.component';
import { DemoMaterialModule } from 'src/app/common/models/material-module';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { FormsModule } from '@angular/forms';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { NgxPrintModule } from 'ngx-print';
import { WmsMapFormComponent } from '../wms-map-form/wms-map-form.component';
import { ErrorLogFormComponent } from '../components/error-log-form/error-log-form.component';
import { CellHistoryFormComponent } from '../components/cell-history-form/cell-history-form.component';
import { StillageModule } from 'src/app/stillages/stillage/stillage.module';

@NgModule({
  declarations: [
    InventoryDialogFormComponent,
    WmsMapEditFormComponent,
    DetailViewCellComponent,
    WmsMapFormComponent,
    StillgeDialogFormComponent,
    ErrorLogFormComponent,
    CellHistoryFormComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgxPrintModule,
    StillageModule,
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
    StillgeDialogFormComponent,
  ]
})
export class MapModule { }
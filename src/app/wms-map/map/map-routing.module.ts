import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WmsMapEditFormComponent } from '../wms-map-edit-form/wms-map-edit-form.component';
import { WmsMapFormComponent } from '../wms-map-form/wms-map-form.component';
import { ErrorLogFormComponent } from '../components/error-log-form/error-log-form.component';
import { CellHistoryFormComponent } from '../components/cell-history-form/cell-history-form.component';

const routes: Routes = [
  { path: 'edit', component: WmsMapEditFormComponent },
  { path: 'view', component: WmsMapFormComponent },
  { path: 'error-journal', component: ErrorLogFormComponent },
  { path: 'history', component: CellHistoryFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-manager/login-form/login-form.component';
import { ProductGroupAccountingFormComponent } from './product-manager/product-group-accounting-form/product-group-accounting-form.component';
// import { WmsMapEditFormComponent } from './wms-map/wms-map-edit-form/wms-map-edit-form.component';
// import { WmsMapFormComponent } from './wms-map/wms-map-form/wms-map-form.component';
// import { ErrorLogFormComponent } from './wms-map/components/error-log-form/error-log-form.component';
// import { CellHistoryFormComponent } from './wms-map/components/cell-history-form/cell-history-form.component';
// import { TaskComponent } from './processes-manager/task/task.component';
// import { ListDocFormComponent } from './processes-manager/components/list-doc-form/list-doc-form.component';
// import { DocumentUnloadingFormComponent } from './processes-manager/components/document-unloading-form/document-unloading-form.component';
// import { PersonalManagementFormComponent } from './personal-manager/personal-management-form/personal-management-form.component';
// import { MotivationComponent } from './personal-manager/components/motivation/motivation.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: '', redirectTo: '/product-group', pathMatch: 'full' },
  { path: 'product-group', component: ProductGroupAccountingFormComponent },
  {
    path: 'map',
    loadChildren: () => import('./wms-map/map/map.module').then(m => m.MapModule)
  },
  {
    path: 'task',
    loadChildren: () => import('./processes-manager/process/process.module').then(m => m.ProcessModule)
  },
  {
    path: '',
    loadChildren: () => import('./personal-manager/personal/personal.module').then(m => m.PersonalModule)
  },

  // { path: 'tasks', component: TaskComponent },
  // { path: 'list-doc', component: ListDocFormComponent },
  // { path: 'doc-unloading', component: DocumentUnloadingFormComponent },
  // { path: 'map-edit', component: WmsMapEditFormComponent },
  // { path: 'map', component: WmsMapFormComponent },
  // { path: 'error-journal', component: ErrorLogFormComponent },
  // { path: 'history', component: CellHistoryFormComponent },
  // { path: 'motivation', component: MotivationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

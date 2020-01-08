import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-manager/login-form/login-form.component';
import { WmsMapEditFormComponent } from './wms-map/wms-map-edit-form/wms-map-edit-form.component';
import { WmsMapFormComponent } from './wms-map/wms-map-form/wms-map-form.component';
import { ProductGroupAccountingFormComponent } from './product-manager/product-group-accounting-form/product-group-accounting-form.component';
import { TaskComponent } from './processes-manager/task/task.component';
import { PersonalManagementFormComponent } from './personal-manager/personal-management-form/personal-management-form.component';
import { ListDocFormComponent } from './processes-manager/components/list-doc-form/list-doc-form.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: '', redirectTo: '/product-group', pathMatch: 'full' },
  { path: 'map-edit', component: WmsMapEditFormComponent },
  { path: 'map', component: WmsMapFormComponent },
  { path: 'product-group', component: ProductGroupAccountingFormComponent },
  { path: 'tasks', component: TaskComponent },
  { path: 'staff', component: PersonalManagementFormComponent },
  { path: 'list-doc', component: ListDocFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

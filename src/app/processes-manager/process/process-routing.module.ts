import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from '../task/task.component';
import { ListDocFormComponent } from '../components/list-doc-form/list-doc-form.component';
import { DocumentUnloadingFormComponent } from '../components/document-unloading-form/document-unloading-form.component';

const routes: Routes = [
  { path: 'tasks', component: TaskComponent },
  { path: 'list-doc', component: ListDocFormComponent },
  { path: 'doc-unloading', component: DocumentUnloadingFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessRoutingModule { }

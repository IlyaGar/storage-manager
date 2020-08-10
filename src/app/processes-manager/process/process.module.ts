import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessRoutingModule } from './process-routing.module';
import { UsersInGroupFormComponent } from '../dialog-windows/users-in-group-form/users-in-group-form.component';
import { SelectUserFormComponent } from '../dialog-windows/select-user-form/select-user-form.component';
import { SelectGroupFormComponent } from '../dialog-windows/select-group-form/select-group-form.component';
import { SelectCellFormComponent } from '../dialog-windows/select-cell-form/select-cell-form.component';
import { DocListComponent } from '../dialog-windows/doc-list/doc-list.component';
import { DetailDocFormComponent } from '../dialog-windows/detail-doc-form/detail-doc-form.component';
import { ConfirmationNewTaskFormComponent } from '../dialog-windows/confirmation-new-task-form/confirmation-new-task-form.component';
import { ProcessesFormComponent } from '../components/processes-form/processes-form.component';
import { ProcPersonalListFormComponent } from '../components/proc-personal-list-form/proc-personal-list-form.component';
import { PcTableComponent } from '../components/pc-table/pc-table.component';
import { NameDocFormComponent } from '../components/name-doc-form/name-doc-form.component';
import { ListDocFormComponent } from '../components/list-doc-form/list-doc-form.component';
import { DocumentUnloadingFormComponent } from '../components/document-unloading-form/document-unloading-form.component';
import { DocTableFormComponent } from '../components/doc-table-form/doc-table-form.component';
import { BaseFormComponent } from '../components/base-form/base-form.component';
import { CardUnloadingComponent } from '../components/card-unloading/card-unloading.component';
import { TaskComponent } from '../task/task.component';
import { FormsModule } from '@angular/forms';
import { DemoMaterialModule } from 'src/app/common/models/material-module';
import { NgxPrintModule } from 'ngx-print';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { StillageModule } from 'src/app/stillages/stillage/stillage.module';
import { PinchZoomModule } from 'ngx-pinch-zoom';

@NgModule({
  declarations: [
    TaskComponent,
    BaseFormComponent,
    CardUnloadingComponent,
    DocTableFormComponent,
    DocumentUnloadingFormComponent,
    ListDocFormComponent,
    NameDocFormComponent,
    PcTableComponent,
    ProcPersonalListFormComponent,
    ProcessesFormComponent,
    ConfirmationNewTaskFormComponent,
    DetailDocFormComponent,
    DocListComponent,
    SelectCellFormComponent,
    SelectGroupFormComponent,
    SelectUserFormComponent,
    UsersInGroupFormComponent,
  ],
  imports: [
    CommonModule,
    ProcessRoutingModule,
    StillageModule,
    FormsModule,
    PinchZoomModule,
    DemoMaterialModule,
    // ReactiveFormsModule,
    NgxPrintModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })
  ],
  entryComponents: [
    ConfirmationNewTaskFormComponent,
    DetailDocFormComponent,
    DocListComponent,
    SelectCellFormComponent,
    SelectGroupFormComponent,
    SelectUserFormComponent,
    UsersInGroupFormComponent,
  ]
})
export class ProcessModule { }

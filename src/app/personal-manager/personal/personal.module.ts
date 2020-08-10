import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalRoutingModule } from './personal-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonalManagementFormComponent } from '../personal-management-form/personal-management-form.component';
import { GroupsFormComponent } from '../components/groups-form/groups-form.component';
import { MotivationComponent } from '../components/motivation/motivation.component';
import { UsersFormComponent } from '../components/users-form/users-form.component';
import { EditGroupFormComponent } from '../dialog-windows/edit-group-form/edit-group-form.component';
import { EditUserFormComponent } from '../dialog-windows/edit-user-form/edit-user-form.component';
import { MotinateSumPositionFormComponent } from '../dialog-windows/motinate-sum-position-form/motinate-sum-position-form.component';
import { PersonalListFormComponent } from '../dialog-windows/personal-list-form/personal-list-form.component';
import { PrintBadgeFormComponent } from '../dialog-windows/print-badge-form/print-badge-form.component';
import { DemoMaterialModule } from 'src/app/common/models/material-module';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  declarations: [
    PersonalManagementFormComponent,
    GroupsFormComponent,
    MotivationComponent,
    UsersFormComponent,
    EditGroupFormComponent,
    EditUserFormComponent,
    MotinateSumPositionFormComponent,
    PersonalListFormComponent,
    PrintBadgeFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPrintModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    PersonalRoutingModule,
  ],
  entryComponents: [
    EditGroupFormComponent,
    EditUserFormComponent,
    MotinateSumPositionFormComponent,
    PersonalListFormComponent,
    PrintBadgeFormComponent,
  ]
})
export class PersonalModule { }

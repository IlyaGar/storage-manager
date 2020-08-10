import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalManagementFormComponent } from '../personal-management-form/personal-management-form.component';
import { MotivationComponent } from '../components/motivation/motivation.component';

const routes: Routes = [
  { path: 'staff', component: PersonalManagementFormComponent },
  { path: 'motivation', component: MotivationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }

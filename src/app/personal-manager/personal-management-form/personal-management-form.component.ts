import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-management-form',
  templateUrl: './personal-management-form.component.html',
  styleUrls: ['./personal-management-form.component.css']
})
export class PersonalManagementFormComponent implements OnInit {

  selectValue: string = '';
  
  constructor() { }

  ngOnInit() {
    this.selectValue  = '1';
  }

  onSelectTab() {
  }
}

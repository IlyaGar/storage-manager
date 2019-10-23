import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface User {
  name: string;
  group: string;
}

@Component({
  selector: 'app-personal-list-form',
  templateUrl: './personal-list-form.component.html',
  styleUrls: ['./personal-list-form.component.css']
})
export class PersonalListFormComponent implements OnInit {

  selectItem: number;
  selectName: string;
  displayedColumns = ['name', 'group']
  users: User[] = [
    {name: 'steak-0', group: 'Steak'},
    {name: 'pizza-1', group: 'Pizza'},
    {name: 'tacos-2', group: 'Tacos'},
    {name: 'steak-0', group: 'Steak'},
    {name: 'pizza-1', group: 'Pizza'},
    {name: 'tacos-2', group: 'Tacos'},
    {name: 'steak-0', group: 'Steak'},
    {name: 'pizza-1', group: 'Pizza'},
    {name: 'tacos-2', group: 'Tacos'}
  ];

  constructor(
    public dialogRef: MatDialogRef<PersonalListFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

  onSelectRow(i: number, row: User) {
    if(this.selectItem !== i) {
      this.selectName = row.name;
      this.selectItem = i;
    } else {
      this.selectName = '';
      this.selectItem = null;
    } 
      
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

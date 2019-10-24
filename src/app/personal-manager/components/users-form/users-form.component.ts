import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonalListFormComponent } from '../../dialog-windows/personal-list-form/personal-list-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { EditUserFormComponent } from '../../dialog-windows/edit-user-form/edit-user-form.component';

export interface Group {
  value: string;
}

export interface User {
  name: string;
  group: string;
}

const ELEMENT_DATA: User[] = [
  { name: 'Hydrogen', group: 'Gas' },
  { name: 'Helium', group: 'Gas' },
  { name: 'Lithium', group: 'Metal' },
  { name: 'Beryllium', group: 'Сrystal' },
  { name: 'Boron', group: 'Сrystal' },
  { name: 'Carbon', group: 'Сrystal' },
  { name: 'Nitrogen', group: 'Сrystal' },
  { name: 'Oxygen', group: 'Gas' },
  { name: 'Fluorine', group: 'Сrystal' },
  { name: 'Neon', group: 'Gas' },
];

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {

  displayedColumns: string[] = ['name', 'group', 'action'];
  dataSource: any;
  selectItem: number;
  
  groups: Group[] = [
    { value: 'steak-0' },
    { value: 'pizza-1' },
    { value: 'tacos-2' }
  ];

  name: string;
  group: string;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  onCreateUser() {
    this.name;
    this.group;
  }

  openPersonalListDialog(element: string) {
    const dialogRef = this.dialog.open(PersonalListFormComponent, {
      // data: {status: status},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.name = result;
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSelectRow(i) {
    if(this.selectItem !== i)
      this.selectItem = i;
    else
      this.selectItem = null;
  }

  onOpenEditUseForm(user: User) {
    const dialogRef = this.dialog.open(EditUserFormComponent, {
      data: {user: user},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
      }
    });
  }

  onDeleteUser(user: User) {

  }
}

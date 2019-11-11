import { Component, OnInit } from '@angular/core';
import { PersonalListFormComponent } from 'src/app/personal-manager/dialog-windows/personal-list-form/personal-list-form.component';
import { MatDialog } from '@angular/material/dialog';
import { SelectGroupFormComponent } from '../../dialog-windows/select-group-form/select-group-form.component';
import { SelectUserFormComponent } from '../../dialog-windows/select-user-form/select-user-form.component';

@Component({
  selector: 'app-proc-personal-list-form',
  templateUrl: './proc-personal-list-form.component.html',
  styleUrls: ['./proc-personal-list-form.component.css']
})
export class ProcPersonalListFormComponent implements OnInit {

  listWorkers: Array<string> = [];
  displayedColumnsWorkers = ['worker', 'action'];
  isSelectedElement = false;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }
  
  onClickPublic() {
    this.listWorkers = this.listWorkers.concat("Все пользователи");
    this.isSelectedElement = true;
  }

  onClear() {
    this.listWorkers = [];
    this.isSelectedElement = false;
  }

  openPersonalListDialog() {
    const dialogRef = this.dialog.open(PersonalListFormComponent, { });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
      }
    });
  }

  openSelectGroup() {
    const dialogRef = this.dialog.open(SelectGroupFormComponent, {
      // width: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.isSelectedElement = true;
      }
    });
  }
  openSelectUser() {
    const dialogRef = this.dialog.open(SelectUserFormComponent, {
      // width: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.isSelectedElement = true;
      }
    });
  }
}

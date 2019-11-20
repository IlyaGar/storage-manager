import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PersonalListFormComponent } from 'src/app/personal-manager/dialog-windows/personal-list-form/personal-list-form.component';
import { MatDialog } from '@angular/material/dialog';
import { SelectGroupFormComponent } from '../../dialog-windows/select-group-form/select-group-form.component';
import { SelectUserFormComponent } from '../../dialog-windows/select-user-form/select-user-form.component';
import { ExecutorTask } from '../../models/executor';

@Component({
  selector: 'app-proc-personal-list-form',
  templateUrl: './proc-personal-list-form.component.html',
  styleUrls: ['./proc-personal-list-form.component.css']
})
export class ProcPersonalListFormComponent implements OnInit {

  @Output() onDataSelected: EventEmitter<ExecutorTask> = new EventEmitter<ExecutorTask>();
  
  listWorkers: Array<string> = [];
  displayedColumnsWorkers = ['worker', 'action'];
  isSelectedElement = false;
  selectedMethod: any = 'all';
  
  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }
  
  onClickPublic() {
    this.listWorkers = this.listWorkers.concat("Общедоступный");
    this.onDataSelected.emit(new ExecutorTask('all', ''));
    this.isSelectedElement = true;
    this.selectedMethod = '';
  }

  onClear() {
    this.listWorkers = [];
    this.isSelectedElement = false;
    this.selectedMethod = 'all';
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
      width: '700px',
      height: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.listWorkers = this.listWorkers.concat(result);
        this.isSelectedElement = true;
        this.onDataSelected.emit(new ExecutorTask('group', this.listWorkers[0]));
      }
    });
    this.selectedMethod = '';
  }

  openSelectUser() {
    const dialogRef = this.dialog.open(SelectUserFormComponent, {
      width: '700px',
      height: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.listWorkers = this.listWorkers.concat(result);
        this.isSelectedElement = true;
        this.onDataSelected.emit(new ExecutorTask('user', this.listWorkers[0]));
      }
    });
    this.selectedMethod = '';
  }
}

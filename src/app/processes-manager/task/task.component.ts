import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectProcessesFormComponent } from '../dialog-windows/select-processes-form/select-processes-form.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  listProcesses: Array<string> = [];
  displayedColumnsProcesses = ['processe'];
  listWorkers: Array<string> = [];
  displayedColumnsWorkers = ['worker'];
  selectedMethod: any = 'auto';
  confirmText: string = 'Да';
  cancelText: string = 'Нет';

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  openSelectProcesses() {
    const dialogRef = this.dialog.open(SelectProcessesFormComponent, {
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {

      }
    });
  }
}

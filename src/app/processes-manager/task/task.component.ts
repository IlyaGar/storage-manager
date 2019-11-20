import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from 'src/app/common/services/token.service';
import { ProcService } from '../services/proc.service';
import { SnackbarService } from 'src/app/common/services/snackbar.service';
import { NewTask } from '../models/new-task';
import { Process } from '../models/process';
import { ConfirmationNewTaskFormComponent } from '../dialog-windows/confirmation-new-task-form/confirmation-new-task-form.component';
import { ExecutorTask } from '../models/executor';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  listProcesses: Array<Process> = [];
  listBase: Array<string> = [];
  executorTask: ExecutorTask = new ExecutorTask('all', '');

  displayedColumnsProcesses = ['processe'];
  selectedMethod: any = 'auto';
  confirmText: string = 'Да';
  cancelText: string = 'Нет';
  cancelClicked = false;
  isDisabled = true;

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
  ) { }

  ngOnInit() {
  }

  onClear(){
   this.isDisabled = !this.isDisabled;
  }

  addProcesses(data: Array<Process>) : void {
    this.listProcesses = data;
    console.log('Selected proc: ', this.listProcesses);
    this.controlData();
  }  

  addBase(data: Array<string>) : void {
    this.listBase = data;
    console.log('Selected base: ', this.listBase);
    this.controlData();
  }  
  
  addUser(data: ExecutorTask) : void {
    this.executorTask = data;
    console.log('Selected user: ', this.executorTask);
    this.controlData();
  }  

  onOpenConfirmationForm() {
    var newTask = new NewTask(this.tokenService.getToken(), this.listProcesses, this.listBase, this.executorTask, this.selectedMethod);
    const dialogRef = this.dialog.open(ConfirmationNewTaskFormComponent, {
      width: '50em',
      // height: '85vh',
      data: { task: newTask },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
      }
    });
  }

  controlData() {
    this.listProcesses.forEach(element => {
      this.cotntrolProcc(element.type);
    });
  }

  cotntrolProcc(proccess: string) {
    if(proccess === 'Приемка' || proccess === 'Размещение') {
      this.isDisabled = false;
    }
    if(proccess === 'Отборка') {
      if(this.listProcesses.length <= 0) {
        this.isDisabled = true;
      }
      if(this.listProcesses.find(element => element.type === proccess)) {
        if(this.listBase.length > 0) {
          this.isDisabled = false;
        } else {
          this.isDisabled = true;
        }
      }
    }
    if(proccess === 'Ротация' || proccess === 'Инвентаризация') {
      if(this.listProcesses.find(element => element.type === proccess)) {
        let tempElement = this.listProcesses.filter(element => element.type === proccess)
        tempElement.forEach(element => {
          if(element.zone.length > 0) {
            this.isDisabled = false;
          }
          if(element.zone.length <= 0) {
            this.isDisabled = true;
          }
        });
      }
    }
  }
}

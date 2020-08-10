import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from 'src/app/common/services/token.service';
import { ProcService } from '../services/proc.service';
import { SnackbarService } from 'src/app/common/services/snackbar.service';
import { NewTask } from '../models/new-task';
import { Process } from '../models/process';
import { ConfirmationNewTaskFormComponent } from '../dialog-windows/confirmation-new-task-form/confirmation-new-task-form.component';
import { ExecutorTask } from '../models/executor';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Task } from '../models/task';
import { TaskCommonService } from 'src/app/common/services/task-common.service';
import { GetSkald } from 'src/app/wms-map/models/get-sclad';
import { CurTask } from '../models/curtask';
import { MainTask } from '../models/main-task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('detailExpandWithout', [
      state('collapsedWithout', style({height: '0px', minHeight: '0'})),
      state('expandedWithout', style({height: '*'})),
      transition('expandedWithout <=> collapsedWithout', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
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

  color = 'primary';
  mode = 'determinate';
  value = 50;

  dataSource: Array<MainTask>;
  dataSourceWithout: Array<CurTask>;
  columnsToDisplay = ['mainstatus', 'mainnom', 'maindate', 'mainbase', 'mainpercent', 'mainaction'];
  expandedElement: any | null;

  columnsToDisplayWithout = ['status', 'nom', 'process', 'base', 'executor', 'type', 'place', 'percent', 'action'];
  expandedElementWithout: any | null;

  columnsToDisplayItem = ['id', 'nom', 'article', 'count', 'place', 'need', 'prog', 'key'];

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  constructor(
    public dialog: MatDialog,
    private procService: ProcService,
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
    private taskCommonService: TaskCommonService,
  )
   {
    this.taskCommonService.events_update$.forEach(event => { 
      console.log(event);
      if(event === 'update') {
        this.loadData();
        this.onClear();
      }
    });
   }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.procService.getMainTasks(new GetSkald(this.tokenService.getToken())).subscribe(response => {
      this.checkResponse(response); 
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  checkResponse(response: any) {
    if(response.status === 'empty')
      this.snackbarService.openSnackBar('Нет доступных заданий', this.action);
    else if(response.length > 0) {
      this.dataSource = response;
      this.dataSource.forEach(element => {
        element.order_date = element.order_date.split(' ')[0];
        element.curTaskList.forEach(el => {
          el.order_datetime = el.order_datetime.split(' ')[0];
        });
      });
    }
  }

  onClear(){
    this.taskCommonService.clearEvent('clear');
  }

  addProcesses(data: Array<Process>) : void {
    this.listProcesses = data;
    this.isDisabled = true ? this.listProcesses.length === 0 : this.listProcesses.length > 0;
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

  onWithoutBase() {
    this.procService.getCurTasks(new GetSkald(this.tokenService.getToken())).subscribe(response => {
      this.checkResponseWithout(response); 
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  checkResponseWithout(response: any) {
    if(response.status === 'empty')
      this.snackbarService.openSnackBar('Нет доступных заданий', this.action);
    else if(response.length > 0) {
      this.dataSourceWithout = response;
      this.dataSourceWithout.forEach(element => {
        element.order_datetime = element.order_datetime.split(' ')[0];
      });
    }
  }
}

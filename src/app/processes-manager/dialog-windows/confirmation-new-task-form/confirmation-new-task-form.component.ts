import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewTask } from '../../models/new-task';
import { ProcService } from '../../services/proc.service';
import { SnackbarService } from 'src/app/common/services/snackbar.service';
import { Status } from 'src/app/common/models/status';

export interface DataDialog {
  task: NewTask,
}

@Component({
  selector: 'app-confirmation-new-task-form',
  templateUrl: './confirmation-new-task-form.component.html',
  styleUrls: ['./confirmation-new-task-form.component.css']
})
export class ConfirmationNewTaskFormComponent implements OnInit {

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  messageTrue = 'Задание создано';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  constructor(
    private procService: ProcService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<ConfirmationNewTaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog,
  ) { }

  ngOnInit() {
    this.data.task;
  }

  onCreate() {
    this.procService.postNewTask(this.data.task).subscribe(response => {
      this.checkResponse(response); 
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  checkResponse(response: Status){
    if(response.status === 'ok') {
      this.snackbarService.openSnackBar(this.messageTrue, this.action);
      this.dialogRef.close(true);
    }
  } 
  
  onCancelClick(): void {
    this.dialogRef.close();
  }
}

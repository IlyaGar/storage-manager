import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

interface Processe {
  id: number;
  name: string;
  zone: string;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  listProcesses: Array<Processe> = [];
  displayedColumnsProcesses = ['processe'];
  listWorkers: Array<string> = [];
  selectedMethod: any = 'auto';
  confirmText: string = 'Да';
  cancelText: string = 'Нет';

  cancelClicked = false;
  
  isDisabled = true;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  onSave() {
  }

  onClear(){
   this.isDisabled = !this.isDisabled;
  }

  addProcesses(data: Array<Processe>) : void {
    this.listProcesses = data.splice(0, 1);
    console.log('Selected dat: ', this.listProcesses);
  }  
}

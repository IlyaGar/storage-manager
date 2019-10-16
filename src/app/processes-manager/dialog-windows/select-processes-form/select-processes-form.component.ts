import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { SelectCellFormComponent } from '../select-cell-form/select-cell-form.component';

interface Processe {
  name: string;
  zone: string;
}

@Component({
  selector: 'app-select-processes-form',
  templateUrl: './select-processes-form.component.html',
  styleUrls: ['./select-processes-form.component.css']
})
export class SelectProcessesFormComponent implements OnInit {

  listSelected: Array<string> = [];
  listProcesses: Array<Processe> = [ { name: '', zone: '' } ];
  displayedColumnsProcesses = ['processe', 'zone', 'action'];
  cellFrom: string = '';
  cellTo: string = '';
  selectedZone: any = 'auto';
  myControl = new FormControl();
  zoneValue: string = '';
  options: string[] = [
    'Приемка',
    'Размешение',
    'Отборка',
    'Ротация',
    'Инвентаризация'
  ];
  
  constructor(
    public dialog: MatDialog,
    // public dialogRef: MatDialogRef<SelectProcessesFormComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

  onAdd() {
    if(this.myControl.value) {
      if(this.myControl.value !== 'Ротация') {
        if(this.selectedZone === 'auto') 
          this.listProcesses = this.listProcesses.concat({ name: this.myControl.value, zone: 'Авто' });
        else 
          if(this.listSelected.length > 0)
            this.listProcesses = this.listProcesses.concat({ name: this.myControl.value, zone: this.listSelected.toString() });
          else 
            this.listProcesses = this.listProcesses.concat({ name: this.myControl.value, zone: 'Авто' });
      } else {
        if(this.listSelected) {
          this.listProcesses = this.listProcesses.concat({ name: this.myControl.value, zone: this.listSelected.toString() });
        }
      }
      this.myControl.reset();
      this.selectedZone = 'auto';
      this.cellFrom = '';
      this.cellTo = '';
      this.listSelected = [];
    }
  }

  onDelete(element: Processe) {
    this.listProcesses = this.listProcesses.filter(item => item !== element);
  }

  onClear() {
    this.myControl.reset();
    this.listSelected = [];
  }

  openSelectCell(element: Processe) {
    const dialogRef = this.dialog.open(SelectCellFormComponent, {
      width: '1200px',
      // height: '1200px',
      data: { select: this.myControl.value },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.listSelected = this.listSelected.concat(result);
      }
    });
  }
}

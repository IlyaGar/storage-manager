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

  listProcesses: Array<Processe> = [ { name: '', zone: ''} ];
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
    'Отборка',
    'Ротация',
    'Инвентаризация'
  ];
  
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SelectProcessesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

  onAdd() {
    if(this.myControl.value) {
      if(this.myControl.value !== 'Ротация') {
        this.listProcesses = this.listProcesses.concat({ name: this.myControl.value, zone: this.selectedZone });
      } else {
        if(this.cellFrom && this.cellTo)
          this.listProcesses = this.listProcesses.concat({ name: this.myControl.value, zone: this.cellFrom + '->' + this.cellTo });
      }
      this.myControl.reset();
      this.selectedZone = 'auto';
      this.cellFrom = '';
      this.cellTo = '';
    }
  }

  onDelete(element: Processe) {
    this.listProcesses = this.listProcesses.filter(item => item !== element);
  }

  openSelectCell(element: Processe) {
    const dialogRef = this.dialog.open(SelectCellFormComponent, {
      // height: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {

      }
    });
  }
}

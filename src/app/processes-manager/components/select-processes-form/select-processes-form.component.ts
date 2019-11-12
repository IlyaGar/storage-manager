import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { SelectCellFormComponent } from '../../dialog-windows/select-cell-form/select-cell-form.component';

interface Processe {
  id: number;
  name: string;
  zone: string;
}

@Component({
  selector: 'app-select-processes-form',
  templateUrl: './select-processes-form.component.html',
  styleUrls: ['./select-processes-form.component.css']
})
export class SelectProcessesFormComponent implements OnInit {

  selectedDevice: any;

  selectedProc: string = '';
  listSelected: Array<string> = [];
  listProcesses: Array<Processe> = [ {id: 0, name: '', zone: '' } ];
  displayedColumnsProcesses = ['processe', 'zone', 'action'];
  cellFrom: string = '';
  cellTo: string = '';
  selectedZone: any = 'auto';
  myControl = new FormControl();
  zoneValue: string = '';
  options: string[] = [];
  optionsAll: string[] = [
    'Приемка',
    'Размещение',
    'Отборка',
    'Ротация',
    'Инвентаризация'
  ];
  optionsAcceptance: string[] = [
    'Приемка',
    'Размещение',
  ];
  optionsAccommodation: string[] = [
    'Размещение',
  ];
  optionsSelection: string[] = [
    'Отборка',
    'Размещение',
  ];
  optionsRotation: string[] = [
    'Ротация',
  ];
  optionsInventory: string[] = [
    'Инвентаризация',
  ];

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.options = this.optionsAll;
  }

  onAdd() {
    if(this.selectedProc) {
      let lastId = +this.listProcesses[this.listProcesses.length - 1].id + 1;
      if(this.selectedProc !== 'Ротация') {
        if(this.selectedZone === 'auto') 
          this.listProcesses = this.listProcesses.concat({ id: lastId, name: this.selectedProc, zone: 'Авто' });
        else 
          if(this.listSelected.length > 0)
            this.listProcesses = this.listProcesses.concat({ id: lastId, name: this.selectedProc, zone: this.listSelected.toString() });
          else 
            this.listProcesses = this.listProcesses.concat({ id: lastId, name: this.selectedProc, zone: 'Авто' });
      } else {
        if(this.listSelected) {
          this.listProcesses = this.listProcesses.concat({ id: lastId, name: this.selectedProc, zone: this.listSelected.toString() });
        }
      }
      this.selectedProc = '';
      this.selectedZone = 'auto';
      this.cellFrom = '';
      this.cellTo = '';
      this.listSelected = [];
    }
  }

  onDelete(element: Processe) {
    this.listProcesses = this.listProcesses.filter(item => item !== element);
    this.fallOptions();
  }

  onClear() {
    this.selectedProc = '';
    this.fallOptions();
    this.listSelected = [];
  }

  openSelectCell(element: Processe) {
    const dialogRef = this.dialog.open(SelectCellFormComponent, {
      // width: '80vw',
      // height: '80vh',
      // data: { select: this.myControl.value },
      data: { select: this.selectedProc },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.listSelected = this.listSelected.concat(result);
      }
    });
  }

  onChange(selectedValue) {
    this.selectedProc = selectedValue;
    switch(this.selectedProc) {
      case 'Приемка':
        this.options = this.optionsAcceptance;
        break;
      case 'Размещение':
        this.options = this.optionsAccommodation;
        break;
      case 'Отборка':
          this.options = this.optionsSelection;
        break;
      case 'Ротация':
          this.options = this.optionsRotation;
        break;
      case 'Инвентаризация':
          this.options = this.optionsInventory;
        break;
      default:
        this.fallOptions();
        break;
    }
  }

  fallOptions() {
    if(this.listProcesses.length === 1)
    this.options = this.optionsAll;
  }
}

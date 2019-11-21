import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectCellFormComponent } from '../../dialog-windows/select-cell-form/select-cell-form.component';
import { Process } from '../../models/process';

interface IProcess {
  id: number;
  type: string;
  zone: Array<string>;
}

@Component({
  selector: 'app-processes-form',
  templateUrl: './processes-form.component.html',
  styleUrls: ['./processes-form.component.css']
})
export class ProcessesFormComponent implements OnInit {

  @Output() onDataSelected: EventEmitter<Array<Process>> = new EventEmitter<Array<Process>>();

  selectedDevice: any;
  isSllowedAdd: boolean = false;
  selectedProc: string = '';
  listSelected: Array<string> = [];
  listProcesses: Array<IProcess> = [ {id: 0, type: '', zone: [] } ];
  displayedColumnsProcesses = ['processe', 'zone', 'action'];
  cellFrom: string = '';
  cellTo: string = '';
  selectedZone: any = 'auto';
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
          this.listProcesses = this.listProcesses.concat({ id: lastId, type: this.selectedProc, zone: ['Авто'] });
        else 
          if(this.listSelected.length > 0)
            this.listProcesses = this.listProcesses.concat({ id: lastId, type: this.selectedProc, zone: this.listSelected });
          else 
            this.listProcesses = this.listProcesses.concat({ id: lastId, type: this.selectedProc, zone: ['Авто'] });
      } else {
        if(this.listSelected) {
          this.listProcesses = this.listProcesses.concat({ id: lastId, type: this.selectedProc, zone: this.listSelected });
        }
      }
      this.onDataSelected.emit(this.getArrayProcesses(this.listProcesses));
      this.initialState();
    }
  }

  initialState() {
    this.selectedProc = '';
    this.selectedZone = 'auto';
    this.cellFrom = '';
    this.cellTo = '';
    this.listSelected = []; 
  }

  getArrayProcesses(array: Array<IProcess>) { 
    let cloneRpocesses = this.cloneList(array);
    let delFirstElement = cloneRpocesses.shift();
    let copyList = [];
    cloneRpocesses.forEach(element => {
      copyList = copyList.concat(this.pick(element, "type", "zone") as Process);
    });
    return copyList;
  }

  cloneList(array: Array<IProcess>) { 
    return JSON.parse(JSON.stringify(array)); 
  } 

  pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
    const copy = {} as Pick<T, K>;
    keys.forEach(key => copy[key] = obj[key]);
    return copy;
  }

  onDelete(element: IProcess) {
    this.listProcesses = this.listProcesses.filter(item => item !== element);
    this.fallOptions();
    this.onDataSelected.emit(this.getArrayProcesses(this.listProcesses));
  }

  onClear() {
    this.selectedProc = '';
    this.fallOptions();
    this.listSelected = [];
    this.isSllowedAdd = false;
  }

  onOpenSelectCell(element: IProcess) {
    const dialogRef = this.dialog.open(SelectCellFormComponent, {
      width: '65em',
      height: '35em',
      data: { select: this.selectedProc },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.length > 0) {
        this.listSelected = this.listSelected.concat(result);
        this.isSllowedAdd = true;
      } else {
        this.selectedZone = 'auto';
      }
    });
  }

  onChange(selectedValue: string) {
    this.selectedProc = selectedValue;
    switch(this.selectedProc) {
      
      case 'Приемка':
        this.options = this.optionsAccommodation;
        this.isSllowedAdd = true;
        break;

      case 'Размещение':
        this.options = this.optionsAccommodation;
        this.isSllowedAdd = true;
        break;

      case 'Отборка':
        this.options = this.optionsSelection;
        this.isSllowedAdd = true;
        break;
        
      case 'Ротация':
        this.options = this.optionsRotation;
        this.isSllowedAdd = false;
        break;

      case 'Инвентаризация':
        this.options = this.optionsInventory;
        this.isSllowedAdd = false;
        break;

      default:
        this.fallOptions();
        this.isSllowedAdd = false;
        break;
    }
  }

  fallOptions() {
    if(this.listProcesses.length === 1)
      this.options = this.optionsAll;
  }
}

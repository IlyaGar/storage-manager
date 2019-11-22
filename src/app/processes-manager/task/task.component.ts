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

const ELEMENT_DATA: Task[] = [
  {
    status: 'Новое в очереди',
    name: '123456',
    process: 'Приемка',
    percent: 0,
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    status: 'Новое в очереди',
    name: '564564',
    process: 'Размещение',
    percent: 0,
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  }, {
    status: 'Принято в исполнение',
    name: '3134654',
    process: 'Отборка',
    percent: 20,
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`
  }, {
    status: 'Принято в исполнение',
    name: '7987421',
    process: 'Ротация',
    percent: 65,
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`
  }, {
    status: 'Завершено частично',
    name: '5463215',
    process: 'Приемка',
    percent: 75,
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`
  }, {
    status: 'Завершено полностью',
    name: '2311645',
    process: 'Отборка',
    percent: 50,
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`
  }, {
    status: 'Завершено полностью',
    name: '2165464',
    process: 'Размещение',
    percent: 100,
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`
  }, {
    status: 'Завершено полностью',
    name: '1326546',
    process: 'Инвентаризация',
    percent: 100,
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`
  }, {
    status: 'Завершено частично',
    name: '7897564',
    process: 'Ротация',
    percent: 90,
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`
  }, {
    status: 'Завершено полностью',
    name: '3216422',
    process: 'Приемка',
    percent: 100,
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`
  },
];

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
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

  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['status', 'process', 'name', 'percent', 'action'];
  expandedElement: Task | null;

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

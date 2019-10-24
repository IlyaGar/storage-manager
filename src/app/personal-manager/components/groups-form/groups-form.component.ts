import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditGroupFormComponent } from '../../dialog-windows/edit-group-form/edit-group-form.component';

export interface Group {
  name: string;
  rights: Array<string>;
}

const ELEMENT_DATA: Group[] = [
  { name: 'steak-0', rights: ['Добавление заказа', 'Редактирование склада', 'Управление персоналом'] },
  { name: 'pizza-1', rights: ['Редактирование склада']  },
  { name: 'tacos-2', rights: ['Управление персоналом']  },
  { name: 'steak-1', rights: ['Добавление заказа', 'Редактирование склада', 'Управление персоналом'] },
  { name: 'pizza-2', rights: ['Добавление заказа', 'Редактирование склада']  },
  { name: 'tacos-3', rights: ['Управление персоналом']  },
  { name: 'steak-4', rights: ['Добавление заказа', 'Редактирование склада', 'Управление персоналом'] },
  { name: 'pizza-5', rights: ['Редактирование склада']  },
  { name: 'tacos-6', rights: ['Управление персоналом']  },
  { name: 'steak-7', rights: ['Добавление заказа', 'Редактирование склада', 'Управление персоналом'] },
  { name: 'pizza-8', rights: ['Редактирование склада']  },
  { name: 'tacos-9', rights: ['Управление персоналом']  },
  { name: 'steak-10', rights: ['Добавление заказа', 'Редактирование склада', 'Управление персоналом'] },
  { name: 'pizza-11', rights: ['Редактирование склада']  },
  { name: 'tacos-12', rights: ['Добавление заказа', 'Управление персоналом']  },
  { name: 'steak-13', rights: ['Добавление заказа', 'Редактирование склада', 'Управление персоналом'] },
  { name: 'pizza-14', rights: ['Редактирование склада']  },
  { name: 'tacos-15', rights: ['Управление персоналом']  }
];

export interface User {
  name: string;
  group: string;
}

const ELEMENT_DATA1: User[] = [
  { name: 'Hydrogen', group: 'Gas' },
  { name: 'Helium', group: 'Gas' },
  { name: 'Lithium', group: 'Metal' },
  { name: 'Beryllium', group: 'Сrystal' },
  { name: 'Boron', group: 'Сrystal' },
  { name: 'Carbon', group: 'Сrystal' },
  { name: 'Nitrogen', group: 'Сrystal' },
  { name: 'Oxygen', group: 'Gas' },
  { name: 'Fluorine', group: 'Сrystal' },
  { name: 'Neon', group: 'Gas' },
];

@Component({
  selector: 'app-groups-form',
  templateUrl: './groups-form.component.html',
  styleUrls: ['./groups-form.component.css']
})
export class GroupsFormComponent implements OnInit {

  nameGroup: string;
  selectItem: number;
  displayedColumnsGrop = ['name', 'rights', 'menu'];
  
  listRights: Array<string> = ['Добавление заказа', 'Редактирование склада', 'Управление персоналом'];
  selectRights: Array<string> = [];

  groups: any;
  listUsers: Array<string> = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    public dialog: MatDialog,
    private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.groups = new MatTableDataSource(ELEMENT_DATA);
  }

  onSelectRow(i) {
    if(this.selectItem !== i)
      this.selectItem = i;
    else
      this.selectItem = null;
  }

  onCreateGroup() {
    this.nameGroup;
    this.selectRights;
  }

  onClickRight(right) {
    const index: number = this.selectRights.indexOf(right);
    if (index !== -1) {
        this.selectRights.splice(index, 1);
    } else {
      this.selectRights.push(right);
    }
    console.log(this.selectRights);
  }

  applyFilter(filterValue: string) {
    this.groups.filter = filterValue.trim().toLowerCase();
  }

  onOpenEditGroupForm(group: Group) {
    const dialogRef = this.dialog.open(EditGroupFormComponent, {
      data: { group: group },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
      }
    });
  }
}

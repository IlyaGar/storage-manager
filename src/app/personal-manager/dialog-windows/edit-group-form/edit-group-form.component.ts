import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Group {
  name: string;
  rights: Array<string>;
}

@Component({
  selector: 'app-edit-group-form',
  templateUrl: './edit-group-form.component.html',
  styleUrls: ['./edit-group-form.component.css']
})
export class EditGroupFormComponent implements OnInit {

  listRights: Array<string> = ['Добавление заказа', 'Редактирование склада', 'Управление персоналом'];
  
  constructor(
    public dialogRef: MatDialogRef<EditGroupFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Group,
  ) { }

  ngOnInit() {

  }

}

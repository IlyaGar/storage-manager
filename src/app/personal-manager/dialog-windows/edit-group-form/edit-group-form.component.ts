import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupList } from '../../models/group-list';

interface DialogData {
  group: GroupList;
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
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }
}

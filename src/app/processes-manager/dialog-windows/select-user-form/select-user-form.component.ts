import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-select-user-form',
  templateUrl: './select-user-form.component.html',
  styleUrls: ['./select-user-form.component.css']
})
export class SelectUserFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SelectUserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

}

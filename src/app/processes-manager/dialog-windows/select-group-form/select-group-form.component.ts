import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-select-group-form',
  templateUrl: './select-group-form.component.html',
  styleUrls: ['./select-group-form.component.css']
})
export class SelectGroupFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SelectGroupFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

}

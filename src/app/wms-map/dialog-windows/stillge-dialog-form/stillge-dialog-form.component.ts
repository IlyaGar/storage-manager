import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stillge-dialog-form',
  templateUrl: './stillge-dialog-form.component.html',
  styleUrls: ['./stillge-dialog-form.component.css']
})
export class StillgeDialogFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StillgeDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

}

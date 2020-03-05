import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  startDate: string;
  finishDate: string;
  mtOtbor: number;
  mtPriem: number;
  mtImport: number;
  mtRotac: number;
}

@Component({
  selector: 'app-motinate-sum-position-form',
  templateUrl: './motinate-sum-position-form.component.html',
  styleUrls: ['./motinate-sum-position-form.component.css']
})
export class MotinateSumPositionFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MotinateSumPositionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
    this.data;
  }

}

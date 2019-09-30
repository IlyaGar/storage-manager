import { Component, OnInit, Inject } from '@angular/core';
import { StillageItem } from 'src/app/wms-map/models/stillage-item';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-view-cell',
  templateUrl: './detail-view-cell.component.html',
  styleUrls: ['./detail-view-cell.component.css']
})
export class DetailViewCellComponent implements OnInit {

  stillageItem: StillageItem;

  constructor(
    public dialogRef: MatDialogRef<DetailViewCellComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    if(this.data) {
      this.stillageItem = this.data.cell;
    }
  }

  onOkClick(): void {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

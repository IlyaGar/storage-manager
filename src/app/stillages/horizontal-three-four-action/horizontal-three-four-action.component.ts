import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailViewCellComponent } from 'src/app/dialog-windows/detail-view-cell-manager/detail-view-cell/detail-view-cell.component';
import { StillageItem } from 'src/app/wms-map/models/stillage-item';

@Component({
  selector: 'app-horizontal-three-four-action',
  templateUrl: './horizontal-three-four-action.component.html',
  styleUrls: ['./horizontal-three-four-action.component.css']
})
export class HorizontalThreeFourActionComponent implements OnInit {

  @Input() data;
  @Output() onChanged = new EventEmitter<string>();
  cell: StillageItem;
  
  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    if(this.data)
      this.cell = this.data;
  }

  onClickCell(numberCell, floorCell) {
    this.onChanged.emit(numberCell + '-' + floorCell);
  }

  onOpenDetailWindow(n, f) {
    const dialogRef = this.dialog.open(DetailViewCellComponent, {
      data: { token: ''},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.ngOnInit();
    });
  }
}

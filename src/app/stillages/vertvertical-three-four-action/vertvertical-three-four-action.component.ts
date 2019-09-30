import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StillageItem } from 'src/app/wms-map/models/stillage-item';
import { MatDialog } from '@angular/material/dialog';
import { DetailViewCellComponent } from 'src/app/dialog-windows/detail-view-cell-manager/detail-view-cell/detail-view-cell.component';
import { InventoryItem } from 'src/app/wms-map/models/inventory-item';

@Component({
  selector: 'app-vertvertical-three-four-action',
  templateUrl: './vertvertical-three-four-action.component.html',
  styleUrls: ['./vertvertical-three-four-action.component.css']
})
export class VertverticalThreeFourActionComponent implements OnInit {

  @Input() data;
  @Output() onChanged = new EventEmitter<string>();

  stillageItem: StillageItem;
  selectCellFrom = '';
  selectCellTo= '';
  isSelectCellFrom = false;
  isSelectCellTo= false;
  
  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    if(this.data)
      this.stillageItem = this.data;
  }

  onClickCell(numberCell, floorCell) {
    var stname = this.stillageItem.stillageName;
    if(stname)
      this.onOpenDetailWindow(numberCell, floorCell);
  }

  onOpenDetailWindow(numberCell, floorCell) {
    const dialogRef = this.dialog.open(DetailViewCellComponent, {
      data: { stillageItem: this.stillageItem, num: numberCell, floor: floorCell },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.ngOnInit();
    });
  }

  // onClickCell(numberCell, floorCell) {
  //   this.onChanged.emit(numberCell + '-' + floorCell);
  // }
}

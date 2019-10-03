import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WmsMapService } from 'src/app/wms-map/services/wms-map.service';
import { StillageItem } from 'src/app/wms-map/models/stillage-item';

export class Item{
  constructor(
    public st: string,
    public c11: boolean,
    public c12: boolean,
    public c13: boolean,
    public c14: boolean,
  
    public c21: boolean,
    public c22: boolean,
    public c23: boolean,
    public c24: boolean,
   
    public c31: boolean,
    public c32: boolean,
    public c33: boolean,
    public c34: boolean,
  ){}
}

@Component({
  selector: 'app-select-cell-form',
  templateUrl: './select-cell-form.component.html',
  styleUrls: ['./select-cell-form.component.css']
})
export class SelectCellFormComponent implements OnInit {

  tab_map: Array<Array<StillageItem>> = [];
  listSelected: Array<string> = [];
  listSelectedItems: Array<StillageItem> = [];
  y_height: number;
  x_width: number;
  selItem: Item = new Item('', false, false, false, false, false, false, false, false, false, false, false, false);
  cellSelected: string = '';
  cellName: string = '';

  constructor(
    private wmsMapService: WmsMapService,
    public dialogRef: MatDialogRef<SelectCellFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.wmsMapService.getData().subscribe(response =>  { 
      if(response) {
        this.tab_map = response.stillageItem;
        this.y_height = response.y;
        this.x_width = response.x;
      }
    },
    error => {
      console.log(error);
      alert("Сервер не отвечает.");
     }
    );
  }

  onClickCell(stillage: StillageItem, numberCell: string, floorCell: string) {
    if(stillage.element === 'office' || stillage.element === 'zone_send' || stillage.element === 'zone_unload') {
      if(stillage.cellName) {
        this.listSelected = this.listSelected.concat(stillage.cellName);
      }
      if(stillage.yxName) {
        var splited = stillage.yxName.split(';');
        if(splited.length == 2)
          this.listSelected = this.listSelected.concat(this.tab_map[splited[0]][splited[1]].cellName);
      }
    }
    // if(numberCell && floorCell) {
    //   if(stillage.stillageName) {
    //     this.listSelected = this.listSelected.concat(stillage.stillageName + '-' + numberCell + '-' + floorCell);
    //     stillage.element = numberCell + floorCell;
    //     stillage.isSelectCellStillage = true;
    //     this.listSelectedItems.push(stillage);
    //   }
    // } else {
    //   if(stillage.element === 'office' || stillage.element === 'zone_send' || stillage.element === 'zone_unload') {
    //     if(stillage.cellName) {
    //       this.listSelected = this.listSelected.concat(stillage.cellName);
    //     }
    //     if(stillage.yxName) {
    //       var splited = stillage.yxName.split(';');
    //       if(splited.length == 2)
    //         this.listSelected = this.listSelected.concat(this.tab_map[splited[0]][splited[1]].cellName);
    //     }
    //   }
    // }
  }

  onDelete(element: string) {
    this.listSelected = this.listSelected.filter(item => item !== element);
    var splited = element.split('-');
    if(splited.length === 3) {
      this.listSelectedItems.forEach(element => {
        if(element.stillageName === splited[0]) {
          if(element.element === splited[1] + splited[2]) {
            element.element = '';
            element.isSelectCellStillage = false;
          }
        }
      });
    }
  }

  onListCange(cell: string) {
    if(this.listSelected.includes(cell))
      this.listSelected = this.listSelected.filter(item => item !== cell);
    else
      this.listSelected = this.listSelected.concat(cell);
  }

  onOkClick(): void {
    this.dialogRef.close(this.listSelected);
  }
}

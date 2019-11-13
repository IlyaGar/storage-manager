import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WmsMapService } from 'src/app/wms-map/services/wms-map.service';
import { StillageItem } from 'src/app/wms-map/models/stillage-item';
import { StillageService } from 'src/app/common/services/stillage.service';
import { TokenService } from 'src/app/common/services/token.service';
import { GetSkald } from 'src/app/wms-map/models/get-sclad';

export interface DialogData {
  select: string;
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
  cellSelected: string = '';
  cellName: string = '';
  cellFrom: string = '';
  cellTo: string = '';
  isIncorrect = false;
  
  constructor(
    private tokenService: TokenService,
    private stillageService: StillageService,
    private wmsMapService: WmsMapService,
    public dialogRef: MatDialogRef<SelectCellFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
    if(this.data.select === 'Ротация') {
      this.stillageService.clickEvent(2);
    }
    this.wmsMapService.getSclad(new GetSkald(this.tokenService.getToken())).subscribe(response =>  { 
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
        this.onListCange(stillage.cellName);
      }
      if(stillage.yxName) {
        var splited = stillage.yxName.split(';');
        if(splited.length == 2)
          this.onListCange(this.tab_map[splited[0]][splited[1]].cellName);
      }
    }
  }

  onDelete(element: string) {
    this.listSelected = this.listSelected.filter(item => item !== element);
    var splited = element.split('-');
    if(splited.length === 3) {
      this.stillageService.delEvent(splited);
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
    if(this.data.select === 'Ротация') {
      if(!this.cellFrom) 
        this.cellFrom = cell;
      else 
        if(!this.cellTo)
          this.cellTo = cell;    
    } else {
      if(this.listSelected.includes(cell))
        this.listSelected = this.listSelected.filter(item => item !== cell);
      else
        this.listSelected = this.listSelected.concat(cell);
      }
  }

  onEnterAdd() {
    if(!this.listSelected.includes(this.cellName)) {
      var isExist = false;
      if(this.cellName) {
        var splited = this.cellName.split('-');
        if(splited.length === 3) {
          this.tab_map.forEach(element => {
            element.forEach(element => {
              if(element.stillageName === splited[0]) {
                isExist = true;
              }
            });
          });
        }
        if(splited.length === 1) {
          this.tab_map.forEach(element => {
            element.forEach(element => {
              if(element.stillageName === splited[0]) {
                if(element.element) 
                  isExist = true;
              }
            });
          });
        }
      }
      if(isExist) {
        this.listSelected = this.listSelected.concat(this.cellName);
      }
    } else this.isIncorrect = true;
  }

  onEnterAddRotation() {
    if(this.cellFrom && this.cellTo) {
      this.listSelected = this.listSelected.concat(this.cellFrom  + '->' + this.cellTo);
      var splited = this.cellFrom.split('-');
      if(splited.length === 3) {
        this.stillageService.delEvent(splited);
        this.cellFrom = '';
      }
      var splited = this.cellTo.split('-');
      if(splited.length === 3) {
        this.stillageService.delEvent(splited);
        this.cellTo = '';
      }
    } 
  }

  onClickClearFrom() {
    this.cellFrom = '';
  }

  onClickClearTo() {
    this.cellTo = '';
  }

  onOkClick(): void {
    this.dialogRef.close(this.listSelected);
  }
}

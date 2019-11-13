import { Component, OnInit } from '@angular/core';
import { WmsMapService } from '../services/wms-map.service';
import { StillageItem } from '../models/stillage-item';
import { PingService } from 'src/app/common/services/ping.service';
import { AttentionFormComponent } from 'src/app/dialog-windows/attention-dialog/attention-form/attention-form.component';
import { MatDialog } from '@angular/material/dialog';
import { InventoryDialogFormComponent } from 'src/app/dialog-windows/inventory-dialog-manager/inventory-dialog-form/inventory-dialog-form.component';
import { InventoryItem } from '../models/inventory-item';
import { StillgeDialogFormComponent } from '../dialog-windows/stillge-dialog-form/stillge-dialog-form.component';
import { GetSkald } from '../models/get-sclad';
import { TokenService } from 'src/app/common/services/token.service';

@Component({
  selector: 'app-wms-map-form',
  templateUrl: './wms-map-form.component.html',
  styleUrls: ['./wms-map-form.component.css']
})
export class WmsMapFormComponent implements OnInit {

  tab_map: Array<Array<StillageItem>> = [];
  previousStillageFrom: StillageItem = new StillageItem(0, 0, '', '', '', '', '', '', '', false, false, false, false, false, false, false, false, false, false, false);
  previousStillageTo: StillageItem = new StillageItem(0, 0, '', '', '', '', '', '', '', false, false, false, false, false, false, false, false, false, false, false);
  listInventory: Array<InventoryItem> = [];
  rotationItem: InventoryItem = new InventoryItem(null, '');
  y_height: number;
  x_width: number;
  ping: number;
  selectedInventory: any = 'underline';
  selectedRotation: any = 'underline';
  cellFrom = '';
  cellTo = '';
  isSelectInventory = false;
  isFromTo = false;

  isChoiceRow: any;
  isChoiceCell: any;
  isChoiceFrom: any;
  isSelectRotation: any;
  isChoiceTo: any;
  isSelectView: any;
  isSelectTypeRowStillage: any;
  isSelectEditor: any;
  
  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private wmsMapService: WmsMapService,
    private pingService: PingService,
  ) { }

  ngOnInit() {
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

  onChanged(cellname: string){
    this.cellFrom = cellname;
  }

  onPing() {
    this.pingService.pingStream.subscribe(ping => {
      this.ping = ping;
    });
  }

  onSelectCell(cell: StillageItem) {
    if(this.isSelectInventory) {
      this.selectInventory(cell);
    }
    if(cell.cellName) {
      this.openDetailStillageDialog();
    }
  }

  selectInventory(cell: StillageItem) {
    if(!cell.isSelectCellStillage) {
      if(this.selectedInventory === 'choice-cell') {
        if((cell.isVer || cell.isHor) && cell.isStillageOneWithName) {
          var splitted = cell.yxName.split(";"); 
          var nameStillage = this.tab_map[splitted[0]][splitted[1]].cellName;
          if(nameStillage) {
            this.listInventory.push(new InventoryItem(cell, nameStillage));
          }
        }
      }
      if(this.selectedInventory === 'choice-row') {
        if(cell.rowName) {
          if(cell.isVer) {
            var splitted = cell.yxName.split(";"); 
            var nameStillage = this.tab_map[splitted[0]][splitted[1]].cellName;
            if(nameStillage) {
              this.listInventory.push(new InventoryItem(cell, nameStillage));
            }
            for(var i: number = 1; i < this.y_height; i++) {
              if(cell.y + i < this.y_height) {
                if(this.tab_map[cell.y + i][cell.x].isVer && this.tab_map[cell.y + i][cell.x].rowName === cell.rowName) {
                  var splitted = this.tab_map[cell.y + i][cell.x].yxName.split(";"); 
                  var nameStillage = this.tab_map[splitted[0]][splitted[1]].cellName;
                  if(nameStillage) {
                    this.listInventory.push(new InventoryItem(this.tab_map[cell.y + i][cell.x], nameStillage));
                  }
                }
              }
              if(cell.y - i >= 0) {
                if(this.tab_map[cell.y - i][cell.x].isVer && this.tab_map[cell.y - i][cell.x].rowName === cell.rowName) {
                  var splitted = this.tab_map[cell.y - i][cell.x].yxName.split(";"); 
                  var nameStillage = this.tab_map[splitted[0]][splitted[1]].cellName;
                  if(nameStillage) {
                    this.listInventory.push(new InventoryItem(this.tab_map[cell.y - i][cell.x], nameStillage));
                  }
                }
              }
            }
          }
          if(cell.isHor) {
            this.listInventory.push(new InventoryItem(cell, nameStillage));
            for(var i: number = 1; i < this.x_width; i++) {
              if(cell.y + i < this.x_width) {
                if(this.tab_map[cell.y][cell.x + i].isVer && this.tab_map[cell.y][cell.x + i].rowName === cell.rowName) {
                  var splitted = this.tab_map[cell.y][cell.x + i].yxName.split(";"); 
                  var nameStillage = this.tab_map[splitted[0]][splitted[1]].cellName;
                  if(nameStillage) {
                    this.listInventory.push(new InventoryItem(this.tab_map[cell.y][cell.x + i], nameStillage));
                  }
                }
              }
              if(cell.x - i >= 0) {
                if(this.tab_map[cell.y][cell.x - i].isVer && this.tab_map[cell.y][cell.x - i].rowName === cell.rowName) {
                  var splitted = this.tab_map[cell.y][cell.x - i].yxName.split(";"); 
                  var nameStillage = this.tab_map[splitted[0]][splitted[1]].cellName;
                  if(nameStillage) {
                    this.listInventory.push(new InventoryItem(this.tab_map[cell.y][cell.x - i], nameStillage));
                  }
                }
              }
            }
          }
          if(cell.isBraceVer) {
            for(var i: number = 1; i < this.y_height - cell.y; i++) {
              if(this.tab_map[cell.y + i][cell.x].isVer && this.tab_map[cell.y + i][cell.x].rowName === cell.rowName) {
                var splitted = this.tab_map[cell.y + i][cell.x].yxName.split(";"); 
                var nameStillage = this.tab_map[splitted[0]][splitted[1]].cellName;
                if(nameStillage) {
                  this.listInventory.push(new InventoryItem(this.tab_map[cell.y + i][cell.x], nameStillage));
                }
              }
            }
          }
          if(cell.isBraceHor) {
            for(var i: number = 1; i < this.x_width - cell.x; i++) {
              if(this.tab_map[cell.y][cell.x + i].isVer && this.tab_map[cell.y][cell.x + i].rowName === cell.rowName) {
                var splitted = this.tab_map[cell.y][cell.x + i].yxName.split(";"); 
                var nameStillage = this.tab_map[splitted[0]][splitted[1]].cellName;
                if(nameStillage) {
                  this.listInventory.push(new InventoryItem(this.tab_map[cell.y][cell.x + i], nameStillage));
                }
              }
            }
          }
        }
      }
      this.listInventory.forEach(element => {
        element.stillageItem.isSelectCellStillage = true;
      });
    }
    else {
      var splitted = cell.yxName.split(";"); 
      var nameStillage = this.tab_map[splitted[0]][splitted[1]].cellName;
      if(nameStillage) {
        this.listInventory = this.listInventory.filter(obj => obj.name !== nameStillage);
        cell.isSelectCellStillage = false;
      }
    }
  }
  
  onOkInventory() {
    if(this.listInventory.length > 0) {
      this.openInventoryDialog();
    } else {
      this.openAttentionDialog('', 'Выберите стиллажи для инвентаризации')
    }
  }

  onSelectCellRotation(stillage: StillageItem) {
    var splitted = stillage.yxName.split(";"); 
    var nameStillage = this.tab_map[splitted[0]][splitted[1]].cellName;
    if(nameStillage) {
      this.rotationItem = new InventoryItem(stillage, nameStillage);
    }
  }

  onClickCell(stillage: StillageItem, numberCell: string, floorCell: string) {
    var splitted = stillage.yxName.split(";"); 
    var nameStillage = this.tab_map[splitted[0]][splitted[1]].cellName;
    if(nameStillage) {
      if(this.cellFrom === '') {
        if(this.previousStillageFrom) {
          this.tab_map[this.previousStillageFrom.y][this.previousStillageFrom.x].isSelectCellStillage = false;
          // this.tab_map[this.previousStillageFrom.y][this.previousStillageFrom.x].element = '';
        }
        this.cellFrom = nameStillage + '-' + numberCell + '-' + floorCell;
        // stillage.element = numberCell + '' + floorCell + '-from';
        // stillage.isSelectCellStillage = true;
        // this.previousStillageFrom = stillage;
        // this.isFromTo = true;
      } else {
        if(this.cellTo === '') {
          if(this.previousStillageTo) {
            this.tab_map[this.previousStillageTo.y][this.previousStillageTo.x].isSelectCellStillage = false;
            // this.tab_map[this.previousStillageTo.y][this.previousStillageTo.x].element = '';
          }
          this.cellTo = nameStillage + '-' + numberCell + '-' + floorCell;
          // stillage.element = numberCell + '' + floorCell + '-to';
          // stillage.isSelectCellStillage = true;
          // this.previousStillageTo = stillage;
          // this.isFromTo = true;
        }
      }
    }
  }
  clearSelectStillage() {
    this.tab_map.forEach(row => {
      row.forEach(element => {
        element.isSelectCellStillage = false;
      });
    });
    if(this.previousStillageTo) {
      this.tab_map[this.previousStillageTo.y][this.previousStillageTo.x].isSelectCellStillage = false;
      this.tab_map[this.previousStillageTo.y][this.previousStillageTo.x].element = '';
    }
    if(this.previousStillageFrom) {
      this.tab_map[this.previousStillageFrom.y][this.previousStillageFrom.x].isSelectCellStillage = false;
      this.tab_map[this.previousStillageFrom.y][this.previousStillageFrom.x].element = '';
    }
  }

  clearListInventory() {
    if(this.listInventory.length > 0) {
      this.listInventory.forEach(element => {
        element.stillageItem.isSelectCellStillage = false;
      });
    }
  }

  onClickClearFrom() {
    this.cellFrom = '';
    if(this.previousStillageFrom) {
      this.tab_map[this.previousStillageFrom.y][this.previousStillageFrom.x].isSelectCellStillage = false;
      this.tab_map[this.previousStillageFrom.y][this.previousStillageFrom.x].element = '';
    }
  }

  onClickClearTo() {
    this.cellTo = '';
    if(this.previousStillageTo) {
      this.tab_map[this.previousStillageTo.y][this.previousStillageTo.x].isSelectCellStillage = false;
      this.tab_map[this.previousStillageTo.y][this.previousStillageTo.x].element = '';
    }
  }

  openAttentionDialog(status: string, message: string) {
    const dialogRef = this.dialog.open(AttentionFormComponent, {
      data: {status: status, message: message},
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

  openInventoryDialog() {
    const dialogRef = this.dialog.open(InventoryDialogFormComponent, {
      // width: '400px',
      height: '400px',
      data: { list: this.listInventory },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.listInventory.forEach(element => {
        element.stillageItem.isSelectCellStillage = false;
      });
      this.listInventory = [];
    });
  }

  openDetailStillageDialog() {
    const dialogRef = this.dialog.open(StillgeDialogFormComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
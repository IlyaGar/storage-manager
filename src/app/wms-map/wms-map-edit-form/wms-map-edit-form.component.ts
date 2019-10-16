import { Component, OnInit } from '@angular/core';
import { StillageItem } from '../models/stillage-item';
import { WmsMapService } from '../services/wms-map.service';

const HEIGHT_MAP = 16;
const WIDTH_MAP = 17;

export interface State {
  name: string;
}

@Component({
  selector: 'app-wms-map-edit-form',
  templateUrl: './wms-map-edit-form.component.html',
  styleUrls: ['./wms-map-edit-form.component.css']
})
export class WmsMapEditFormComponent implements OnInit {
  
  tab_map: Array<Array<StillageItem>> = [];
  previous_tab_map: Array<Array<StillageItem>> = [];
  temp_arr = [];
  array_name: Array<string> = [];
  currentCell: StillageItem = null;
  previousCell: StillageItem = null;
  firstCell: StillageItem;
  y_height: number = 0;
  x_width: number = 0;
  stillageRowName: string = '';
  stillageName: string = '';
  zoneName: string = '';
  zoneSendName: string = '';
  imageUrlHor1: string = '../assets/brace-hor.png'
  imageUrlVer1: string = '../assets/brace-ver.png'
  selectedElement1: any = 'undefined';
  selectedElement2: any = 'undefined';
  selectedElement3: any = 'undefined';
  selectedRow: any = 'undefined';
  selectedEditor: any = 'undefined';
  confirmText: string = 'Да';
  cancelText: string = 'Нет';
  isChoiceStillage = false;
  isChoiceZoneUnloade = false;
  isChoiceZonaSend = false;
  isChoiceOffice = false;
  isChoiceRoad = false;
  isPanelOpenStillage = false;
  isChoiceProperties = false;
  isSelectTypeRowStillage = false;
  isHor1Stillage = false;
  isVer1Stillage = false;
  isChoiceDelete = false;
  isChoiceContinueRow = false;
  isSelectEditor = false; 
  isSelectCellStillage = false;
  isChanged = false;
  isSelectCellWithRowName = false;
  isSelectedElement = false;
  isSelectedRowStillages = false;
  isSelectedStillage = false;

  temp_y_first = -1;
  temp_y_second = -1;
  temp_x_first = -1;
  temp_x_second = -1;

  constructor(private wmsMapService: WmsMapService) { }

  ngOnInit() {
    this.wmsMapService.getData().subscribe(response =>  { 
      if(response) {
        this.checkResponse(response);
        if(this.isChanged)
          this.isChanged = !this.isChanged;
      }
    },
    error => {
      console.log(error);
      alert("Сервер не отвечает.");
     }
    );
  }

  checkResponse(response) {
    this.tab_map = response.stillageItem;
    this.y_height = response.y;
    this.x_width = response.x;
    if(this.tab_map) {
      if(this.tab_map.length === 0) {
        this.createNewMap();
      }
    } else {
      this.createNewMap();
    }
    this.cloneMap();
  }

  createNewMap() {
    if(this.y_height === 0)
      this.y_height = HEIGHT_MAP;
    if(this.x_width === 0)
      this.x_width = WIDTH_MAP;
    for(var i: number = 0; i < this.y_height; i++) {
      this.tab_map[i] = [];
      for(var j: number = 0; j < this.x_width; j++) {
          this.tab_map[i][j] = new StillageItem(i, j, '', '', '', '', '', '', '', false, false, false, false, false, false, false, false, false, false, false);
      }
    }
  }

  cloneMap() {
    this.previous_tab_map = this.tab_map.map(obj => ({...obj}));
  }

  onChangeSize() {
    this.temp_arr = this.tab_map;
    this.tab_map = [];    
    for(var i: number = 0; i < this.y_height; i++) {
      this.tab_map[i] = [];
      for(var j: number = 0; j < this.x_width; j++) {
          this.tab_map[i][j] = new StillageItem(i, j, '', '', '', '', '', '', '', false, false, false, false, false, false, false, false, false, false, false);
      }
    }
    for(var i: number = 0; i < this.tab_map.length; i++) {
      if(i < this.temp_arr.length)
        for(var j: number = 0; j < this.tab_map[i].length; j++) {
          if(j < this.temp_arr[i].length)
            this.tab_map[i][j] = this.temp_arr[i][j];
        }
    }
    this.isChanged = true;
  }

  onSelectCell(cell: StillageItem) {
    this.whatIsIt(cell);
    if(cell.element) {
      this.toNameZone(cell);
    }
    if(this.previousCell) {
      this.tab_map[this.previousCell.y][this.previousCell.x].isSelectCellStillage = false;
      this.stillageName = '';
    }
    if(this.isSelectEditor && this.isChoiceDelete) {
      this.deleteElement(cell);
    }
    if(cell.isHor || cell.isVer) {
      this.isPanelOpenStillage = false
      this.isChoiceProperties = true;
    }
    if(cell.isStillageOneWithOutName || cell.isStillageOneWithName) {
      this.selectCell(cell);
    }
    if(this.isPanelOpenStillage) {
      this.drawingElement(cell);
    } 
    if(this.isSelectTypeRowStillage) {
      this.selectTypeRowStillage(cell);
    }
    if(cell.isBraceHor || cell.isBraceVer) {
      this.isChoiceProperties = true;
      this.stillageRowName = cell.rowName;
    }
  }

  whatIsIt(cell: StillageItem) {
    this.isSelectedElement = false;
    this.isSelectedRowStillages = false;
    this.isSelectedStillage = false;
    if(cell.element && !cell.imageUrl) {
      this.currentCell = cell;
      this.isSelectedElement = true;
      this.isSelectedRowStillages = false;
      this.isSelectedStillage = false;
    }
    if((cell.isBraceHor || cell.isBraceVer) && cell.imageUrl) {
      this.currentCell = cell;
      this.isSelectedElement = false;
      this.isSelectedRowStillages = true;
      this.isSelectedStillage = false;
    }
    if(cell.isHor || cell.isVer) {
      this.currentCell = cell;
      this.isSelectedElement = false;
      this.isSelectedRowStillages = false;
      this.isSelectedStillage = true;
    }
  }

  selectTypeRowStillage(cell: StillageItem) {
    if(!cell.isBusy) {
      if(this.isHor1Stillage) {
        if(!cell.isStillageRowWithOutNameVer && !this.tab_map[cell.y][cell.x + 1].isBusy && !this.tab_map[cell.y][cell.x + 2].isBusy) {
          cell.imageUrl = this.imageUrlHor1;
          cell.isBraceHor = true;
          for(var i: number = 1; i < this.x_width - cell.x - 1; i++) {
            if(cell.x + i + 1 < this.x_width) { 
              if( this.tab_map[cell.y][cell.x + i + 1].element || 
                  this.tab_map[cell.y][cell.x + i + 1].isStillageRowWithOutNameVer || 
                  this.tab_map[cell.y][cell.x + i + 1].isStillageRowWithOutNameHor || 
                  this.tab_map[cell.y][cell.x + i + 1].isVer || 
                  this.tab_map[cell.y][cell.x + i + 1].isHor || 
                  this.tab_map[cell.y][cell.x + i + 1].isBraceHor ||
                  this.tab_map[cell.y][cell.x + i + 1].isBraceVer) {
                break;
              }
              else {
                this.tab_map[cell.y][cell.x + i].isStillageRowWithOutNameHor = true;

                if(cell.y + 2 < this.y_height) {
                  this.tab_map[cell.y + 2][cell.x + i].isBusy = true;
                }
                if(cell.y - 2 >= 0) {
                  this.tab_map[cell.y - 2][cell.x + i].isBusy = true;
                }
                if(cell.y + 1 >= this.y_height) {
                  this.tab_map[cell.y - 1][cell.x].isBusy = true;
                  this.tab_map[cell.y - 1][cell.x + i].isBusy = true;
                }
                if(cell.y - 1 < 0) {
                  this.tab_map[cell.y + 1][cell.x].isBusy = true;
                  this.tab_map[cell.y + 1][cell.x + i].isBusy = true;
                }
              }
            }
          }
          this.tab_map[cell.y][cell.x].isBusy = true;
          if(cell.x - 1 >= 0) {
            this.tab_map[cell.y][cell.x - 1].isBusy = true;
            if(cell.y - 1 >= 0) {
              this.tab_map[cell.y - 1][cell.x - 1].isBusy = true;
              if(cell.y - 2 >= 0) {
                this.tab_map[cell.y - 2][cell.x - 1].isBusy = true;
              }
            }
            if(cell.y + 1 < this.y_height) {
              this.tab_map[cell.y + 1][cell.x - 1].isBusy = true;
              if(cell.y + 2 < this.y_height) {
                this.tab_map[cell.y + 2][cell.x - 1].isBusy = true;
              }
            }
            if(cell.x - 2 >= 0) {
              this.tab_map[cell.y][cell.x - 2].isBusy = true;
              if(cell.y - 1 >= 0) {
                this.tab_map[cell.y - 1][cell.x - 2].isBusy = true;
                if(cell.y - 2 >= 0) {
                  this.tab_map[cell.y - 2][cell.x - 2].isBusy = true;
                }
              }
              if(cell.y + 1 < this.y_height) {
                this.tab_map[cell.y + 1][cell.x - 2].isBusy = true;
                if(cell.y + 2 < this.y_height) {
                  this.tab_map[cell.y + 2][cell.x - 2].isBusy = true;
                }
              }
            }
          }
          if(cell.x + 1 < this.x_width) {
            this.tab_map[cell.y][cell.x + 1].isBusy = true;
            if(cell.x + 2 < this.x_width) {
              this.tab_map[cell.y][cell.x + 2].isBusy = true;
            }
          }
          if(cell.y + 2 < this.y_height) {
            this.tab_map[cell.y + 2][cell.x].isBusy = true;
          }
          if(cell.y - 2 >= 0) {
            this.tab_map[cell.y - 2][cell.x].isBusy = true;
          }
        }
      }
      if(this.isVer1Stillage) {
        if(!cell.isStillageRowWithOutNameHor && !this.tab_map[cell.y + 1][cell.x].isBusy && !this.tab_map[cell.y + 2][cell.x].isBusy) {
          cell.imageUrl = this.imageUrlVer1;
          cell.isBraceVer = true;
          for(var i: number = 1; i < this.y_height - cell.y - 1; i++) {
            if(cell.y + i + 1 < this.y_height) {
              if( this.tab_map[cell.y + i + 1][cell.x].element || 
                  this.tab_map[cell.y + i + 1][cell.x].isStillageRowWithOutNameVer || 
                  this.tab_map[cell.y + i + 1][cell.x].isStillageRowWithOutNameHor || 
                  this.tab_map[cell.y + i + 1][cell.x].isVer || 
                  this.tab_map[cell.y + i + 1][cell.x].isHor || 
                  this.tab_map[cell.y + i + 1][cell.x].isBraceHor ||
                  this.tab_map[cell.y + i + 1][cell.x].isBraceVer) {  
                break;
              } 
              else {
                this.tab_map[cell.y + i][cell.x].isStillageRowWithOutNameVer = true;

                if(cell.x + 1 < this.x_width) {
                  if(cell.y - 1 >= 0) {
                    this.tab_map[cell.y - 1][cell.x + 1].isBusy = true;
                  }
                  if(cell.y - 2 >= 0) {
                    this.tab_map[cell.y - 2][cell.x + 1].isBusy = true;
                  }
                }
                else {
                  this.tab_map[cell.y][cell.x - 1].isBusy = true;
                  this.tab_map[cell.y + i][cell.x - 1].isBusy = true;
                }
                if(cell.x + 2 < this.x_width) {
                  this.tab_map[cell.y + i][cell.x + 2].isBusy = true;
                }
                if(cell.x - 1 >= 0) {
                  if(cell.y - 1 >= 0) {
                    this.tab_map[cell.y - 1][cell.x - 1].isBusy = true;
                  }
                  if(cell.y - 2 >= 0) {
                    this.tab_map[cell.y - 2][cell.x - 1].isBusy = true;
                  }
                }
                else {
                  this.tab_map[cell.y][cell.x + 1].isBusy = true;
                  this.tab_map[cell.y + i][cell.x + 1].isBusy = true;
                }
                if(cell.x - 2 >= 0) {
                  this.tab_map[cell.y + i][cell.x - 2].isBusy = true;
                }
              }
            }
          }
          this.tab_map[cell.y][cell.x].isBusy = true;
          if(cell.y - 1 >= 0) {
            this.tab_map[cell.y - 1][cell.x].isBusy = true;
            if(cell.x - 2 >= 0) {
              this.tab_map[cell.y - 1][cell.x - 2].isBusy = true;
            }
            if(cell.x + 2 < this.x_width) {
              this.tab_map[cell.y - 1][cell.x + 2].isBusy = true;
            }
            if(cell.y - 2 >= 0) {
              this.tab_map[cell.y - 2][cell.x].isBusy = true;
              if(cell.x - 2 >= 0) {
                this.tab_map[cell.y - 2][cell.x - 2].isBusy = true;
              }
              if(cell.x + 2 < this.x_width) {
                this.tab_map[cell.y - 2][cell.x + 2].isBusy = true;
              }
            }
          }
          if(cell.y + 1 < this.y_height) {
            this.tab_map[cell.y + 1][cell.x].isBusy = true;
            if(cell.y + 1 < this.y_height) {
              this.tab_map[cell.y + 2][cell.x].isBusy = true;
            }
          }
          if(cell.x - 2 >= 0) {
            this.tab_map[cell.y][cell.x - 2].isBusy = true;
          }
          if(cell.x + 2 <= this.x_width - 1) {
            this.tab_map[cell.y][cell.x + 2].isBusy = true;
          }
        }
      }
    }
  }

  drawingElement(cell: StillageItem) {
    if(this.isChoiceStillage) {
      this.drawingStillage(cell);
    }
    if(this.selectedElement3 === 'road') {
      this.drawingRoad(cell);
    }
    if(this.selectedElement2 === 'zone_storage') {
      this.drawingZoneStorage(cell);
    }
    if(this.selectedElement3 === 'zone_unload'){
      this.drawingZoneUnload(cell);
    }
    if(this.selectedElement3 === 'zone_send'){
      this.drawingZoneSend(cell);
    }
    if(this.selectedElement3 === 'office'){
      this.drawingOffice(cell);
    }
  }

  toNameZone(cell: StillageItem) {
    if(cell.element === 'road' && !cell.imageUrl){
      this.isSelectedElement = true;
    }
    if(cell.element === 'zone_unload' || cell.element === 'zone_send' || cell.element === 'office' || cell.element === 'zone_storage'){
      if(this.isChoiceProperties) {
        if(!cell.yxName) {
          if(cell.cellName) {
           this.zoneName = cell.cellName;
          } else {
            cell.isSelectCellStillage = true;
            if(this.temp_y_first === -1 && this.temp_x_first === -1) {
              this.temp_y_first = cell.y;
              this.temp_x_first = cell.x;
            } else {
              this.temp_y_second = cell.y;
              this.temp_x_second = cell.x;
            }
          }
        } else {
          if(cell.cellName)
            this.zoneName = cell.cellName;
          if(cell.yxName) {
            var splitted = cell.yxName.split(";"); 
            var nameStillage = this.tab_map[splitted[0]][splitted[1]].cellName;
            if(nameStillage) {
              this.zoneName = nameStillage;
            }
          }
        }
      }
      this.isSelectedElement = true;
    }
  }

  drawingStillage(cell: StillageItem) {
    if(!cell.isHor && !cell.isVer && !cell.isBraceHor && !cell.isBraceVer)
      if(this.selectedElement1 === 'stellage34') {
        if(cell.isStillageRowWithOutNameHor) {
          cell.isHor = true;
          cell.element = 'hor-3-4';
          cell.isStillageOneWithOutName = true;
          cell.isBusy = true;
          this.isChanged = true;
        }
        if(cell.isStillageRowWithOutNameVer) {
          cell.isVer = true;
          cell.element = 'ver-3-4';
          cell.isStillageOneWithOutName = true;
          cell.isBusy = true;
          this.isChanged = true;
        }
      }
      if(this.selectedElement1 === 'stellage33') {
        if(cell.isStillageRowWithOutNameHor) {
          cell.isHor = true;
          cell.element = 'hor-3-3';
          cell.isStillageOneWithOutName = true;
          cell.isBusy = true;
          this.isChanged = true;
        }
        if(cell.isStillageRowWithOutNameVer) {
          cell.isVer = true;
          cell.element = 'ver-3-3';
          cell.isStillageOneWithOutName = true;
          cell.isBusy = true;
          this.isChanged = true;
        }
      }
      if(this.selectedElement1 === 'stellage32') {
        if(cell.isStillageRowWithOutNameHor) {
          cell.isHor = true;
          cell.element = 'hor-3-2';
          cell.isStillageOneWithOutName = true;
          cell.isBusy = true;
          this.isChanged = true;
        }
        if(cell.isStillageRowWithOutNameVer) {
          cell.isVer = true;
          cell.element = 'ver-3-2';
          cell.isStillageOneWithOutName = true;
          cell.isBusy = true;
          this.isChanged = true;
        }
      }
      if(this.selectedElement1 === 'stellage35') {
        if(cell.isStillageRowWithOutNameHor) {
          cell.isHor = true;
          cell.element = 'hor-3-5';
          cell.isStillageOneWithOutName = true;
          cell.isBusy = true;
          this.isChanged = true;
        }
        if(cell.isStillageRowWithOutNameVer) {
          cell.isVer = true;
          cell.element = 'ver-3-5';
          cell.isStillageOneWithOutName = true;
          cell.isBusy = true;
          this.isChanged = true;
        }
      }
      if(this.selectedElement2 === 'stellage25') {
        if(cell.isStillageRowWithOutNameHor) {
          cell.isHor = true;
          cell.element = 'hor-2-5';
          cell.isStillageOneWithOutName = true;
          cell.isBusy = true;
          this.isChanged = true;
        }
        if(cell.isStillageRowWithOutNameVer) {
          cell.isVer = true;
          cell.element = 'ver-2-5';
          cell.isStillageOneWithOutName = true;
          cell.isBusy = true;
          this.isChanged = true;
        }
      }
      if(this.selectedElement2 === 'stellage24') {
        if(cell.isStillageRowWithOutNameHor) {
          cell.isHor = true;
          cell.element = 'hor-2-4';
          cell.isStillageOneWithOutName = true;
          cell.isBusy = true;
          this.isChanged = true;
        }
        if(cell.isStillageRowWithOutNameVer) {
          cell.isVer = true;
          cell.element = 'ver-2-4';
          cell.isStillageOneWithOutName = true;
          cell.isBusy = true;
          this.isChanged = true;
        }
      }
  }

  drawingRoad(cell: StillageItem) {
    if(!cell.isHor && !cell.isVer && !cell.element) {
        cell.element = 'road';
        cell.isBusy = true;
        this.isChanged = true;
    }
  }

  drawingZoneUnload(cell: StillageItem) {
    if(!cell.isBusy)  {
        cell.element = 'zone_unload';
        cell.isBusy = true;
        this.isChanged = true;
    }
  }

  drawingZoneSend(cell: StillageItem) {
    if(!cell.isBusy)  {
        cell.element = 'zone_send';
        cell.isBusy = true;
        this.isChanged = true;
    }
  }

  drawingOffice(cell: StillageItem) {
    if(!cell.isBusy)  {
        cell.element = 'office';
        cell.isBusy = true;
        this.isChanged = true;
    }
  }

  drawingZoneStorage(cell: StillageItem) {
    if(!cell.isBusy)  {
      cell.element = 'zone_storage';
      cell.isBusy = true;
      this.isChanged = true;
    }
  }

  deleteElement(cell: StillageItem) {
    if(cell.element) {
      cell.element = '';
      cell.isBusy = false;
      cell.isStillageOneWithName = false;
    } else {
      cell.element = '';
      cell.style = '';
      cell.stillageName = '';
      cell.rowName = '';
      cell.cellName = '';
      cell.yxName = '';
      cell.imageUrl = '';
      cell.isIt = false;
      cell.isVer = false;
      cell.isHor = false;
      cell.isBusy = false;
      cell.isBraceHor = false;
      cell.isBraceVer = false;
      cell.isStillageRowWithOutNameVer = false;
      cell.isStillageRowWithOutNameHor = false;
      cell.isStillageOneWithName = false;
      cell.isStillageOneWithOutName = false;
      cell.isSelectCellStillage = false;
      
      if(cell.yxName) {
      var splitted = cell.yxName.split(";"); 
        var nameStillage = this.tab_map[splitted[0]][splitted[1]].cellName;
        if(nameStillage) {
          if(this.array_name.includes(nameStillage)) {
            const index: number = this.array_name.indexOf(nameStillage);
            if (index !== -1) {
                this.array_name.splice(index, 1);
                this.tab_map[splitted[0]][splitted[1]].cellName = '';
            } 
          }
        }
      }
    }
    this.isChanged = true;
  }

  onClickBrace(cell: StillageItem) {
    if(this.previousCell) {
      this.tab_map[this.previousCell.y][this.previousCell.x].isSelectCellStillage = false;
    }
    this.isSelectTypeRowStillage = false;
    this.isChoiceProperties = true;
    this.isChoiceStillage = false;
    this.isPanelOpenStillage = false;
    this.currentCell = cell;
    this.isSelectedElement = false;
  }

  onSaveProperty() {
    if(this.stillageRowName.length > 0) {
      if(this.currentCell) {
        this.currentCell.rowName = this.stillageRowName;
        // this.stillageRowName = '';
        this.currentCell.isStillageRowWithOutNameVer = false;
        this.currentCell.isStillageRowWithOutNameHor = false;
        this.isChanged = true;
      }
    }
    if(this.stillageName.length > 0) {
      if(this.currentCell) {
        if(this.currentCell.rowName.length > 0) {
          if(!this.array_name.includes(this.currentCell.rowName + this.stillageName)) {
            this.array_name.push(this.currentCell.rowName + this.stillageName);
            this.drawingStillageName();
            this.currentCell.isStillageOneWithName = true;
            this.tab_map[this.currentCell.y][this.currentCell.x].stillageName = this.currentCell.rowName + this.stillageName;
            this.currentCell.isStillageOneWithOutName = false;
            this.currentCell.isSelectCellStillage = false;
            this.stillageName = '';
            this.isChanged = true;
          }
          else
            this.stillageName = '';
        }
      }
    }
    this.currentCell = null;
  }

  onSavePropertyZone() {
    if(this.zoneName.length > 0) {
      if(this.temp_y_first !== -1 && this.temp_y_second !== -1 && this.temp_x_first !== -1 && this.temp_x_second !== -1) {
        this.tab_map[this.temp_y_first][this.temp_x_first].cellName = this.zoneName;
        for(var i = 0; i <= this.temp_y_second - this.temp_y_first; i++) {
          for(var j: number = 0; j <= this.temp_x_second - this.temp_x_first; j++) {
            if(i === 0 && j === 0) {
              let e = 9;
            } else {
              this.tab_map[this.temp_y_first + i][this.temp_x_first + j].yxName  = this.temp_y_first.toString() + ';' + this.temp_x_first.toString();
            } 
          }
        }
        this.tab_map[this.temp_y_first][this.temp_x_first].isSelectCellStillage = false;
        this.tab_map[this.temp_y_second][this.temp_x_second].isSelectCellStillage = false;

        this.isChanged = true;
      } else {
        if(this.currentCell.cellName) {
          this.currentCell.cellName = this.zoneName;
        } else {
          if(this.currentCell.yxName) {
            var splitted = this.currentCell.yxName.split(";"); 
            if(splitted.length > 1) {
              this.tab_map[splitted[0]][splitted[1]].cellName = this.zoneName;
            }
          }
        }
      }
    }
    this.drawingBoardZone('');
    this.temp_y_first = this.temp_y_second = this.temp_x_first = this.temp_x_second = -1;
    this.isChanged = true;
    this.zoneName = '';
    this.onCanselPropertyZone();
  }

  onCanselPropertyZone() {
    this.temp_y_first = this.temp_y_second = this.temp_x_first = this.temp_x_second = -1;
    this.tab_map.forEach(row => {
      row.forEach(element => {
        element.isSelectCellStillage = false;
      });
    });
  }

  getNameStillageRow(cell: StillageItem) {
    if(cell.isVer) {
      for(var i: number = 0; i <= cell.y; i++) { 
        if(cell.y - i >= 0)  {
          if(this.tab_map[cell.y - i][cell.x].isBraceVer) {
            if(this.tab_map[cell.y - i][cell.x].rowName) {
              this.stillageRowName = this.tab_map[cell.y - i][cell.x].rowName;
              this.isSelectCellWithRowName = true;
              break;
            } else this.isSelectCellWithRowName = false;
          }
        }
      }
    }
    if(cell.isHor) {
      for(var i: number = 0; i <= cell.x; i++) { 
        if(cell.x - i >= 0)  {
          if(this.tab_map[cell.y][cell.x - i].isBraceHor) {
            if(this.tab_map[cell.y][cell.x - i].rowName) {
              this.stillageRowName = this.tab_map[cell.y][cell.x - i].rowName;
              this.isSelectCellWithRowName = true;
              break;
            } else this.isSelectCellWithRowName = false;
          }
        }
      }
    }
  }

  selectCell(cell: StillageItem) {
    if(cell.isVer || cell.isHor) {
      if(this.previousCell) {
        this.tab_map[this.previousCell.y][this.previousCell.x].isSelectCellStillage = false;
      }
      this.previousCell = cell;
      this.currentCell = cell;
      cell.isSelectCellStillage = true;
      this.isSelectedElement = false;
      this.isChoiceStillage = false;
      this.isChoiceRoad = false;
      this.getNameStillageRow(cell);
      var splitted = cell.yxName.split(";"); 
      if(splitted.length > 1) {
        let temp = this.tab_map[splitted[0]][splitted[1]].cellName;
        this.stillageName = temp.replace(cell.rowName,'');
        if(temp) {
          if(this.array_name.includes(temp)) {
            const index: number = this.array_name.indexOf(temp);
            if (index !== -1) {
                this.array_name.splice(index, 1);
            } 
          }
        }
      }
    }
  }

  drawingStillageName() {
    if(this.currentCell.isHor) {
      if(this.currentCell.y + 1 < this.y_height) {
        if( !this.tab_map[this.currentCell.y + 1][this.currentCell.x].isVer && 
            !this.tab_map[this.currentCell.y + 1][this.currentCell.x].isHor && 
            !this.tab_map[this.currentCell.y + 1][this.currentCell.x].isStillageRowWithOutNameVer &&
            !this.tab_map[this.currentCell.y + 1][this.currentCell.x].isStillageRowWithOutNameHor) {
          this.tab_map[this.currentCell.y][this.currentCell.x].yxName = (this.currentCell.y + 1).toString() + ';' + (this.currentCell.x).toString();
          this.tab_map[this.currentCell.y + 1][this.currentCell.x].cellName = this.currentCell.rowName + this.stillageName;
        }
        else {
          if(this.currentCell.y - 1 >= 0) {
            if( !this.tab_map[this.currentCell.y - 1][this.currentCell.x].isVer && 
                !this.tab_map[this.currentCell.y - 1][this.currentCell.x].isHor && 
                !this.tab_map[this.currentCell.y - 1][this.currentCell.x].isStillageRowWithOutNameVer && 
                !this.tab_map[this.currentCell.y - 1][this.currentCell.x].isStillageRowWithOutNameHor) {
              this.tab_map[this.currentCell.y][this.currentCell.x].yxName = (this.currentCell.y - 1).toString() + ';' + (this.currentCell.x).toString();
              this.tab_map[this.currentCell.y - 1][this.currentCell.x].cellName = this.currentCell.rowName + this.stillageName;
            }
          }
        }
      } 
      else {
        if(this.currentCell.y - 1 >= 0) {
          if( !this.tab_map[this.currentCell.y - 1][this.currentCell.x].isVer && 
              !this.tab_map[this.currentCell.y - 1][this.currentCell.x].isHor && 
              !this.tab_map[this.currentCell.y - 1][this.currentCell.x].isStillageRowWithOutNameVer && 
              !this.tab_map[this.currentCell.y - 1][this.currentCell.x].isStillageRowWithOutNameHor) {
            this.tab_map[this.currentCell.y][this.currentCell.x].yxName = (this.currentCell.y - 1).toString() + ';' + (this.currentCell.x).toString();
            this.tab_map[this.currentCell.y - 1][this.currentCell.x].cellName = this.currentCell.rowName + this.stillageName;
          }
          else {
            if(this.currentCell.y + 1 < this.y_height) {
              if( !this.tab_map[this.currentCell.y + 1][this.currentCell.x].isVer && 
                  !this.tab_map[this.currentCell.y + 1][this.currentCell.x].isHor && 
                  !this.tab_map[this.currentCell.y + 1][this.currentCell.x].isStillageRowWithOutNameVer &&
                  !this.tab_map[this.currentCell.y + 1][this.currentCell.x].isStillageRowWithOutNameHor) {
                this.tab_map[this.currentCell.y][this.currentCell.x].yxName = (this.currentCell.y + 1).toString() + ';' + (this.currentCell.x).toString();
                this.tab_map[this.currentCell.y + 1][this.currentCell.x].cellName = this.currentCell.rowName + this.stillageName;
              }
            }
          }
        }
      }
    }
    if(this.currentCell.isVer) {
      if(this.currentCell.x + 1 < this.x_width) {
        if( !this.tab_map[this.currentCell.y][this.currentCell.x + 1].isVer && 
            !this.tab_map[this.currentCell.y][this.currentCell.x + 1].isHor && 
            !this.tab_map[this.currentCell.y][this.currentCell.x + 1].isStillageRowWithOutNameVer &&
            !this.tab_map[this.currentCell.y][this.currentCell.x + 1].isStillageRowWithOutNameHor) {
          this.tab_map[this.currentCell.y][this.currentCell.x].yxName = (this.currentCell.y).toString() + ';' + (this.currentCell.x + 1).toString();
          this.tab_map[this.currentCell.y][this.currentCell.x + 1].cellName = this.currentCell.rowName + this.stillageName;
        }
        else {
          if(this.currentCell.x - 1 >= 0) {
            if( !this.tab_map[this.currentCell.y][this.currentCell.x - 1].isVer && 
                !this.tab_map[this.currentCell.y][this.currentCell.x - 1].isHor && 
                !this.tab_map[this.currentCell.y][this.currentCell.x - 1].isStillageRowWithOutNameVer &&
                !this.tab_map[this.currentCell.y][this.currentCell.x - 1].isStillageRowWithOutNameHor) {
              this.tab_map[this.currentCell.y][this.currentCell.x].yxName = (this.currentCell.y).toString() + ';' + (this.currentCell.x - 1).toString();
              this.tab_map[this.currentCell.y][this.currentCell.x - 1].cellName = this.currentCell.rowName + this.stillageName;
            }
          }
        }
      } 
      else {
        if(this.currentCell.x - 1 >= 0) {
          if( !this.tab_map[this.currentCell.y][this.currentCell.x - 1].isVer && 
              !this.tab_map[this.currentCell.y][this.currentCell.x - 1].isHor && 
              !this.tab_map[this.currentCell.y][this.currentCell.x - 1].isStillageRowWithOutNameVer &&
              !this.tab_map[this.currentCell.y][this.currentCell.x - 1].isStillageRowWithOutNameHor) {
            this.tab_map[this.currentCell.y][this.currentCell.x].yxName = (this.currentCell.y).toString() + ';' + (this.currentCell.x - 1).toString();
            this.tab_map[this.currentCell.y][this.currentCell.x - 1].cellName = this.currentCell.rowName + this.stillageName;
          }
          else {
            if(this.currentCell.x + 1 < this.x_width) {
              if( !this.tab_map[this.currentCell.y][this.currentCell.x + 1].isVer && 
                  !this.tab_map[this.currentCell.y][this.currentCell.x + 1].isHor && 
                  !this.tab_map[this.currentCell.y][this.currentCell.x + 1].isStillageRowWithOutNameVer &&
                  !this.tab_map[this.currentCell.y][this.currentCell.x + 1].isStillageRowWithOutNameHor) {
                this.tab_map[this.currentCell.y][this.currentCell.x].yxName = (this.currentCell.y).toString() + ';' + (this.currentCell.x + 1).toString();
                this.tab_map[this.currentCell.y][this.currentCell.x + 1].cellName = this.currentCell.rowName + this.stillageName;
              }
            }
          }
        }
      }
    }
    this.isChanged = true;
  }

  onSave() {
    this.wmsMapService.postData(this.tab_map).subscribe(response =>  { 
      if(response) {
        this.isChanged = false;
       }
    },
    error => {
      console.log(error);
      alert("Сервер не отвечает.");
     }
    );
  }

  onCancel() {
    this.ngOnInit();
  }

  drawingBoardZone(element: string) {
    if(this.temp_x_second === this.temp_x_first) {
      this.tab_map[this.temp_y_first][this.temp_x_first].style = 's-left-top-right';
      for(var i = 1; i < this.temp_y_second - this.temp_y_first; i++) { 
        this.tab_map[this.temp_y_first + i][this.temp_x_first].style = 's-left-right';
      }
      this.tab_map[this.temp_y_second][this.temp_x_first].style = 's-left-bottom-right';
    }
    if(this.temp_y_second === this.temp_y_first) {
      this.tab_map[this.temp_y_first][this.temp_x_first].style = 's-left-bottom-top';
      for(var i = 1; i < this.temp_x_second - this.temp_x_first; i++) { 
        this.tab_map[this.temp_y_first][this.temp_x_first + i].style = 's-bottom-top';
      }
      this.tab_map[this.temp_y_first][this.temp_x_second].style = 's-right-bottom-top';
    }
    if(this.temp_y_second !== this.temp_y_first && this.temp_x_second !== this.temp_x_first) {
      for(var i = 1; i <= this.temp_x_second - this.temp_x_first; i++) {
        if(this.temp_x_first + i + 1 < this.x_width) {
          if(this.tab_map[this.temp_y_first][this.temp_x_first + i + 1].element) {
            this.tab_map[this.temp_y_first][this.temp_x_first + i].style = 's-top';
          } else {
            this.tab_map[this.temp_y_first][this.temp_x_first + i].style = 's-right-top';
          }
        } else {
          this.tab_map[this.temp_y_first][this.temp_x_first + i].style = 's-right-top';
        }
      }
      for(var i = 1; i <= this.temp_y_second - this.temp_y_first; i++) {
        if(this.temp_y_first + i + 1 < this.y_height) {
          if(this.tab_map[this.temp_y_first + i + 1][this.temp_x_second].element) {
            this.tab_map[this.temp_y_first + i][this.temp_x_second].style = 's-right';
          } else {
            this.tab_map[this.temp_y_first + i][this.temp_x_second].style = 's-right-bottom';
          }
        } else {
          this.tab_map[this.temp_y_first + i][this.temp_x_second].style = 's-right-bottom';
        }
      }
      for(var i = 1; i < this.temp_x_second - this.temp_x_first; i++) {
        this.tab_map[this.temp_y_second][this.temp_x_second - i].style = 's-bottom';
      }
      for(var i = 1; i <= this.temp_y_second - this.temp_y_first; i++) {
        if(this.temp_y_second - i - 1 >= 0) {
          if(this.tab_map[this.temp_y_second - i - 1][this.temp_x_first].element) {
            this.tab_map[this.temp_y_second - i][this.temp_x_first].style = 's-left';
          }
        } 
      }
      this.tab_map[this.temp_y_first][this.temp_x_first].style = 's-left-top';
      this.tab_map[this.temp_y_first][this.temp_x_second].style = 's-right-top';
      this.tab_map[this.temp_y_second][this.temp_x_second].style = 's-right-bottom';
      this.tab_map[this.temp_y_second][this.temp_x_first].style = 's-left-bottom';
    } 
  }
}
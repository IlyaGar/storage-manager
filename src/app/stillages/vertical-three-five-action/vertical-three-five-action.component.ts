import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StillageItem } from 'src/app/wms-map/models/stillage-item';
import { MatDialog } from '@angular/material/dialog';
import { StillageService } from 'src/app/common/services/stillage.service';
import { DetailViewCellComponent } from 'src/app/dialog-windows/detail-view-cell-manager/detail-view-cell/detail-view-cell.component';

export class Item{
  constructor(
    public c11: boolean,
    public c12: boolean,
    public c13: boolean,
    public c14: boolean,
    public c15: boolean,
  
    public c21: boolean,
    public c22: boolean,
    public c23: boolean,
    public c24: boolean,
    public c25: boolean,
   
    public c31: boolean,
    public c32: boolean,
    public c33: boolean,
    public c34: boolean,
    public c35: boolean,
  ){}
}

@Component({
  selector: 'app-vertical-three-five-action',
  templateUrl: './vertical-three-five-action.component.html',
  styleUrls: ['./vertical-three-five-action.component.css']
})
export class VerticalThreeFiveActionComponent implements OnInit {

  @Input() data;
  @Output() listChange = new EventEmitter<string>(); 

  stillageItem: StillageItem;
  selectCellFrom = '';
  selectCellTo= '';
  isSelectCellFrom = false;
  isSelectCellTo= false;
  selItem: Item = new Item(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false);
  listSelected: Array<string> = [];
  cellSelected: string = '';
  countClick: number;
  
  constructor(
    public dialog: MatDialog,
    private stillageService: StillageService,
  ) { 
      this.stillageService.events$.forEach(event => { 
        console.log(event); 
        this.listenEvent(event);
      });
      this.stillageService.events_click$.forEach(event => { 
        console.log(event + ' - rotation'); 
        this.listenEventClick(event);
      });
  }

  ngOnInit() {
    this.listSelected = [];
    if(this.data)
      this.stillageItem = this.data;
  }

  onClickCell(numberCell, floorCell) {
    if(this.stillageItem.stillageName) {
      this.getCellItem(numberCell, floorCell);
      this.listChange.emit(this.stillageItem.stillageName + '-' + numberCell + '-' + floorCell);
    }
      // if(this.countClick > 0) {
      //   this.countClick--;   
      //   if(this.stillageItem.stillageName) {
      //     this.getCellItem(numberCell, floorCell);
      //     this.listChange.emit(this.stillageItem.stillageName + '-' + numberCell + '-' + floorCell);
      //   }
      // }
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

  listenEvent(event: Array<string>) {
    if(this.stillageItem.stillageName === event[0]) {
      this.getCellItem(event[1], event[2]);
    }
  }

  listenEventClick(event: number) {
    this.countClick = event;
    this.stillageItem.stillageName;
  }

  getCellItem(numberCell, floorCell) {
    if(numberCell + floorCell === '11') 
      this.selItem.c11 = !this.selItem.c11;
    if(numberCell + floorCell === '12')
      this.selItem.c12 = !this.selItem.c12 ;
    if(numberCell + floorCell === '13')
      this.selItem.c13 = !this.selItem.c13;
    if(numberCell + floorCell === '14')
      this.selItem.c14 = !this.selItem.c14;
    if(numberCell + floorCell === '15')
      this.selItem.c15 = !this.selItem.c15;
    if(numberCell + floorCell === '21')
      this.selItem.c21 = !this.selItem.c21;
    if(numberCell + floorCell === '22')
      this.selItem.c22 = !this.selItem.c22;
    if(numberCell + floorCell === '23')
      this.selItem.c23 = !this.selItem.c23;
    if(numberCell + floorCell === '24')
      this.selItem.c24 = !this.selItem.c24;
    if(numberCell + floorCell === '25')
      this.selItem.c25 = !this.selItem.c25;
    if(numberCell + floorCell === '31')
      this.selItem.c31 = !this.selItem.c31;
    if(numberCell + floorCell === '32')
      this.selItem.c32 = !this.selItem.c32;
    if(numberCell + floorCell === '33')
      this.selItem.c33 = !this.selItem.c33;
    if(numberCell + floorCell === '34')
      this.selItem.c34 = !this.selItem.c34;
    if(numberCell + floorCell === '35')
      this.selItem.c35 = !this.selItem.c35;
  }
}
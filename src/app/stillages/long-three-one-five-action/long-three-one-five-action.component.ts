import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StillageItem } from 'src/app/wms-map/models/stillage-item';
import { MatDialog } from '@angular/material/dialog';
import { StillageService } from 'src/app/common/services/stillage.service';
import { DetailViewCellComponent } from 'src/app/dialog-windows/detail-view-cell-manager/detail-view-cell/detail-view-cell.component';

export class Item{
  constructor(
    public c51: boolean,
    public c52: boolean,
    public c53: boolean,
    public c41: boolean,
    public c31: boolean,
    public c21: boolean,
    public c11: boolean,
  ){}
}

@Component({
  selector: 'app-long-three-one-five-action',
  templateUrl: './long-three-one-five-action.component.html',
  styleUrls: ['./long-three-one-five-action.component.css']
})
export class LongThreeOneFiveActionComponent implements OnInit {
  
  @Input() data;
  @Output() listChange = new EventEmitter<string>(); 

  stillageItem: StillageItem;
  selectCellFrom = '';
  selectCellTo= '';
  isSelectCellFrom = false;
  isSelectCellTo= false;
  selItem: Item = new Item(false, false, false, false, false, false, false);
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
    if(numberCell + floorCell === '51') 
      this.selItem.c51 = !this.selItem.c51;
    if(numberCell + floorCell === '52')
      this.selItem.c52 = !this.selItem.c52 ;
    if(numberCell + floorCell === '53')
      this.selItem.c53 = !this.selItem.c53;
    if(numberCell + floorCell === '41')
      this.selItem.c41 = !this.selItem.c41;
    if(numberCell + floorCell === '31')
      this.selItem.c31 = !this.selItem.c31;
    if(numberCell + floorCell === '21')
      this.selItem.c21 = !this.selItem.c21;
    if(numberCell + floorCell === '11')
      this.selItem.c11 = !this.selItem.c11;
  }
}
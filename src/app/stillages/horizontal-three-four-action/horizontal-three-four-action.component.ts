import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailViewCellComponent } from 'src/app/dialog-windows/detail-view-cell-manager/detail-view-cell/detail-view-cell.component';
import { StillageItem } from 'src/app/wms-map/models/stillage-item';
import { StillageService } from 'src/app/common/services/stillage.service';

export class Item{
  constructor(
    public c11: boolean,
    public c21: boolean,
    public c31: boolean,
    public c41: boolean,
    public c51: boolean,
    
    public c12: boolean,
    public c22: boolean,
    public c32: boolean,
    public c42: boolean,
    public c52: boolean,
    
    public c13: boolean,
    public c23: boolean,
    public c33: boolean,
    public c43: boolean,
    public c53: boolean,
  ){}
}

@Component({
  selector: 'app-horizontal-three-four-action',
  templateUrl: './horizontal-three-four-action.component.html',
  styleUrls: ['./horizontal-three-four-action.component.css']
})
export class HorizontalThreeFourActionComponent implements OnInit {

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
  
  constructor(
    public dialog: MatDialog,
    private stillageService: StillageService,
  ) { 
      this.stillageService.events$.forEach(event => { 
        console.log(event); 
        this.listenEvent(event) 
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

  getCellItem(floor, number) {
    if(floor + number === '11') 
      this.selItem.c11 = !this.selItem.c11;
    if(floor + number === '21')
      this.selItem.c21 = !this.selItem.c21;
    if(floor + number === '31')
      this.selItem.c31 = !this.selItem.c31;
    if(floor + number === '41')
      this.selItem.c41 = !this.selItem.c41;
    if(floor + number === '51')
      this.selItem.c51 = !this.selItem.c51;

    if(floor + number === '12')
      this.selItem.c12 = !this.selItem.c12;
    if(floor + number === '22')
      this.selItem.c22 = !this.selItem.c22;
    if(floor + number === '32')
      this.selItem.c32 = !this.selItem.c32;
    if(floor + number === '42')
      this.selItem.c42 = !this.selItem.c42;
    if(floor + number === '52')
      this.selItem.c52 = !this.selItem.c52;

    if(floor + number === '13')
      this.selItem.c13 = !this.selItem.c13;
    if(floor + number === '23')
      this.selItem.c23 = !this.selItem.c23;
    if(floor + number === '33')
      this.selItem.c33 = !this.selItem.c33;
    if(floor + number === '43')
      this.selItem.c43 = !this.selItem.c43;
    if(floor + number === '53')
      this.selItem.c53 = !this.selItem.c53;
  }
}
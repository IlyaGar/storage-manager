import { Component, OnInit, Input } from '@angular/core';
import { StillageItem } from 'src/app/wms-map/models/stillage-item';
import { CellItemBoolean } from 'src/app/wms-map/models/cell-item-boolean';

@Component({
  selector: 'app-zona-storage',
  templateUrl: './zona-storage.component.html',
  styleUrls: ['./zona-storage.component.css']
})
export class ZonaStorageComponent implements OnInit {

  @Input() data: StillageItem;
  cellup: string = '';
  celldown: string = '';
  selItem: CellItemBoolean = new CellItemBoolean(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false);

  constructor() { }

  ngOnInit() {
    if(this.data) {
      let str = this.data.stillageName.split(';');
      this.cellup = str[0];
      this.celldown = str[1];
    }
  }

  onClickCell(number: string) {
    let n = number;
  }
}

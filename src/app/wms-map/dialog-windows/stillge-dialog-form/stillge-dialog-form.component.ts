import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WmsMapService } from '../../services/wms-map.service';
import { CellRequest } from '../../models/cell-request';
import { TokenService } from 'src/app/common/services/token.service';
import { CellAnsw } from '../../models/cell-answ';
import { SnackbarService } from 'src/app/common/services/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export interface DialogData {
  cell: string;
  stillage: string, 
  floor: string,
  num: string 
}

export class DetailCell{
  constructor(
    public num: number,
    public article: string,
    public barcode: string,
    public name: string,
    public count: string,
  ){}
}

@Component({
  selector: 'app-stillge-dialog-form',
  templateUrl: './stillge-dialog-form.component.html',
  styleUrls: ['./stillge-dialog-form.component.css']
})
export class StillgeDialogFormComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  dataCell: CellAnsw;
  detailCell: Array<DetailCell> = [];
  dataSource: MatTableDataSource<DetailCell>;
  displayedColumns: Array<string> = ['num', 'article', 'barcode', 'name', 'count'];

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  messageWrongCell= 'Ошибка сервера';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';
  
  constructor(
    private tokenService: TokenService,
    private wmsMapService: WmsMapService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<StillgeDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
    if(this.data) {
      this.wmsMapService.getCell(new CellRequest(this.tokenService.getToken(), this.data.cell)).subscribe(responce => {
        if(responce) {
          this.dataCell = responce;
          if(this.dataCell.cell === this.data.cell) {
            let i = 1;
            this.detailCell = this.dataCell.body.map(item => ({
              num: i++,
              article: item.article,
              barcode: item.barcode,
              name: item.name,
              count: item.count + ' ' + (item.mesabbrev != null ? item.mesabbrev: ''),
              // count: 12345678910 + ' ' + (item.mesabbrev != null ? item.mesabbrev: ''),
            }));
            this.dataSource = new MatTableDataSource(this.detailCell);
            this.dataSource.sort = this.sort;
          } else {
            this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.messageWrongCell);
            this.onNoClick();
          }
        }
      },
      error => { 
        console.log(error);
        this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
      });
    }
  }

  onOkClick(): void {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

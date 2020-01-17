import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TokenService } from 'src/app/common/services/token.service';
import { WmsMapService } from '../../services/wms-map.service';
import { SnackbarService } from 'src/app/common/services/snackbar.service';
import { ErrorLog } from '../../models/error-log';

@Component({
  selector: 'app-error-log-form',
  templateUrl: './error-log-form.component.html',
  styleUrls: ['./error-log-form.component.css']
})
export class ErrorLogFormComponent implements OnInit {
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  errorLogs: Array<ErrorLog> = [];
  dataSource: MatTableDataSource<ErrorLog>;
  displayedColumns: Array<string> = ['num', 'article', 'place', 'count', 'message'];
  startDate: any;
  finishDate: any;

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  messageWrongCell= 'Ошибка сервера';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';
  
  constructor(
    private tokenService: TokenService,
    private wmsMapService: WmsMapService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit() {
  }

  loadData() {
    this.wmsMapService.getErrorLog(null).subscribe(responce => {
      if(responce) {
        let i = 1;
        this.errorLogs = responce.map(item => ({
          num: i++,
          article: item.article,
          place: item.place,
          count: item.count,
          message: item.message,
        }));
        this.dataSource = new MatTableDataSource(this.errorLogs);
        this.dataSource.sort = this.sort;
      }
    },
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  onClear() {
    this.startDate = "";
    this.finishDate = "";
  }

  onSearch() {
    if(this.finishDate < this.startDate) 
      this.snackbarService.openSnackBar('Некорректные даты', this.action, this.styleNoConnect);
    else 
      this.loadData();
  }
}

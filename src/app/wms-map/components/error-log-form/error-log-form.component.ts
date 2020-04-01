import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TokenService } from 'src/app/common/services/token.service';
import { WmsMapService } from '../../services/wms-map.service';
import { SnackbarService } from 'src/app/common/services/snackbar.service';
import { ErrorLog } from '../../models/error-log';
import { ErrorLogRequest } from '../../models/error-log-request';
import { DatePipe } from '@angular/common';
import { Status } from 'src/app/common/models/status';

@Component({
  selector: 'app-error-log-form',
  templateUrl: './error-log-form.component.html',
  styleUrls: ['./error-log-form.component.css']
})
export class ErrorLogFormComponent implements OnInit {
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  errorLogs: Array<ErrorLog> = [];
  dataSource: MatTableDataSource<ErrorLog>;
  displayedColumns: Array<string> = ['article', 'err_date', 'place', 'count_e', 'message'];
  startDate: Date;
  finishDate: Date;
  myDate = new Date();

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  messageWrongCell= 'Ошибка сервера';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';
  
  constructor(
    private datePipe: DatePipe,
    private tokenService: TokenService,
    private wmsMapService: WmsMapService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit() {
    let dateNow = this.datePipe.transform(this.myDate, 'dd.MM.yyyy');
    this.loadData(new ErrorLogRequest(this.tokenService.getToken(), dateNow, ''));
  }

  loadData(errorLogRequest: ErrorLogRequest) {
    this.wmsMapService.getErrorLog(errorLogRequest).subscribe(response => {
      if(response) {
        if(this.checkResponse(response)) {
          this.errorLogs = response;
          this.dataSource = new MatTableDataSource(this.errorLogs);
          this.dataSource.sort = this.sort;
        } else this.snackbarService.openSnackBar('На текущую дату сообщений нет.', this.action);
      }
    },
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  checkResponse(response: any) : boolean {
    let t = typeof response;
    if(response as Status) {
      if(response.status === 'empty')
        return false;
      if(response.status === 'status')
        return false;
      else return true;
    } else return true;
  }

  onClear() {
    this.startDate = null;
    this.finishDate = null;
  }

  onSearch() {
    if(this.finishDate < this.startDate) 
      this.snackbarService.openSnackBar('Некорректные даты', this.action, this.styleNoConnect);
    else 
      this.loadData(new ErrorLogRequest(
        this.tokenService.getToken(), 
        this.startDate ? this.datePipe.transform(this.startDate, 'dd.MM.yyyy') : '', 
        this.finishDate ? this.datePipe.transform(this.finishDate, 'dd.MM.yyyy') : ''
        ));
  }
}

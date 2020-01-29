import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/common/services/token.service';
import { WmsMapService } from '../../services/wms-map.service';
import { SnackbarService } from 'src/app/common/services/snackbar.service';
import { HistFind } from '../../models/history-find';
import { MatTableDataSource } from '@angular/material/table';
import { HistData } from '../../models/history-data';

@Component({
  selector: 'app-cell-history-form',
  templateUrl: './cell-history-form.component.html',
  styleUrls: ['./cell-history-form.component.css']
})
export class CellHistoryFormComponent implements OnInit {

  dataSource: MatTableDataSource<HistData>;
  displayedColumns: Array<string> = ['article', 'barcode', 'name', 'place', 'count', 'history'];

  selectedSearchParameter: any = 'article';
  searchValue: string = '';


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

  loadData(article, place, worker: string) {
    this.wmsMapService.getHistory(new HistFind(this.tokenService.getToken(), article, place, worker)).subscribe(responce => {
      if(responce) {
        this.dataSource = new MatTableDataSource(responce.histdata);
      }
    },
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  onClear() {
    this.searchValue = '';
  }

  onSearch() {
    if(this.selectedSearchParameter === 'article') {
      this.loadData(this.searchValue, '', '')
    }
    if(this.selectedSearchParameter === 'place') {
      this.loadData('', this.searchValue, '')
    }
    if(this.selectedSearchParameter === 'worker') {
      this.loadData('', '', this.searchValue)
    }
  }
}

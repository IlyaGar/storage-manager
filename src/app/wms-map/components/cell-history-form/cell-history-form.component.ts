import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/common/services/token.service';
import { WmsMapService } from '../../services/wms-map.service';
import { SnackbarService } from 'src/app/common/services/snackbar.service';

@Component({
  selector: 'app-cell-history-form',
  templateUrl: './cell-history-form.component.html',
  styleUrls: ['./cell-history-form.component.css']
})
export class CellHistoryFormComponent implements OnInit {

  dataSource: any;
  displayedColumns: Array<string> = ['article', 'barcode', 'name', 'count', 'place', 'history'];

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

  loadData() {
    this.wmsMapService.getErrorLog(null).subscribe(responce => {
      if(responce) {
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
    
  }
}

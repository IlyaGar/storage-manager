import { Component, OnInit, ViewChild } from '@angular/core';
import { ProcService } from '../../services/proc.service';
import { TokenService } from 'src/app/common/services/token.service';
import { SnackbarService } from 'src/app/common/services/snackbar.service';
import { PrintAnsw } from '../../models/print-answ';
import { PrintTask } from '../../models/print-task';
import { DocBody } from '../../models/doc-body';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-doc-form',
  templateUrl: './list-doc-form.component.html',
  styleUrls: ['./list-doc-form.component.css']
})
export class ListDocFormComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  doc: PrintAnsw;
  list: Array<PrintAnsw> = [];
  docBodys: Array<DocBody> = [];
  dataSource: MatTableDataSource<DocBody>;
  docName: string = '';
  docNameSelect: string = '';
  summ: number = 0;

  displayedColumns = ['numb', 'article', 'barcode', 'count_e', 'place'];

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  constructor(
    public dialog: MatDialog,
    private procService: ProcService,
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
    // private taskCommonService: TaskCommonService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.procService.getPrintAnsw(new PrintTask(this.tokenService.getToken(), '')).subscribe(response => {
      this.checkResponse(response); 
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  checkResponse(response: any) {
    if(response.status === 'empty')
      this.snackbarService.openSnackBar('Нет документов', this.action);
    else if(response.length > 0) {
      this.list = response;
    }
  }

  onSelectDoc(element: PrintAnsw) {
    this.summ = 0;
    this.doc = element;
    this.dataSource = new MatTableDataSource(element.doc_bodys);
    this.docBodys = element.doc_bodys;
    this.docName = element.doc_name;
    this.docBodys.map(item => { this.summ += +item.count_e });
    this.dataSource.sort = this.sort;
  }
}

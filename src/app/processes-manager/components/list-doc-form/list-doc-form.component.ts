import { Component, OnInit } from '@angular/core';
import { ProcService } from '../../services/proc.service';
import { TokenService } from 'src/app/common/services/token.service';
import { SnackbarService } from 'src/app/common/services/snackbar.service';
import { PrintAnsw } from '../../models/print-answ';
import { PrintTask } from '../../models/print-task';
import { DocBody } from '../../models/doc-body';
import { MatDialog } from '@angular/material/dialog';
import { NameDocFormComponent } from '../name-doc-form/name-doc-form.component';

@Component({
  selector: 'app-list-doc-form',
  templateUrl: './list-doc-form.component.html',
  styleUrls: ['./list-doc-form.component.css']
})
export class ListDocFormComponent implements OnInit {

  doc: PrintAnsw;
  list: Array<PrintAnsw> = [];
  dataSource: Array<DocBody> = [];
  docName: string = '';
  docNameSelect: string = '';
  summ: number = 0;

  displayedColumns = ['number', 'article', 'barcode', 'count', 'place'];

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
    this.doc = element;
    this.dataSource = element.doc_bodys;
    this.docName = element.doc_name;
    this.dataSource.forEach(element => {
      this.summ = this.summ + +element.count_e;
    });
  }

  onOpenPrintForm(element: PrintAnsw) {
    const dialogRef = this.dialog.open(NameDocFormComponent, {
      width: "70vw",
      height: "85vh",
      data: { element: element, summ: this.summ },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {

      }
    });
  }
}

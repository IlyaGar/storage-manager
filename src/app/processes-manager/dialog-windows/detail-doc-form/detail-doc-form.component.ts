import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProcService } from '../../services/proc.service';
import { SnackbarService } from 'src/app/common/services/snackbar.service';
import { WDocQuery } from '../../models/w-doc-query';
import { WDocAnswer, Doctable } from '../../models/w-doc-answer';
import { MatTableDataSource } from '@angular/material/table';

export interface DataDialog {
  token: string;
  docid: string;
}

@Component({
  selector: 'app-detail-doc-form',
  templateUrl: './detail-doc-form.component.html',
  styleUrls: ['./detail-doc-form.component.css']
})
export class DetailDocFormComponent implements OnInit {

  dataSource: MatTableDataSource<Doctable>;

  wDocAnswer: WDocAnswer = new WDocAnswer('', '', '', '', '', []);
  displayedColumns = ['num', 'article', 'name', 'count', 'mes', 'goods_main', 'brak', 'place'];
  imgSource: string = '';

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  constructor(
    private procService: ProcService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<DetailDocFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog,
  ) { }

  ngOnInit() {
     this.procService.getDoc(new WDocQuery(this.data.token, this.data.docid)).subscribe(response => {
      this.checkResponse(response); 
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  checkResponse(response: any) {
    this.wDocAnswer = response;
    this.dataSource = new MatTableDataSource(this.wDocAnswer.docbody);
    this.imgSource = 'https://barcode.tec-it.com/barcode.ashx?data=' + this.wDocAnswer.docbarcode;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
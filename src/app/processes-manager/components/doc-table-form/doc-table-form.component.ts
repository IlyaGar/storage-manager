import { Component, OnInit, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { ProcService } from '../../services/proc.service';
import { TokenService } from 'src/app/common/services/token.service';
import { SnackbarService } from 'src/app/common/services/snackbar.service';
import { RequestDoc } from '../../models/request-doc';
import { AnswerDoc } from '../../models/answer-doc';
import { DetailDocFormComponent } from '../../dialog-windows/detail-doc-form/detail-doc-form.component';
import { MatDialog } from '@angular/material/dialog';

export class ListItem{
  constructor(       
    public title: string,
    public item: string,
  ){}
}

@Component({
  selector: 'app-doc-table-form',
  templateUrl: './doc-table-form.component.html',
  styleUrls: ['./doc-table-form.component.css']
})
export class DocTableFormComponent implements OnInit {

  @Input() docType: string;
  @Input() listDoc: Array<ListItem>;
  @Output() onChanged = new EventEmitter<any>(); 

  displayedColumns = ['doc', 'date', 'store', 'icon'];
  dataSource: Array<AnswerDoc>;

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';
  
  constructor(
    public dialog: MatDialog,
    private procService: ProcService,
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit() {
    switch(this.docType) {
      case 'Приходные':
        this.procService.getDocsPrihod(new RequestDoc(this.tokenService.getToken())).subscribe(response => {
          this.checkResponse(response); 
        }, 
        error => { 
          console.log(error);
          this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
        });
        break;

      case 'Заявки':
        this.procService.getDocsZpc(new RequestDoc(this.tokenService.getToken())).subscribe(response => {
          this.checkResponse(response); 
        }, 
        error => { 
          console.log(error);
          this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
        });
        break;

      case 'Перемещение':
        this.procService.getDocsPerem(new RequestDoc(this.tokenService.getToken())).subscribe(response => {
          this.checkResponse(response); 
        }, 
        error => { 
          console.log(error);
          this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
        });
        break;  
      
      case 'Возвраты':
        this.procService.getDocsVozv(new RequestDoc(this.tokenService.getToken())).subscribe(response => {
          this.checkResponse(response); 
        }, 
        error => { 
          console.log(error);
          this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
        });
      break;    
    }

  }

  checkResponse(response: Array<AnswerDoc>) {
    this.dataSource = response;
  }
  
  onClickTabItem(element: AnswerDoc) {
    this.onChanged.emit({ doc: element, type: this.docType });
  }

  openDeatilDocForm(element: AnswerDoc) {
    const dialogRef = this.dialog.open(DetailDocFormComponent, {
      width: "70vw",
      data: { token: this.tokenService.getToken(), docid: element.docid },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {

      }
    });
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }){
    let change: SimpleChange = changes['listDoc']; 
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DetailDocFormComponent } from '../detail-doc-form/detail-doc-form.component';
import { ProcService } from '../../services/proc.service';
import { RequestDoc } from '../../models/request-doc';
import { TokenService } from 'src/app/common/services/token.service';
import { SnackbarService } from 'src/app/common/services/snackbar.service';
import { AnswerDoc } from '../../models/answer-doc';

export interface DialogData {
  list: Array<ListItem>;
}

export interface EmitData {
  doc: AnswerDoc;
  type: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: string;
  highlighted?: boolean;
  hovered?: boolean;
}

export class ListItem{
  constructor(       
    public title: string,
    public item: string,
  ){}
}


@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.css']
})
export class DocListComponent implements OnInit {

  displayedColumns = ['doc', 'date', 'store', 'icon'];
  displayedListColumns = ['title'];

  dataSourcePrihod: Array<AnswerDoc> = [];
  dataSourceZpc: Array<AnswerDoc> = [];
  dataSourcePerem: Array<AnswerDoc> = [];
  dataSourceVozv: Array<AnswerDoc> = [];

  list: Array<ListItem> = [];
  selectDoc: ListItem; 

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  strPrihod: string = 'Приходные';
  strZpc: string = 'Заявки';
  strPerem: string = 'Перемещение';
  strVozv: string = 'Возвраты';

  matTab0: boolean = true;
  matTab1: boolean = false;
  matTab2: boolean = false;
  matTab3: boolean = false;

  constructor(
    public dialog: MatDialog,
    private procService: ProcService,
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<DocListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
    this.list = this.data.list;
    this.getDataSourcePrihod();
  }

  ngOnDestroy() {
    this.dataSourcePrihod.forEach(element => {
      element.highlighted = false;
    });
    this.dataSourceZpc.forEach(element => {
      element.highlighted = false;
    });
    this.dataSourcePerem.forEach(element => {
      element.highlighted = false;
    });
    this.dataSourceVozv.forEach(element => {
      element.highlighted = false;
    });
  }

  onOkClick(): void {
    this.dialogRef.close(this.list);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onClearClick(): void {
    this.clearTable(this.list[0].title);
    this.list = [];
  }

  highlight(element: PeriodicElement) {
    element.highlighted = !element.highlighted;
  }

  onClickTabItem(element: AnswerDoc, title: string) {
    element.highlighted = !element.highlighted;
    this.selectDoc = new ListItem(title, element.docid);
    let isIn = false;
    this.list.forEach(element => {
      if(JSON.stringify(element) === JSON.stringify(this.selectDoc))
        isIn = true;
    });
    if(isIn)
      this.list = this.list.filter(item => item.item !== this.selectDoc.item);
    else 
      if(this.list.length === 0) {
        this.list.push(this.selectDoc);
      } else {
        if(this.list[0].title === title) {
          if(!this.list.find(item => item.item === element.docid)) {
            this.list = this.list.concat(this.selectDoc);
          }
        } else {
          this.clearTable(this.list[0].title);
          this.list = [];
          this.list = this.list.concat(this.selectDoc);
        }
      }
  }

  onClickListItem(selectItem: ListItem) {
    if(this.list.includes(selectItem)) {
      this.list = this.list.filter(item => item !== selectItem);

      switch(selectItem.title) {
        case 'Приходные':
          this.dataSourcePrihod.forEach(element => {
            if(element.docid === selectItem.item) {
              element.highlighted = false;
            }
          });
        break;
        
        case 'Заявки':
          this.dataSourceZpc.forEach(element => {
            if(element.docid === selectItem.item) {
              element.highlighted = false;
            }
          });           
        break;
            
        case 'Перемещение':
          this.dataSourcePerem.forEach(element => {
            if(element.docid === selectItem.item) {
              element.highlighted = false;
            }
          });                
        break;
                
        case 'Возвраты':
          this.dataSourceVozv.forEach(element => {
            if(element.docid === selectItem.item) {
              element.highlighted = false;
            }
          });                    
        break;
      }

    }
  }

  clearTable(title: string) {
    if(title === 'Приходные') 
      this.setHighlightedFalse(this.dataSourcePrihod);
    if(title === 'Заявки') 
      this.setHighlightedFalse(this.dataSourceZpc);
    if(title === 'Перемещение') 
      this.setHighlightedFalse(this.dataSourcePerem);
    if(title === 'Возвраты') 
      this.setHighlightedFalse(this.dataSourceVozv);
  }

  setHighlightedFalse(arr: any) {
    arr.forEach(element => {
      if(element.highlighted)
        element.highlighted = !element.highlighted;
    });
  }

  openDeatilDocForm(element: AnswerDoc) {
    const dialogRef = this.dialog.open(DetailDocFormComponent, {
      width: "70vw",
      height: "85vh",
      data: { token: this.tokenService.getToken(), docid: element.docid },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {

      }
    });
  }

  onChanged(data: EmitData){
    data.doc.highlighted = !data.doc.highlighted;
    this.selectDoc = new ListItem(data.type, data.doc.docid);
    let isIn = false;
    this.list.forEach(element => {
      if(JSON.stringify(element) === JSON.stringify(this.selectDoc))
        isIn = true;
    });
    if(isIn)
      this.list = this.list.filter(item => item.item !== this.selectDoc.item);
    else 
      if(this.list.length === 0) {
        this.list.push(this.selectDoc);
      } else {
        if(this.list[0].title === data.type) {
          if(!this.list.find(item => item.item === data.doc.docid)) {
            this.list = this.list.concat(this.selectDoc);
          }
        } else {
          this.clearTable(this.list[0].title);
          this.list = [];
          this.list = this.list.concat(this.selectDoc);
        }
      }
  }

  onClickTab($event) {
    switch($event.index) {
      case 0:
        if(!this.matTab0) {
          this.getDataSourcePerem();
          this.matTab1 = true;
        }
        break;

      case 1:
        if(!this.matTab1) {
          this.getDataSourceZpc();
          this.matTab1 = true;
        }
        break;

      case 2:
        if(!this.matTab2) {
          this.getDataSourcePerem();
          this.matTab1 = true;
        }      
        break;
        
      case 3:
        if(!this.matTab3) {
          this.getDataSourceVozv();
          this.matTab1 = true;
        } 
        break;
    }
  }

  getDataSourcePrihod() {
    this.procService.getDocsPrihod(new RequestDoc(this.tokenService.getToken())).subscribe(response => {
      this.dataSourcePrihod = response;
      this.deleteZero(this.dataSourcePrihod);
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  getDataSourceZpc() {
    this.procService.getDocsZpc(new RequestDoc(this.tokenService.getToken())).subscribe(response => {
      this.dataSourceZpc = response; 
      this.deleteZero(this.dataSourceZpc);
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  getDataSourcePerem() {
    this.procService.getDocsPerem(new RequestDoc(this.tokenService.getToken())).subscribe(response => {
      this.dataSourcePerem = response;
      this.deleteZero(this.dataSourcePerem);
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  getDataSourceVozv() {
    this.procService.getDocsVozv(new RequestDoc(this.tokenService.getToken())).subscribe(response => {
      this.dataSourceVozv = response;
      this.deleteZero(this.dataSourceVozv);
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  checkResponse(response: Array<AnswerDoc>) {
    // this.dataSource = response;
  }

  deleteZero(list: Array<AnswerDoc>) {
    list.forEach(element => {
      element.docdate = element.docdate.split(' ')[0];
    });
  }
} 
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DetailDocFormComponent } from '../detail-doc-form/detail-doc-form.component';
import { ProcService } from '../../services/proc.service';
import { RequestDoc } from '../../models/request-doc';
import { TokenService } from 'src/app/common/services/token.service';
import { SnackbarService } from 'src/app/common/services/snackbar.service';
import { AnswerDoc } from '../../models/answer-doc';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export interface DialogData {
  list: Array<ListItem>;
}

export interface EmitData {
  doc: AnswerDoc;
  type: string;
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

  @ViewChild('sortPrihod', {static: true}) sortPrihod: MatSort;
  @ViewChild('sortZpc', {static: true}) sortZpc: MatSort;
  @ViewChild('sortPerem', {static: true}) sortPerem: MatSort;
  @ViewChild('sortVozv', {static: true}) sortVozv: MatSort;
  
  displayedColumns = ['doclabel', 'docid', 'docdate', 'docloc', 'icon'];
  displayedListColumns = ['title'];

  dataSourcePrihod: MatTableDataSource<AnswerDoc>;
  dataSourceZpc: MatTableDataSource<AnswerDoc>;
  dataSourcePerem: MatTableDataSource<AnswerDoc>;
  dataSourceVozv: MatTableDataSource<AnswerDoc>;

  dataSource: Array<AnswerDoc> = [];
  filterArray: Array<AnswerDoc> = [];

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
    this.list =JSON.parse(JSON.stringify(this.data.list))
    this.getDataSourcePrihod();
  }

  ngOnDestroy() {
    this.list = [];
    this.data.list = [];
    if(this.dataSourcePrihod)
      if(this.dataSourcePrihod.data.length > 0)
        this.dataSourcePrihod.data.forEach(element => {
          element.highlighted = false;
        });
    if(this.dataSourceZpc)
      if(this.dataSourceZpc.data.length > 0)
        this.dataSourceZpc.data.forEach(element => {
          element.highlighted = false;
        });
    if(this.dataSourcePerem)
      if(this.dataSourcePerem.data.length > 0)
        this.dataSourcePerem.data.forEach(element => {
          element.highlighted = false;
        });
    if(this.dataSourceVozv)
      if(this.dataSourceVozv.data.length > 0)
        this.dataSourceVozv.data.forEach(element => {
          element.highlighted = false;
        });
  }

  onOkClick(): void {
    this.dialogRef.close(this.list);
  }

  onCancelClick(): void {
    this.list = [];
    this.data.list = [];
    this.dialogRef.close();
  }

  onClearClick(): void {
    this.clearTable(this.list[0].title);
    this.list = [];
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
          if(this.dataSourcePrihod.data.length > 0)
          this.dataSourcePrihod.data.forEach(element => {
            if(element.docid === selectItem.item) {
              element.highlighted = false;
            }
          });
        break;
        
        case 'Заявки':
          if(this.dataSourceZpc.data.length > 0)
          this.dataSourceZpc.data.forEach(element => {
            if(element.docid === selectItem.item) {
              element.highlighted = false;
            }
          });           
        break;
            
        case 'Перемещение':
          if(this.dataSourcePerem.data.length > 0)
          this.dataSourcePerem.data.forEach(element => {
            if(element.docid === selectItem.item) {
              element.highlighted = false;
            }
          });                
        break;
                
        case 'Возвраты':
          if(this.dataSourceVozv.data.length > 0)
          this.dataSourceVozv.data.forEach(element => {
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

  setHighlightedFalse(dataSource: any) {
    if(dataSource)
      if(dataSource.data.length > 0)
        dataSource.data.forEach(element => {
          if(element.highlighted)
            element.highlighted = !element.highlighted;
        });
  }

  openDeatilDocForm(element: AnswerDoc) {
    const dialogRef = this.dialog.open(DetailDocFormComponent, {
      width: "70vw",
      height: "86vh",
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
      this.dataSourcePrihod = new MatTableDataSource(response);
      this.deleteZero(this.dataSourcePrihod.data);
      this.dataSourcePrihod.sort = this.sortPrihod;
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  getDataSourceZpc() {
    this.procService.getDocsZpc(new RequestDoc(this.tokenService.getToken())).subscribe(response => {
      this.dataSourceZpc = new MatTableDataSource(response); 
      this.deleteZero(this.dataSourceZpc.data);
      this.dataSourceZpc.sort = this.sortZpc;
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  getDataSourcePerem() {
    this.procService.getDocsPerem(new RequestDoc(this.tokenService.getToken())).subscribe(response => {
      this.dataSourcePerem = new MatTableDataSource(response);
      this.deleteZero(this.dataSourcePerem.data);
      this.dataSourcePerem.sort = this.sortPerem;
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  getDataSourceVozv() {
    this.procService.getDocsVozv(new RequestDoc(this.tokenService.getToken())).subscribe(response => {
      this.dataSourceVozv = new MatTableDataSource(response);
      this.deleteZero(this.dataSourceVozv.data);
      this.dataSourceVozv.sort = this.sortVozv;
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  deleteZero(list: Array<AnswerDoc>) {
    if(list.length > 0)
      list.forEach(element => {
        element.docdate = element.docdate.split(' ')[0];
      });
  }

  applyFilterPrihod(filterValue: string) {
    if(this.dataSource.length < this.dataSourcePrihod.data.length)
      this.dataSource = this.dataSourcePrihod.data;

    let arrStr = filterValue.split(' ');
    if(arrStr.length > 1) {
      if(this.dataSource.length > this.dataSourcePrihod.data.length) {
        this.filterArray = this.dataSource.filter(item => arrStr.includes(item.docid)).map(item => ({ docid: item.docid, docdate: item.docdate, docloc: item.docloc, doclabel: item.doclabel }));
      } else {
        this.filterArray = this.dataSourcePrihod.data.filter(item => arrStr.includes(item.docid)).map(item => ({ docid: item.docid, docdate: item.docdate, docloc: item.docloc, doclabel: item.doclabel }));
      }
      this.dataSourcePrihod.data = this.filterArray;
    } else {
      if(this.dataSource.length > this.dataSourcePrihod.data.length)
        this.dataSourcePrihod.data = this.dataSource;

      this.dataSourcePrihod.filter = filterValue.trim().toLowerCase();

      if (this.dataSourcePrihod.paginator) {
        this.dataSourcePrihod.paginator.firstPage();
      }
    }
  }

  applyFilterZpc(filterValue: string) {
    if(this.dataSource.length < this.dataSourceZpc.data.length)
      this.dataSource = this.dataSourceZpc.data;

    let arrStr = filterValue.split(' ');
    if(arrStr.length > 1) {
      if(this.dataSource.length > this.dataSourceZpc.data.length) {
        this.filterArray = this.dataSource.filter(item => arrStr.includes(item.docid)).map(item => ({ docid: item.docid, docdate: item.docdate, docloc: item.docloc, doclabel: item.doclabel }));
      } else {
        this.filterArray = this.dataSourceZpc.data.filter(item => arrStr.includes(item.docid)).map(item => ({ docid: item.docid, docdate: item.docdate, docloc: item.docloc, doclabel: item.doclabel }));
      }
      this.dataSourceZpc.data = this.filterArray;
    } else {
      if(this.dataSource.length > this.dataSourceZpc.data.length)
        this.dataSourceZpc.data = this.dataSource;

      this.dataSourceZpc.filter = filterValue.trim().toLowerCase();

      if (this.dataSourceZpc.paginator) {
        this.dataSourceZpc.paginator.firstPage();
      }
    }
  }

  applyFilterPerem(filterValue: string) {
    if(this.dataSource.length < this.dataSourcePerem.data.length)
      this.dataSource = this.dataSourcePerem.data;

    let arrStr = filterValue.split(' ');
    if(arrStr.length > 1) {
      if(this.dataSource.length > this.dataSourcePerem.data.length) {
        this.filterArray = this.dataSource.filter(item => arrStr.includes(item.docid)).map(item => ({ docid: item.docid, docdate: item.docdate, docloc: item.docloc, doclabel: item.doclabel }));
      } else {
        this.filterArray = this.dataSourcePerem.data.filter(item => arrStr.includes(item.docid)).map(item => ({ docid: item.docid, docdate: item.docdate, docloc: item.docloc, doclabel: item.doclabel }));
      }
      this.dataSourcePerem.data = this.filterArray;
    } else {
      if(this.dataSource.length > this.dataSourcePerem.data.length)
        this.dataSourcePerem.data = this.dataSource;

      this.dataSourcePerem.filter = filterValue.trim().toLowerCase();

      if (this.dataSourcePerem.paginator) {
        this.dataSourcePerem.paginator.firstPage();
      }
    }
  }

  applyFilterVozv(filterValue: string) {
    if(this.dataSource.length < this.dataSourceVozv.data.length)
      this.dataSource = this.dataSourceVozv.data;

    let arrStr = filterValue.split(' ');
    if(arrStr.length > 1) {
      this.filterArray = this.dataSourceVozv.data.filter(item => arrStr.includes(item.docid)).map(item => ({ docid: item.docid, docdate: item.docdate, docloc: item.docloc, doclabel: item.doclabel }));

      this.dataSourceVozv.data = this.filterArray;
    } else {
      if(this.dataSource.length > this.dataSourceVozv.data.length)
        this.dataSourceVozv.data = this.dataSource;

      this.dataSourceVozv.filter = filterValue.trim().toLowerCase();

      if (this.dataSourceVozv.paginator) {
        this.dataSourceVozv.paginator.firstPage();
      }
    }
  }
} 
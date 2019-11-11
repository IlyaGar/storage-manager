import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DetailDocFormComponent } from '../detail-doc-form/detail-doc-form.component';
import { ProcService } from '../../services/proc.service';
import { RequestDoc } from '../../models/request-doc';
import { TokenService } from 'src/app/common/services/token.service';
import { SnackbarService } from 'src/app/common/services/snackbar.service';
import { AnswerDoc } from '../../models/answer-doc';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';

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

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: '20.02.2019', symbol: 'H'},
  {position: 2, name: 'Helium', weight: '4.0026', symbol: 'He'},
  {position: 3, name: 'Lithium', weight: '6.941', symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: '9.0122', symbol: 'Be'},
  {position: 5, name: 'Boron', weight: '10.811', symbol: 'B'},
  {position: 6, name: 'Carbon', weight: '12.0107', symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: '14.0067', symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: '15.9994', symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: '18.9984', symbol: 'F'},
  {position: 10, name: 'Neon', weight: '20.1797', symbol: 'Ne'},
];
const ELEMENT_DATA1: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: '20.02.2019', symbol: 'H'},
  {position: 2, name: 'Helium', weight: '4.0026', symbol: 'He'},
  {position: 3, name: 'Lithium', weight: '6.941', symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: '9.0122', symbol: 'Be'},
  {position: 5, name: 'Boron', weight: '10.811', symbol: 'B'},
  {position: 6, name: 'Carbon', weight: '12.0107', symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: '14.0067', symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: '15.9994', symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: '18.9984', symbol: 'F'},
  {position: 10, name: 'Neon', weight: '20.1797', symbol: 'Ne'},
];
const ELEMENT_DATA2: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: '20.02.2019', symbol: 'H'},
  {position: 2, name: 'Helium', weight: '4.0026', symbol: 'He'},
  {position: 3, name: 'Lithium', weight: '6.941', symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: '9.0122', symbol: 'Be'},
  {position: 5, name: 'Boron', weight: '10.811', symbol: 'B'},
  {position: 6, name: 'Carbon', weight: '12.0107', symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: '14.0067', symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: '15.9994', symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: '18.9984', symbol: 'F'},
  {position: 10, name: 'Neon', weight: '20.1797', symbol: 'Ne'},
];
const ELEMENT_DATA3: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: '20.02.2019', symbol: 'H'},
  {position: 2, name: 'Helium', weight: '4.0026', symbol: 'He'},
  {position: 3, name: 'Lithium', weight: '6.941', symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: '9.0122', symbol: 'Be'},
  {position: 5, name: 'Boron', weight: '10.811', symbol: 'B'},
  {position: 6, name: 'Carbon', weight: '12.0107', symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: '14.0067', symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: '15.9994', symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: '18.9984', symbol: 'F'},
  {position: 10, name: 'Neon', weight: '20.1797', symbol: 'Ne'},
];

@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.css']
})
export class DocListComponent implements OnInit {

  displayedColumns = ['doc', 'date', 'store', 'icon'];
  displayedListColumns = ['title'];
  dataSource: Array<AnswerDoc> = [];
  dataSource1: Array<PeriodicElement> = [];
  dataSource2: Array<PeriodicElement> = [];
  dataSource3: Array<PeriodicElement> = [];
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
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    // this.dataSource = ELEMENT_DATA;
    this.dataSource1 = ELEMENT_DATA1;
    this.dataSource2 = ELEMENT_DATA2;
    this.dataSource3 = ELEMENT_DATA3;

    // this.procService.getDocsPerem(new RequestDoc(this.tokenService.getToken())).subscribe(response => {
    //   this.checkResponse(response); 
    // }, 
    // error => { 
    //   console.log(error);
    //   this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    // });
  }

  checkResponse(response: Array<AnswerDoc>) {
    this.dataSource = response;
  }

  ngOnDestroy() {
    this.dataSource1.forEach(element => {
      element.highlighted = false;
    });
    this.dataSource2.forEach(element => {
      element.highlighted = false;
    });
    this.dataSource3.forEach(element => {
      element.highlighted = false;
    });
    this.dataSource.forEach(element => {
      element.highlighted = false;
    });
  }

  onOkClick(): void {
    var list: Array<string> = [];
    this.list.forEach(element => {
      list = list.concat(element.item);
    });
    this.dialogRef.close(list);
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

      this.dataSource.forEach(element => {
        if(element.docid === selectItem.item) {
          element.highlighted = false;
        }
      });
    }
  }

  clearTable(title: string) {
    if(title === 'Приходные') 
      this.setHighlightedFalse(this.dataSource);
    if(title === 'Заявки') 
      this.setHighlightedFalse(this.dataSource1);
    if(title === 'Перемещение') 
      this.setHighlightedFalse(this.dataSource2);
    if(title === 'Возвраты') 
      this.setHighlightedFalse(this.dataSource3);
  }

  setHighlightedFalse(arr: any) {
    arr.forEach(element => {
      if(element.highlighted)
        element.highlighted = !element.highlighted;
    });
  }

  openDeatilDocForm() {
    const dialogRef = this.dialog.open(DetailDocFormComponent, {
      width: "70vw",
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
    let e = $event.index;
    switch($event.index) {
      case 0:
        this.matTab0 = true;
        break;

      case 0:
        this.matTab1 = true;
        break;

      case 0:
        this.matTab2 = true;
        break;
        
      case 0:
        this.matTab3 = true;
        break;
    }
  }
} 
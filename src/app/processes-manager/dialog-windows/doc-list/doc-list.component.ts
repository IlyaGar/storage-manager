import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: string;
  highlighted?: boolean;
  hovered?: boolean;
}

export interface ListItem {
  title: string;
  item: string;
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

  displayedColumns = ['doc', 'date', 'icon'];
  displayedListColumns = ['title'];
  dataSource: Array<PeriodicElement> = [];
  dataSource1: Array<PeriodicElement> = [];
  dataSource2: Array<PeriodicElement> = [];
  dataSource3: Array<PeriodicElement> = [];
  list: Array<ListItem> = [];

  constructor(
    public dialogRef: MatDialogRef<DocListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.dataSource = ELEMENT_DATA;
    this.dataSource1 = ELEMENT_DATA1;
    this.dataSource2 = ELEMENT_DATA2;
    this.dataSource3 = ELEMENT_DATA3;
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
    this.list = [];
  }

  highlight(element: PeriodicElement) {
    element.highlighted = !element.highlighted;
  }

  onClickTabItem(element: PeriodicElement, title: string) {
    element.highlighted = true;
    if(this.list.length === 0) {
      this.list.push({ title: title, item: element.name });
    } else {
      if(this.list[0].title === title) {
        if(!this.list.find(item => item.item === element.name)) {
          this.list = this.list.concat({ title: title, item: element.name });
        }
      } else {
        this.clearTable(this.list[0].title);
        this.list = [];
        this.list = this.list.concat({ title: title, item: element.name });
      }
    }
  }

  onClickListItem(element: any) {
    if(this.list.includes(element)) {
      this.list = this.list.filter(item => item !== element);
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

  setHighlightedFalse(arr: Array<PeriodicElement>) {
    arr.forEach(element => {
      if(element.highlighted)
        element.highlighted = !element.highlighted;
    });
  }
} 
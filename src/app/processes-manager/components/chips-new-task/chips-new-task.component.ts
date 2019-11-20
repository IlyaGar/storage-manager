import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatDialog } from '@angular/material/dialog';
import { DocListComponent } from 'src/app/processes-manager/dialog-windows/doc-list/doc-list.component';

export class ListItem{
  constructor(       
    public title: string,
    public item: string,
  ){}
}

@Component({
  selector: 'app-chips-new-task',
  templateUrl: './chips-new-task.component.html',
  styleUrls: ['./chips-new-task.component.css']
})
export class ChipsNewTaskComponent implements OnInit {

  @Output() onDataSelected: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();
  
  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  list: Array<string> = [];
  listItem: Array<ListItem> = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.list.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.onDataSelected.emit(this.list);
  }

  remove(doc: string): void {
    const index = this.list.indexOf(doc);
    if (index >= 0) {
      this.list.splice(index, 1);
    }
    this.listItem = this.listItem.filter(item => item.item !== doc);
  }

  openDocList() {
    const dialogRef = this.dialog.open(DocListComponent, {
      width: '80vw',
      height: '85vh',
      data: { list: this.listItem },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.listItem = result;
        this.list = [];
        result.forEach(element => {
          this.list = this.list.concat(element.item);
        });
        this.onDataSelected.emit(this.list);
      }
    });
  }
}

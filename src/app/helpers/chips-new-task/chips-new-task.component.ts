import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatDialog } from '@angular/material/dialog';
import { DocListComponent } from 'src/app/processes-manager/dialog-windows/doc-list/doc-list.component';

@Component({
  selector: 'app-chips-new-task',
  templateUrl: './chips-new-task.component.html',
  styleUrls: ['./chips-new-task.component.css']
})
export class ChipsNewTaskComponent implements OnInit {

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
  // list: Docs[] = [];
  list: Array<string> = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.list.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(doc: string): void {
    const index = this.list.indexOf(doc);

    if (index >= 0) {
      this.list.splice(index, 1);
    }
  }

  openDocList() {
    const dialogRef = this.dialog.open(DocListComponent, {
      width: '70vw',
      height: '70vh',
      data: {  },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.list = this.list.concat(result);
      }
    });
  }
}

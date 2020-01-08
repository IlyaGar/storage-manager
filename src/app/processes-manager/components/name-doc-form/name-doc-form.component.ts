import { Component, OnInit, Inject } from '@angular/core';
import { PrintAnsw } from '../../models/print-answ';
import { DocBody } from '../../models/doc-body';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DataDialog {
  element: PrintAnsw;
  summ: number;
}

@Component({
  selector: 'app-name-doc-form',
  templateUrl: './name-doc-form.component.html',
  styleUrls: ['./name-doc-form.component.css']
})
export class NameDocFormComponent implements OnInit {

  dataSource: Array<DocBody> = [];
  displayedColumns = ['number', 'article', 'barcode', 'count', 'place'];

  constructor(
    public dialogRef: MatDialogRef<NameDocFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialog,
  ) { }

  ngOnInit() {
    this.dataSource = this.data.element.doc_bodys;
  }
}

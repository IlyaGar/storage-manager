import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-storage-places',
  templateUrl: './storage-places.component.html',
  styleUrls: ['./storage-places.component.css']
})
export class StoragePlacesComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StoragePlacesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

}

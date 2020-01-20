import { Component, OnInit, Inject } from '@angular/core';
import { TokenService } from 'src/app/common/services/token.service';
import { ProductService } from '../../services/product.service';
import { SnackbarService } from 'src/app/common/services/snackbar.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData{
  productList: Array<Array<string>>,
  placeList: Array<string>,
}

export interface DataPlace{
  num: number,
  place: string,
  count: string,
}

@Component({
  selector: 'app-place-list-form',
  templateUrl: './place-list-form.component.html',
  styleUrls: ['./place-list-form.component.css']
})
export class PlaceListFormComponent implements OnInit {

  displayedColumnsProducts = ['article', 'name', 'status', 'barcode', 'balancestore', 'balancedefect'];
  displayedColumnsPlaces = ['num', 'place', 'count'];
  dataPlace: Array<DataPlace> = [];

  constructor(
    private tokenService: TokenService,
    private productService: ProductService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<PlaceListFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
    this.data.placeList;
    let i = 1;
    this.dataPlace = this.data.placeList.map(item => ({
      num: i++,
      place: item.split(' | ')[0],
      count: item.split(' | ')[1],
    }));
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}

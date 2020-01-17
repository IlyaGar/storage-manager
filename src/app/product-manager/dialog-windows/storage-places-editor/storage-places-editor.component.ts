import { Component, OnInit, Inject } from '@angular/core';
import { TokenService } from 'src/app/common/services/token.service';
import { SnackbarService } from 'src/app/common/services/snackbar.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { StoreEditor } from '../../models/store-editor';

export interface DialogData {
  article: string;
  place: string, 
  count: string,
  units: string,
}

@Component({
  selector: 'app-storage-places-editor',
  templateUrl: './storage-places-editor.component.html',
  styleUrls: ['./storage-places-editor.component.css']
})
export class StoragePlacesEditorComponent implements OnInit {

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  messageWrongCell= 'Ошибка сервера';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  constructor(
    private tokenService: TokenService,
    private productService: ProductService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<StoragePlacesEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
    this.data;
  }

  onEdit() {
    this.productService.getProductProp(new StoreEditor(this.tokenService.getToken(), this.data.article, this.data.place, '')).subscribe(response => {
      if(response) {

      }
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}

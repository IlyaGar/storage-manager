import { Component, OnInit, Inject } from '@angular/core';
import { TokenService } from 'src/app/common/services/token.service';
import { SnackbarService } from 'src/app/common/services/snackbar.service';
import { PersonalService } from '../../services/personal.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  user: string;
}

@Component({
  selector: 'app-print-badge-form',
  templateUrl: './print-badge-form.component.html',
  styleUrls: ['./print-badge-form.component.css']
})
export class PrintBadgeFormComponent implements OnInit {

  imgSource: string = '';

  constructor(
    public dialogRef: MatDialogRef<PrintBadgeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
    this.imgSource = 'https://barcode.tec-it.com/barcode.ashx?data=' + 'U:' + this.data.user;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}

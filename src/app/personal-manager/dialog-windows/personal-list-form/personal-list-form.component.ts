import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenService } from 'src/app/common/services/token.service';
import { PersonalService } from '../../services/personal.service';
import { DownList } from 'src/app/product-manager/models/down-list';
import { MatTableDataSource } from '@angular/material/table';
import { UGroup } from '../../models/u-group';
import { SnackbarService } from 'src/app/common/services/snackbar.service';

@Component({
  selector: 'app-personal-list-form',
  templateUrl: './personal-list-form.component.html',
  styleUrls: ['./personal-list-form.component.css']
})
export class PersonalListFormComponent implements OnInit {

  dataSource: MatTableDataSource<UGroup>;
  selectItem: number;
  selectName: string;
  displayedColumns = ['name'];

  constructor(
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
    private personalService: PersonalService,
    public dialogRef: MatDialogRef<PersonalListFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.personalService.getUsersWithoutGroup(new DownList(this.tokenService.getToken())).subscribe(response => {
      this.checkResponse(response); 
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar('Нет соединения, попробуйте позже', 'Ok');
    });
  }

  checkResponse(response: Array<UGroup>) {
    this.dataSource = new MatTableDataSource(response);
  }

  onSelectRow(i: number, row: UGroup) {
    if(this.selectItem !== i) {
      this.selectName = row.login;
      this.selectItem = i;
    } else {
      this.selectName = '';
      this.selectItem = null;
    } 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

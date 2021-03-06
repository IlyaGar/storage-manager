import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UGroup } from 'src/app/personal-manager/models/u-group';
import { TokenService } from 'src/app/common/services/token.service';
import { SnackbarService } from 'src/app/common/services/snackbar.service';
import { PersonalService } from 'src/app/personal-manager/services/personal.service';
import { SelectGroupFormComponent } from '../select-group-form/select-group-form.component';
import { DownList } from 'src/app/product-manager/models/down-list';

@Component({
  selector: 'app-select-user-form',
  templateUrl: './select-user-form.component.html',
  styleUrls: ['./select-user-form.component.css']
})
export class SelectUserFormComponent implements OnInit {

  usersSource: Array<UGroup>;
  selectLogin: string = '';
  displayedColumnsGrop = ['index', 'login', 'group'];

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  constructor(
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
    private personalService: PersonalService,
    public dialogRef: MatDialogRef<SelectGroupFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.personalService.getUsersInGroup(new DownList(this.tokenService.getToken())).subscribe(response => {
      this.usersSource = response; 
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  onSelectRow(item: UGroup) {
    this.selectLogin = item.login;
  }

  onOkClick(): void {
    this.dialogRef.close(this.selectLogin);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onClearClick() {
    this.selectLogin = '';
  }
}

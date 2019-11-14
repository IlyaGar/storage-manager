import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenService } from 'src/app/common/services/token.service';
import { SnackbarService } from 'src/app/common/services/snackbar.service';
import { PersonalService } from 'src/app/personal-manager/services/personal.service';
import { DownList } from 'src/app/product-manager/models/down-list';
import { UGroup } from 'src/app/personal-manager/models/u-group';

export interface DialogData {
  token: string,
  group: string,
}

@Component({
  selector: 'app-users-in-group-form',
  templateUrl: './users-in-group-form.component.html',
  styleUrls: ['./users-in-group-form.component.css']
})
export class UsersInGroupFormComponent implements OnInit {

  usersSource: Array<UGroup>;
  listUsers: Array<UGroup> = [];
  displayedColumnsGrop = ['index', 'login'];

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  constructor( 
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
    private personalService: PersonalService,
    public dialogRef: MatDialogRef<UsersInGroupFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.personalService.getUsersInGroup(new DownList(this.data.token)).subscribe(response => {
      this.usersSource = response.filter(el => el.groupname === this.data.group);
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }
  
  onCancelClick(): void {
    this.dialogRef.close();
  }
}

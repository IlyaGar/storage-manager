import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TokenService } from 'src/app/common/services/token.service';
import { SnackbarService } from 'src/app/common/services/snackbar.service';
import { PersonalService } from 'src/app/personal-manager/services/personal.service';
import { DownList } from 'src/app/product-manager/models/down-list';
import { GroupList } from 'src/app/personal-manager/models/group-list';
import { UsersInGroupFormComponent } from '../users-in-group-form/users-in-group-form.component';

@Component({
  selector: 'app-select-group-form',
  templateUrl: './select-group-form.component.html',
  styleUrls: ['./select-group-form.component.css']
})
export class SelectGroupFormComponent implements OnInit {
  
  groupsSource: Array<GroupList>;
  selectGroup: string = '';
  displayedColumnsGrop = ['index', 'name', 'rights', 'icon'];

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
    private personalService: PersonalService,
    public dialogRef: MatDialogRef<SelectGroupFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups() {
    this.personalService.getGroups(new DownList(this.tokenService.getToken())).subscribe(response => {
      this.groupsSource = response; 
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  onSelectRow(item: GroupList) {
    this.selectGroup = item.name;
  }

  onOkClick(): void {
    this.dialogRef.close(this.selectGroup);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onClearClick() {
    this.selectGroup = '';
  }

  onOpenDeatilDocForm(element: GroupList) {
    const dialogRef = this.dialog.open(UsersInGroupFormComponent, {
      width: "50vw",
      height: "60vh",
      data: { token: this.tokenService.getToken(), group: element.name },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
      }
    });
  }
}

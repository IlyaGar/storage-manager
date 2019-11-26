import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonalListFormComponent } from '../../dialog-windows/personal-list-form/personal-list-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { PersonalService } from '../../services/personal.service';
import { TokenService } from 'src/app/common/services/token.service';
import { DownList } from 'src/app/product-manager/models/down-list';
import { UGroup } from '../../models/u-group';
import { ActionUser } from '../../models/action-user';
import { GroupList } from '../../models/group-list';
import { SnackbarService } from 'src/app/common/services/snackbar.service';
import { PrintBadgeFormComponent } from '../../dialog-windows/print-badge-form/print-badge-form.component';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {

  displayedColumns: string[] = ['name', 'group', 'action'];
  dataSource: MatTableDataSource<UGroup>;
  selectItem: number;
  name: string;
  groupid: string;
  groups: Array<GroupList>;

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
    private personalService: PersonalService,
  ) { }

  ngOnInit() {
    this.loadUsers();
    this.loadGroups();
  }

  loadUsers() {
    this.personalService.getAllUsers(new DownList(this.tokenService.getToken())).subscribe(response => {
      this.checkResponse(response); 
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  checkResponse(response: Array<UGroup>) {
    this.dataSource = new MatTableDataSource(response);
  }

  checkResponseAction(response) {
    if(response.status === 'user in group error') {
      this.snackbarService.openSnackBar('Пользователь уже в группе!', this.action, this.styleNoConnect);
    }
    if(response.status === 'True') {
      this.loadUsers();
    }
    if(response.status === 'False') {
      this.loadUsers();
    }
  }

  onCreateUser() {
    this.personalService.addUserInGroup(new ActionUser(this.tokenService.getToken(), this.name, this.groupid)).subscribe(response => {
      this.checkResponseAction(response); 
    }, 
    error => { 
      console.log(error);
    });
  }

  openPersonalListDialog() {
    const dialogRef = this.dialog.open(PersonalListFormComponent, { });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.name = result;
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSelectRow(i) {
    if(this.selectItem !== i)
      this.selectItem = i;
    else
      this.selectItem = null;
  }

  loadGroups() {
    this.personalService.getGroups(new DownList(this.tokenService.getToken())).subscribe(response => {
      this.groups = response; 
    }, 
    error => { 
      console.log(error);
    });
  }

  onRemoveGroup(user: UGroup) {
    this.personalService.deleteGroupByUser(new ActionUser(this.tokenService.getToken(), user.login, user.groupid)).subscribe(response => {
      this.checkResponseAction(response); 
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  onDeleteUser(element: UGroup) {
 
  }

  onPrintBadge(element: UGroup) {
    const dialogRef = this.dialog.open(PrintBadgeFormComponent, {
      data: { user: element.login, },
      // width: "360px"
     });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.name = result;
      }
    });
  }
}

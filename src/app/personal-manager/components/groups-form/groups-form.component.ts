import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditGroupFormComponent } from '../../dialog-windows/edit-group-form/edit-group-form.component';
import { SkladGroup } from '../../models/sklad-group';
import { PersonalService } from '../../services/personal.service';
import { TokenService } from 'src/app/common/services/token.service';
import { DownList } from 'src/app/product-manager/models/down-list';
import { GroupList } from '../../models/group-list';
import { ESkladGroup } from '../../models/e-sklad-group';
import { DSkladGroup } from '../../models/d-sklad-group';
import { SnackbarService } from 'src/app/common/services/snackbar.service';

@Component({
  selector: 'app-groups-form',
  templateUrl: './groups-form.component.html',
  styleUrls: ['./groups-form.component.css']
})
export class GroupsFormComponent implements OnInit {

  skladGroup: SkladGroup = new SkladGroup('', '', false, false, false);
  selectItem: number;
  displayedColumnsGrop = ['name', 'rights', 'menu'];
  dataSource: MatTableDataSource<GroupList>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isGroupCreated: boolean = false;

  constructor(
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
    private personalService: PersonalService,
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.loadGroup();
  }

  loadGroup() {
    this.isGroupCreated = false;
    this.personalService.getGroups(new DownList(this.tokenService.getToken())).subscribe(response => {
      this.checkResponseList(response); 
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar('Нет соединения, попробуйте позже', 'Ok');
    });
  }

  checkResponseList(response: Array<GroupList>) {
    this.dataSource = new MatTableDataSource(response);
  }

  onSelectRow(i) {
    if(this.selectItem !== i)
      this.selectItem = i;
    else
      this.selectItem = null;
  }

  onCreateGroup() {
    this.skladGroup.token = this.tokenService.getToken();
    this.personalService.createGroup(this.skladGroup).subscribe(response => {
      this.checkResponseCreateGroup(response);
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar('Нет соединения, попробуйте позже', 'Ok');
    });
  }
  
  checkResponseActionGroup(response) {
    if(response.status === 'True') {
      this.loadGroup();
    }
  }

  checkResponseCreateGroup(response) {
    if(response.status === 'True') {
      this.isGroupCreated = true;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onOpenEditGroupForm(group) {
    const dialogRef = this.dialog.open(EditGroupFormComponent, {
      data: { group: group },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.personalService.editGroup(new ESkladGroup(
          this.tokenService.getToken(), 
          result.id, 
          result.name, 
          result.root_order, 
          result.root_sklad, 
          result.root_user)).subscribe(response => {
            this.checkResponseActionGroup(response);
        }, 
        error => { 
          console.log(error);
          this.snackbarService.openSnackBar('Нет соединения, попробуйте позже', 'Ok');
        });
      }
    });
  }

  onDelete(group) {
    this.personalService.deletGroup(new DSkladGroup(this.tokenService.getToken(), group.id)).subscribe(response => {
      this.checkResponseActionGroup(response);
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar('Нет соединения, попробуйте позже', 'Ok');
    });
  }

  onClickGroup(event) {
    this.loadGroup();
  }
}
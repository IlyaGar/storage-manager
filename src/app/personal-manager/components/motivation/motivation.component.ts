import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { TokenService } from 'src/app/common/services/token.service';
import { SnackbarService } from 'src/app/common/services/snackbar.service';
import { PersonalService } from '../../services/personal.service';
import { MatTableDataSource } from '@angular/material/table';
import { MotiveFind } from '../../models/motivation-find';
import { DatePipe } from '@angular/common';
import { MotiveAnsw } from '../../models/motivation-answer';
import { MatDialog } from '@angular/material/dialog';
import { MotinateSumPositionFormComponent } from '../../dialog-windows/motinate-sum-position-form/motinate-sum-position-form.component';

@Component({
  selector: 'app-motivation',
  templateUrl: './motivation.component.html',
  styleUrls: ['./motivation.component.css']
})
export class MotivationComponent implements OnInit {

  @ViewChild('btSearch', { read: ElementRef, static: false }) btSearch: ElementRef; 
  
  dataSource: MatTableDataSource<MotiveAnsw>;
  displayedColumns = ['user', 'motivation'];
  
  startDate: any;
  finishDate: any;
  startDateForDialog: any;
  finishDateForDialog: any;
  searchValue: string = '';

  myControl = new FormControl();
  options: string[] = ['Все'];
  filteredOptions: Observable<string[]>;

  mtOtbor: number = 0;  // Отборка
  mtPriem: number = 0;  // Приемка
  mtImport: number = 0; // Импорт
  mtRotac: number = 0;  // Ротация

  disabledValue = true;
  btSearchDisabled = false;
  
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
  }

  loadUsers() {
    this.personalService.getUsers('list').subscribe(responce => {
      if(responce) {
        this.options = this.options.concat(responce);
        this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      }
    },
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  loadData(startDate: string, finishDate: string, user: string) {
    this.personalService.getMotivation(new MotiveFind(this.tokenService.getToken(), startDate, finishDate, user)).subscribe(responce => {
      if(responce) {
        this.dataSource = new MatTableDataSource(responce);
        this.setButtonSearchAble();
      }
    },
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  onSearch() {
    this.startDateForDialog = this.startDate;
    this.finishDateForDialog = this.finishDate;
    this.setButtonSearchDisable();
    if(this.myControl.value === 'Все')
      this.loadData(this.transform(this.startDate), this.transform(this.finishDate), '');
    else this.loadData(this.transform(this.startDate), this.transform(this.finishDate), this.myControl.value);
  }

  onClear() {
    this.startDate = '';
    this.finishDate = '';
    this.startDateForDialog = '';
    this.finishDateForDialog = '';
    this.searchValue = '';
    this.setButtonSearchAble();
    this.dataSource = new MatTableDataSource();
  }
  
  transform(value: string): string {
    var datePipe = new DatePipe("en-US");
    return datePipe.transform(value, 'dd.MM.yyyy');
  }
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  setButtonSearchDisable() {
    this.btSearchDisabled = true; 
    this.btSearch.nativeElement.disable = true;
  }

  setButtonSearchAble() {
    this.btSearchDisabled = false;
    this.btSearch.nativeElement.disable = false;
  }

  onCalculatePositions(data: Array<MotiveAnsw>) {
    this.mtOtbor = 0;  
    this.mtPriem = 0;   
    this.mtImport = 0; 
    this.mtRotac = 0;  

    data.forEach(element => {
      element.mt.forEach(elementMotive => {
        switch(elementMotive.type_name) {

          case 'Отборка':
            this.mtOtbor += +elementMotive.count_pos;
            break;
            
          case 'Приемка':
            this.mtPriem += +elementMotive.count_pos;
            break;

          case 'Импорт':
            this.mtImport += +elementMotive.count_pos;
            break;

          case 'Ротация':
            this.mtRotac += +elementMotive.count_pos;
            break;
        }
      });
    });

    this.openMotivateSumPositionForm();
  }

  openMotivateSumPositionForm() {
    const dialogRef = this.dialog.open(MotinateSumPositionFormComponent, {
      width: "300px",
      data: { startDate: this.startDateForDialog, finishDate: this.finishDateForDialog, mtOtbor: this.mtOtbor, mtPriem:this.mtPriem, mtImport: this.mtImport, mtRotac: this.mtRotac }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.mtOtbor = 0;  
      this.mtPriem = 0;   
      this.mtImport = 0;  
      this.mtRotac = 0;  
    });
  }
}

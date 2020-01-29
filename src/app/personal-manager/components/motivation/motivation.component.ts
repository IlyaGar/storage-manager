import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-motivation',
  templateUrl: './motivation.component.html',
  styleUrls: ['./motivation.component.css']
})
export class MotivationComponent implements OnInit {

  dataSource: MatTableDataSource<MotiveAnsw>;
  displayedColumns = ['user', 'motivation'];
  
  startDate: any;
  finishDate: any;
  searchValue: string = '';

  myControl = new FormControl();
  options: string[] = ['Все'];
  filteredOptions: Observable<string[]>;
  
  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  constructor(
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
      }
    },
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  onSearch() {
    if(this.myControl.value === 'Все')
      this.loadData(this.transform(this.startDate), this.transform(this.finishDate), '');
    else this.loadData(this.transform(this.startDate), this.transform(this.finishDate), this.myControl.value);
  }

  onClear() {
    this.startDate = '';
    this.finishDate = '';
    this.searchValue = '';

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
}

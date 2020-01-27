import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-motivation',
  templateUrl: './motivation.component.html',
  styleUrls: ['./motivation.component.css']
})
export class MotivationComponent implements OnInit {

  startDate: any;
  finishDate: any;

  searchValue: string = '';
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  
  constructor() { }

  ngOnInit() {
  }

  onSearch() {

  }

  onClear() {
    
  }
}

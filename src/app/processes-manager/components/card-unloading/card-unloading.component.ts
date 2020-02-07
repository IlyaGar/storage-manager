import { Component, OnInit, Input } from '@angular/core';
import { CardData } from '../../models/doc-unloading/card-data';

@Component({
  selector: 'app-card-unloading',
  templateUrl: './card-unloading.component.html',
  styleUrls: ['./card-unloading.component.css']
})
export class CardUnloadingComponent implements OnInit {

  @Input() data: CardData;
  
  constructor() { }

  ngOnInit() {
    if(!this.data) {
      this.data = new CardData('-', [''], 0);
    }
  }
}
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProcService } from '../../services/proc.service';
import { TokenService } from 'src/app/common/services/token.service';
import { SnackbarService } from 'src/app/common/services/snackbar.service';
import { RazgReq } from '../../models/doc-unloading/raz-request';
import { RazgAnswer } from '../../models/doc-unloading/razg-answer';
import { ProblemList } from '../../models/doc-unloading/problem-list';
import { MatTableDataSource } from '@angular/material/table';
import { CardData } from '../../models/doc-unloading/card-data';
import { MatSort } from '@angular/material/sort';
import { NPCBody } from '../../models/doc-unloading/npc-body';
import { ZPCBody } from '../../models/doc-unloading/zpc-body';

@Component({
  selector: 'app-document-unloading-form',
  templateUrl: './document-unloading-form.component.html',
  styleUrls: ['./document-unloading-form.component.css']
})
export class DocumentUnloadingFormComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedPcColumns = ['npc', 'zpc'];
  displayedCurrentPcColumns = ['article', 'name', 'count', 'count_main', 'count_braq', 'place'];
  displayedColumns = ['doc_num', 'article', 'name', 'count', 'mesabbrev', 'ost_main', 'ost_braq', 'count_export', 'place'];
  dataSource: MatTableDataSource<ProblemList>;

  listNpc: Array<NPCBody> = [];
  listZpc: Array<ZPCBody> = [];

  searchNpc: string = '';
  searchZpc: string = '';

  cardSend: CardData;
  cardPart: CardData;
  cardNotData: CardData;

  arrNpc: Array<string> = [];
  arrZpc: Array<string> = [];

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  constructor(
    private procService: ProcService,
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit() {
    // this.cardSend = { title: "Отправлено", list: ['NPC123', 'NPC234', 'NPC345', 'NPC123', 'NPC234', 'NPC345'], count: 6 };
  }

  loadData(arrNpc: Array<string>, arrZpc: Array<string>) {
    this.procService.getDocUnloading(new RazgReq(this.tokenService.getToken(), arrNpc, arrZpc)).subscribe(response => {
      this.checkResponse(response); 
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  checkResponse(response: RazgAnswer) {
    this.dataSource = new MatTableDataSource(response.BadSent);
    this.dataSource.sort = this.sort;
    this.listNpc = response.NPCList;
    this.listZpc = response.ZPCList;
    this.cardSend = new CardData("Отправлено", response.Completely, response.CompletelyCount);
    this.cardPart = new CardData("Частично", response.Partially, response.PartiallyCount);
    this.cardNotData = new CardData("Нет данных", response.NotSent, response.NotSentCount);
  }

  onSearch() {
    let arrNpc = this.getArrayString(this.searchNpc);
    let arrZpc = this.getArrayString(this.searchZpc);
    if(arrNpc.length > 0 || arrZpc.length > 0) {
      this.loadData(arrNpc, arrZpc);
    }
  }

  getArrayString(searchValue: string) : Array<string> {
    if(searchValue.length > 0) {
      searchValue = searchValue.replace(/\W/g, ' ');
      let arr = searchValue.split(' '); 
      arr = arr.filter(Boolean);
      return arr;
    } 
    else return [];
  }

  onClear() {
    this.searchNpc = '';
    this.searchZpc = '';
  }
}

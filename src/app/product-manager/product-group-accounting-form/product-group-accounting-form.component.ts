import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { ProductService } from '../services/product.service';
import { DownList } from '../models/down-list';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { ProductQuery } from '../models/product-query';
import { ProductProp } from '../models/product-prop';
import { ProductPropAnswer } from '../models/product-prop-answer';
import { MatDialog } from '@angular/material/dialog';
import { AttentionFormComponent } from 'src/app/dialog-windows/attention-dialog/attention-form/attention-form.component';
import { StoragePlacesComponent } from 'src/app/dialog-windows/storage-places-manager/storage-places/storage-places.component';
import { PrintLableFormComponent } from '../dialog-windows/print-lable-form/print-lable-form.component';
import { SnackbarService } from 'src/app/common/services/snackbar.service';

interface PoductNode {
  id: string;
  name: string;
  children?: PoductNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  id: string;
  name: string;
  level: number;
}

@Component({
  selector: 'app-product-group-accounting-form',
  templateUrl: './product-group-accounting-form.component.html',
  styleUrls: ['./product-group-accounting-form.component.css']
})
export class ProductGroupAccountingFormComponent implements OnInit {

  group: string = '';
  selectedRowTree: string = '';
  selectedRowIndex: string = '';
  searchValue: string = '';
  selectedSearchVar: any = 'article';
  productPropAnswer: ProductPropAnswer = new ProductPropAnswer('', '', '', '', '', '', '', '');
  displayedColumnsProducts = ['article', 'name', 'status', 'barcode', 'balancestore', 'balancedefect', 'action'];
  displayedColumnsPlaces = ['place', 'bt'];
  displayedColumnsDelivers = ['delivers'];
  treeData: any;
  dataSourceProducts: Array<Array<string>> = [];
  tempDataSourceProducts: Array<Array<string>> = [];
  listPlaces: Array<string> = [];
  listDelivers: Array<string> = [];
  isEmptySearchValue = false;
  private nameCookie = environment.cookieName;
  countListProducts: number = 0;
  scrollPosition = 8000;
  curentPositionTable = 200;
  isLoading: any;
  
  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  private _transformer = (node: PoductNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      id: node.id,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    public dialog: MatDialog,
    private cookieService: CookieService,
    private productService: ProductService,
    private snackbarService: SnackbarService,) { }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  
  ngOnInit() {
    this.productService.getList(new DownList(this.getToken(this.nameCookie))).subscribe(response => {
      this.checkResponseList(response); 
    }, 
    error => { 
      console.log(error);
      this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
    });
  }

  checkResponseList(response) {
    if(response) {
      this.dataSource.data = response;
    }
  }

  onSelectNode(node) {
    this.clearProp();
    this.selectedRowTree = node.id;
    this.group = node.name.split(" ")[0];
    if(this.group) {
      this.dataSourceProducts = [];
      this.scrollPosition = 8000;
      this.productService.getProducts(new ProductQuery(this.getToken(this.nameCookie), this.group, '', '', '', '', '', '')).subscribe(response => {
        this.checkResponseProduct(response); 
      }, 
      error => { 
        console.log(error);
      });
    }
  }

  checkResponseProduct(response) {
    if(response) {
      this.dataSourceProducts = this.dataSourceProducts.concat(response);
      this.countListProducts = this.dataSourceProducts.length;
    }
  }

  checkResponseProductSearch(response) {
    if(response) {
      this.dataSourceProducts = response;
      this.countListProducts = this.dataSourceProducts.length;

      let t = this.dataSourceProducts[0];
      this.onSelectRowClick(this.dataSourceProducts[0]);
    }
  }

  checkResponseProductProp(response) {
    if(response) {
      this.listPlaces = [];
      this.listDelivers = [];
      this.productPropAnswer = response;    
      if(this.productPropAnswer.places) {
        var splitPlace = this.productPropAnswer.places.split("; ");
        splitPlace.forEach(element => {
          this.listPlaces.push(element);
        }); 
      }
      if(this.productPropAnswer.delivers) {
        var splitDelivers = this.productPropAnswer.delivers.split("; ");
        splitDelivers.forEach(element => {
          this.listDelivers.push(element);
        });
      }
      if(this.listPlaces[this.listPlaces.length - 1].length == 0) {
        this.listPlaces.pop();
      }
      if(this.listDelivers[this.listDelivers.length - 1].length == 0) {
        this.listDelivers.pop();
      }
    }
  }

  onSearch() {
    this.clearProp();
    if(this.searchValue) {
      this.scrollPosition = 8000;
      this.group = '';
      this.dataSourceProducts = [];
      console.log(this.searchValue);
      this.isEmptySearchValue = false;
      if(this.selectedSearchVar === 'article') {
        this.productService.getProducts(new ProductQuery(this.getToken(this.nameCookie), '', this.searchValue, '', '', '', '', '')).subscribe(response => {
          this.checkResponseProductSearch(response); 
        }, 
        error => { 
          console.log(error);
        });
      }
      if(this.selectedSearchVar === 'name') {
        this.productService.getProducts(new ProductQuery(this.getToken(this.nameCookie), '', '', this.searchValue, '', '', '', '')).subscribe(response => {
          this.checkResponseProductSearch(response); 
        }, 
        error => { 
          console.log(error);
        });
      }
      if(this.selectedSearchVar === 'barcode') {
        this.productService.getProducts(new ProductQuery(this.getToken(this.nameCookie), '', '', '', this.searchValue, '', '', '')).subscribe(response => {
          this.checkResponseProductSearch(response); 
        }, 
        error => { 
          console.log(error);
        });
      }
      if(this.selectedSearchVar === 'storage') {
        this.productService.getProducts(new ProductQuery(this.getToken(this.nameCookie), '', '', '', '', this.searchValue, '', '')).subscribe(response => {
          this.checkResponseProductSearch(response); 
        }, 
        error => { 
          console.log(error);
        });
      }
      if(this.selectedSearchVar === 'provider') {
        this.productService.getProducts(new ProductQuery(this.getToken(this.nameCookie), '', '', '', '', '', this.searchValue, '')).subscribe(response => {
          this.checkResponseProductSearch(response); 
        }, 
        error => { 
          console.log(error);
        });
      }
    } else {
      this.isEmptySearchValue = true;
    }
  }

  onClear() {
    this.isEmptySearchValue = false;
    this.searchValue = '';
    this.selectedSearchVar = 'article';
  }

  onKeyuoSearchInput(event: KeyboardEvent) {
    if(event.keyCode == 13) {
      this.onSearch();
    } else {
      this.isEmptySearchValue = false;
    }
  }

  onSelectRowClick(row: Array<string>) {
    if(row[0]) {
      this.selectedRowIndex = row[0];
      this.productService.getProductProp(new ProductProp(this.getToken(this.nameCookie), row[0])).subscribe(response => {
        this.checkResponseProductProp(response); 
      }, 
      error => { 
        console.log(error);
      });
    }
  }

  onScroll(event) {
    if(event.target.scrollTop > this.scrollPosition) {
      this.scrollPosition += 8000;
      var pos = this.countListProducts + 200;
      if(pos % 200 == 0) {
        if(this.group) {
          this.productService.getProducts(new ProductQuery(this.getToken(this.nameCookie), this.group, '', '', '', '', '', pos.toString())).subscribe(response => {
            this.checkResponseProduct(response); 
          }, 
          error => { 
            console.log(error);
          });
        }
        if(this.selectedSearchVar === 'article') {
          this.productService.getProducts(new ProductQuery(this.getToken(this.nameCookie), '', this.searchValue, '', '', '', '', pos.toString())).subscribe(response => {
            this.checkResponseProduct(response); 
          }, 
          error => { 
            console.log(error);
          });
        }
        if(this.selectedSearchVar === 'name') {
          this.productService.getProducts(new ProductQuery(this.getToken(this.nameCookie), '', '', this.searchValue, '', '', '', pos.toString())).subscribe(response => {
            this.checkResponseProduct(response); 
          }, 
          error => { 
            console.log(error);
          });
        }
        if(this.selectedSearchVar === 'barcode') {
          this.productService.getProducts(new ProductQuery(this.getToken(this.nameCookie), '', '', '', this.searchValue, '', '', pos.toString())).subscribe(response => {
            this.checkResponseProduct(response); 
          }, 
          error => { 
            console.log(error);
          });
        }
        if(this.selectedSearchVar === 'storage') {
          this.productService.getProducts(new ProductQuery(this.getToken(this.nameCookie), '', '', '', '', this.searchValue, '', pos.toString())).subscribe(response => {
            this.checkResponseProduct(response); 
          }, 
          error => { 
            console.log(error);
          });
        }
        if(this.selectedSearchVar === 'provider') {
          this.productService.getProducts(new ProductQuery(this.getToken(this.nameCookie), '', '', '', '', '', this.searchValue, pos.toString())).subscribe(response => {
            this.checkResponseProduct(response); 
          }, 
          error => { 
            console.log(error);
          });
        }
      }
    }
  }

  openAttentionDialog(status: string) {
    const dialogRef = this.dialog.open(AttentionFormComponent, {
      data: {status: status},
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

  openStoragePlacesDialog(element: string) {
    const dialogRef = this.dialog.open(StoragePlacesComponent, {
      data: {status: status},
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

  getToken(nameCookie: string) {
    if(this.cookieService.check(nameCookie)){
      let fullData = this.cookieService.get(nameCookie);
      let loginFromCookie = JSON.parse(fullData);
      if(loginFromCookie){
        return loginFromCookie.token
      }
    }
    else return false;
  }

  onPrintLable(element) {
    const dialogRef = this.dialog.open(PrintLableFormComponent, {
      // data: { user: element.login, },
      // width: "360px"
     });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
      }
    });
  }

  clearProp() {
    this.productPropAnswer = new ProductPropAnswer('', '', '', '', '', '', '', '');
    this.listPlaces = [];
    this.listDelivers = [];
  }
}
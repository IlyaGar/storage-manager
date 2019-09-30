import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DownList } from '../models/down-list';
import { Observable } from 'rxjs';
import { ProductQuery } from '../models/product-query';
import { ProductProp } from '../models/product-prop';
import { ProductPropAnswer } from '../models/product-prop-answer';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private urlList = environment.apiUrl + "wms/tree/";
  private urlProduct = environment.apiUrl + "wms/product/";
  private urlProductProp = environment.apiUrl + "wms/product/prop/"

  constructor(private http: HttpClient) { }

  getList(token: DownList): Observable<any> {
    // const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    // return this.http.post<any>(`${this.url}`, token,  { headers, responseType: 'text' as 'json'});

    return this.http.post<any>(`${this.urlList}`, token);
  }

  getProducts(data: ProductQuery): Observable<any> {
    return this.http.post<any>(`${this.urlProduct}`, data);
  }

  getProductProp(data: ProductProp): Observable<ProductPropAnswer> {
    return this.http.post<ProductPropAnswer>(`${this.urlProductProp}`, data);
  }
}

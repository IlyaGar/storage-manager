import { Injectable } from '@angular/core';
import { DownList } from 'src/app/product-manager/models/down-list';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GroupList } from '../models/group-list';
import { SkladGroup } from '../models/sklad-group';
import { ESkladGroup } from '../models/e-sklad-group';
import { DSkladGroup } from '../models/d-sklad-group';
import { UGroup } from '../models/u-group';
import { ActionUser } from '../models/action-user';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  private url_get_group = environment.apiUrl + "wms/groupget/";
  private url_create_group = environment.apiUrl + "wms/groupadd/";
  private url_edit_group = environment.apiUrl + "wms/groupedit/";
  private url_delete_group = environment.apiUrl + "wms/groupdel/";
  private url_get_users_group = environment.apiUrl + "wms/usergroup/";
  private url_get_users_without_group = environment.apiUrl + "wms/notgroup/";
  private url_add_user_in_group = environment.apiUrl + "wms/addusergroup/";
  private url_delete_user_in_group = environment.apiUrl + "wms/removeusergroup/";

  constructor(private http: HttpClient) { }

  getGroups(data: DownList): Observable<any> {
    return this.http.post<any>(`${this.url_get_group}`, data);
  }

  createGroup(data: SkladGroup): Observable<any> {
    return this.http.post<any>(`${this.url_create_group}`, data);
  }

  editGroup(data: ESkladGroup): Observable<any> {
    return this.http.post<any>(`${this.url_edit_group}`, data);
  }

  deletGroup(data: DSkladGroup): Observable<any> {
    return this.http.post<any>(`${this.url_delete_group}`, data);
  }

  getAllUsers(data: DownList): Observable<any> {
    return this.http.post<any>(`${this.url_get_users_group}`, data);
  }

  getUsersWithoutGroup(data: DownList): Observable<any> {
    return this.http.post<any>(`${this.url_get_users_without_group}`, data);
  }

  addUserInGroup(data: ActionUser): Observable<any> {
    return this.http.post<any>(`${this.url_add_user_in_group}`, data);
  }

  deleteUserInGroup(data: ActionUser): Observable<any> {
    return this.http.post<any>(`${this.url_delete_user_in_group}`, data);
  }
}

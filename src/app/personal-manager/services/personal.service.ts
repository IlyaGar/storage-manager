import { Injectable } from '@angular/core';
import { DownList } from 'src/app/product-manager/models/down-list';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SkladGroup } from '../models/sklad-group';
import { ESkladGroup } from '../models/e-sklad-group';
import { DSkladGroup } from '../models/d-sklad-group';
import { UGroup } from '../models/u-group';
import { ActionUser } from '../models/action-user';
import { MotiveFind } from '../models/motivation-find';
import { MotiveAnsw } from '../models/motivation-answer';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  private url_get_group = environment.apiUrl + "wms/groupget/";
  private url_create_group = environment.apiUrl + "wms/groupadd/";
  private url_edit_group = environment.apiUrl + "wms/groupedit/";
  private url_delete_group = environment.apiUrl + "wms/groupdel/";
  private url_get_all_users_group = environment.apiUrl + "wms/usergroup/";
  private url_get_users_in_group = environment.apiUrl + "wms/withgroup/";
  private url_get_users_without_group = environment.apiUrl + "wms/notgroup/";
  private url_add_user_in_group = environment.apiUrl + "wms/addusergroup/";
  private url_delete_group_by_user = environment.apiUrl + "wms/removeusergroup/";
  private url_get_users = environment.apiUrl + "wms/muser/";
  private url_get_motivation = environment.apiUrl + "wms/motive/";

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

  getAllUsers(data: DownList): Observable<Array<UGroup>> {
    return this.http.post<Array<UGroup>>(`${this.url_get_all_users_group}`, data);
  }

  getUsersInGroup(data: DownList): Observable<Array<UGroup>> {
    return this.http.post<Array<UGroup>>(`${this.url_get_users_in_group}`, data);
  }

  getUsersWithoutGroup(data: DownList): Observable<Array<UGroup>> {
    return this.http.post<Array<UGroup>>(`${this.url_get_users_without_group}`, data);
  }

  addUserInGroup(data: ActionUser): Observable<any> {
    return this.http.post<any>(`${this.url_add_user_in_group}`, data);
  }

  deleteGroupByUser(data: ActionUser): Observable<any> {
    return this.http.post<any>(`${this.url_delete_group_by_user}`, data);
  }

  getUsers(data: string): Observable<any> {
    return this.http.post<any>(`${this.url_get_users}`, data);
  }

  getMotivation(data: MotiveFind): Observable<Array<MotiveAnsw>> {
    return this.http.post<Array<MotiveAnsw>>(`${this.url_get_motivation}`, data);
  }
}

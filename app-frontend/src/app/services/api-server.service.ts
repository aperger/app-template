import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {delay, last, map, merge, mergeMap, Observable, take} from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService, UserToken } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ApiServerService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public get<T>(relativeUrl: string, options? : {params?: HttpParams, headers?: HttpHeaders}): Observable<T> {
    return this.http.get<T>(relativeUrl, { headers: options?.headers, params: options?.params });
  }

  public getText(relativeUrl: string, options? : {params?: HttpParams, headers?: HttpHeaders, reponseType?:string}): Observable<string> {
    return this.http.get(relativeUrl, { headers: options?.headers, params: options?.params, responseType: 'text' });
  }

}

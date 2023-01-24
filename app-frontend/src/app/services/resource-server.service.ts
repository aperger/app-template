import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, merge, mergeMap, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService, UserToken } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ResourceServerService {

  constructor(
    private http: HttpClient, 
    private userSerive: UserService
  ) { 
  }

  public get<T>(relativeUrl: string, options? : {params?: HttpParams, headers?: HttpHeaders}): Observable<T> {
    let absoluteUrl: string;
    if (!relativeUrl.startsWith(environment.apiUrl)) {
      absoluteUrl = environment.apiUrl + relativeUrl;
    } else {
      absoluteUrl = relativeUrl;
    }

    if (this.userSerive.tokenExpired) {
      this.userSerive.fetchAccessToken();
    }
    
    return this.userSerive.token$.pipe(take(1)).pipe(
      mergeMap(p => {
      let headers: HttpHeaders = new HttpHeaders();
      if (options && options.headers) {
        options.headers.keys().forEach(k => {
          const v = options.headers?.get(k);
          if (!v) return;
          headers.append(k, v);
        });
      }
      headers = headers.delete('Authorization');
      headers = headers.append('Authorization', `bearer ${p.accessToken}`);
      return this.http.get<T>(absoluteUrl, { headers, params: options?.params });
    }));
  }

  public getText(relativeUrl: string, options? : {params?: HttpParams, headers?: HttpHeaders, reponseType?:string}): Observable<string> {
    let absoluteUrl: string;
    if (!relativeUrl.startsWith(environment.apiUrl)) {
      absoluteUrl = environment.apiUrl + relativeUrl;
    } else {
      absoluteUrl = relativeUrl;
    }

    if (this.userSerive.tokenExpired) {
      this.userSerive.fetchAccessToken();
    }

    return this.userSerive.token$.pipe(take(1)).pipe(
      mergeMap(p => {
      let headers: HttpHeaders = new HttpHeaders();
      if (options && options.headers) {
        options.headers.keys().forEach(k => {
          const v = options.headers?.get(k);
          if (!v) return;
          headers.append(k, v);
        });
      }
      headers = headers.delete('Authorization');
      headers = headers.append('Authorization', `bearer ${p.accessToken}`);
      return this.http.get(absoluteUrl, { headers, params: options?.params, responseType: 'text' });
    }));
  }  

}
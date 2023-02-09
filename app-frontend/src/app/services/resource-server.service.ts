import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ResourceServerService {

  constructor(
    private http: HttpClient,
    private userSerive: UserService
  ) {
  }

  public get<T>(apiUrl: string, options? : {params?: HttpParams, headers?: HttpHeaders}): Observable<T> {
    let absoluteUrl: string;
    if (!apiUrl.startsWith(environment.apiUrl)) {
      absoluteUrl = environment.apiUrl + apiUrl;
    } else {
      absoluteUrl = apiUrl;
    }

    return this.userSerive.getUserToken().pipe(take(1)).pipe(
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

  public getText(apiUrl: string, options? : {params?: HttpParams, headers?: HttpHeaders, reponseType?:string}): Observable<string> {
    let absoluteUrl: string;
    if (!apiUrl.startsWith(environment.apiUrl)) {
      absoluteUrl = environment.apiUrl + apiUrl;
    } else {
      absoluteUrl = apiUrl;
    }

    return this.userSerive.getUserToken().pipe(take(1)).pipe(
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

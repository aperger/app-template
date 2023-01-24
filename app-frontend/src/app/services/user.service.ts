import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';


export interface UserProfile {
  username: string,
  email: string;
  fullName: string;
}

export interface UserToken {
  accessToken: string;
  tokenExpires: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private subjectProfile = new BehaviorSubject<UserProfile | null>(null);
  private subjectToken = new BehaviorSubject<UserToken | null>(null);

  public readonly profile$: Observable<UserProfile> = this.subjectProfile.asObservable().pipe(
    filter(profile => !!profile),
    map(profile => profile as UserProfile)
  );
  public readonly token$: Observable<UserToken> = this.subjectToken.asObservable().pipe(
    filter(profile => !!profile),
    map(token => token as UserToken)
  );

  constructor(private http: HttpClient) { }

  public fetchProfile(): void  {    
    this.http.get<UserProfile>('profile/me').subscribe({
      next: (userProfile: UserProfile) => this.subjectProfile.next(userProfile),
      error: (error: HttpErrorResponse) => console.error(error)
    });
  }

  public fetchAccessToken(): void  {
    console.debug("Get the access token from backend");
    this.http.get<UserToken>('profile/token').subscribe({
      next: (userToken: UserToken) => this.subjectToken.next(userToken),
      error: (error: HttpErrorResponse) => console.error(error)
    });
  }

  
  public get tokenExpired() : boolean {
    const token = this.subjectToken.getValue();
    if (!token) {
      return true;
    }
    const now = new Date();
    const exp = new Date(token.tokenExpires);
    return  exp.getTime() <= now.getTime();
  }

}

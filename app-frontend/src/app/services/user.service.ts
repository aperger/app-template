import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, finalize, map, Observable, of, share } from 'rxjs';


export interface UserProfile {
  username: string,
  email: string;
  fullName: string;
}
  
export interface IUserToken {
  accessToken: string;
  tokenExpires: string;
}

export class UserToken {
  public accessToken: string;
  public tokenExpires: Date;

  constructor(userToken: IUserToken) {
    this.accessToken = userToken.accessToken;
    this.tokenExpires = userToken.tokenExpires ? new Date(userToken.tokenExpires) : new Date(0);
  }

  public get isTokenExpired() {
    const now = new Date();
    return  this.tokenExpires.getTime() <= now.getTime();
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userToken: UserToken = new UserToken({ accessToken: '', tokenExpires: ''});

  constructor(private http: HttpClient) { }

  public get isTokenExpired() {
    if (!this.userToken) {
      return true;
    }
    return this.userToken.isTokenExpired;
  }

  private fetchAccessToken(): Observable<IUserToken>  {
    console.debug("Fetch the access token from backend");
    return this.http.get<IUserToken>('profile/token');
  }

  private cachedToneObservable: Observable<UserToken> | null = null;
  public getUserToken(): Observable<UserToken> {
    if (!this.isTokenExpired)  {
      return of(this.userToken); 
    }
    
    let obs: Observable<UserToken>;
    if (this.cachedToneObservable) {
      obs = this.cachedToneObservable;
    } else {
      this.cachedToneObservable = this.fetchAccessToken()
        .pipe(
          share(), // sharable among multiple subscribers
          finalize(() => this.cachedToneObservable = null) // set the cachedToneObservable to null when the call completes
        ).pipe(map((i: IUserToken) => this.userToken = new UserToken(i)));
        obs = this.cachedToneObservable;
    }
    return obs;
  }

  private subjectProfile = new BehaviorSubject<UserProfile>({email: '', username: '', fullName: ''});

  private fetchProfile(): Observable<UserProfile>  {
    console.debug("Fetch the user profile from backend");
    return this.http.get<UserProfile>('profile/me');
  }

  public readonly profile$: Observable<UserProfile> = this.subjectProfile.asObservable().pipe(
    filter(profile => !!profile),
    map(profile => profile as UserProfile)
  );

  public getProfile(): void  {    
    this.fetchProfile().subscribe({
      next: (userProfile: UserProfile) => this.subjectProfile.next(userProfile),
      error: (error: HttpErrorResponse) => console.error(error)
    });
  }

}

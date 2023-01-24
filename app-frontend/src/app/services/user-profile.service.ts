import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';


export interface UserProfile {
  username: string,
  acccessToken: string;
  email: string;
  fullName: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private subject = new BehaviorSubject<UserProfile | null>(null);
  public readonly profile$: Observable<UserProfile> = this.subject.asObservable().pipe(
    filter(profile => !!profile),
    map(profile => profile as UserProfile)
  );

  constructor(private http: HttpClient) { }

  public fetchProfile(): void  {
    this.http.get<UserProfile>('profile/me').subscribe({
      next: (userProfile: UserProfile) => this.subject.next(userProfile),
      error: (error: HttpErrorResponse) => console.error(error)
    });
  }
  
}

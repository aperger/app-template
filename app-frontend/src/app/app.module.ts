import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { UserProfile, UserProfileService } from './services/user-profile.service';


function initializeAppFactory(service: UserProfileService): () => Observable<UserProfile> {
  service.fetchProfile(); // fetch profile and wait for it
  return () => service.profile$.pipe(take(1)); // take the first only
 }

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: (service: UserProfileService) => initializeAppFactory(service),
    deps: [UserProfileService],
    multi: true
  }],
  bootstrap: [AppComponent],

})
export class AppModule { }

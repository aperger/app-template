import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserProfileService } from '../services/user-profile.service';
import { ResourceServerService } from '../services/resource-server.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver, 
    public userProfileService: UserProfileService, 
    private resourceServer: ResourceServerService) {}

  onClickResourceServer() {
    this.resourceServer.getText("/").subscribe({
      next: (value: string) => window.alert(value),
      error: (error: HttpErrorResponse) => console.error(error)
    });
  }
}

import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { ResourceServerService } from '../services/resource-server.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiServerService } from '../services/api-server.service';

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

  message = "";

  constructor(
    private breakpointObserver: BreakpointObserver, 
    public userService: UserService, 
    private resourceServer: ResourceServerService,
    private apiService: ApiServerService) {}

  onClickWelcomeAjax() {
    console.trace('onClickResourceServerAjax');
    this.resourceServer.getText("/api/message/welcome").subscribe({
      next: (value: string) => {
        this.message = value;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.statusText + ': ' + error.message);
        console.error(error);
      }
    });
  }

  onClickWelcomeProxy() {
    console.trace('onClickServerProxy');
    this.apiService.getText("/api/messages/welcome").subscribe({
      next: (value: string) => {
        this.message = value;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.statusText + ': ' + error.message);
        console.error(error);
      }
    });
  }
  
}

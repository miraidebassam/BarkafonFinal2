import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthGuard, PreloaderService } from '@core';
import { Subscription, timer } from 'rxjs';


@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit, AfterViewInit {

  private autoLogoutSubscription: Subscription;
  
  constructor(private preloader: PreloaderService, private auth: AuthGuard) {}

  ngOnInit() {
    
 
    var mytimer = timer(2000, 5000);
        this.autoLogoutSubscription = mytimer.subscribe(t => {
            this.auth.canActivate();
        });
  }

  ngAfterViewInit() {
    this.preloader.hide();
  }
}

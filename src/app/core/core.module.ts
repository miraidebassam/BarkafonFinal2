import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { OuiNonPipe } from './pipes/oui-non.pipe';
import { AuthGuard } from './authentication/auth.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MediaMatcher } from '@angular/cdk/layout';

@NgModule({
  declarations: [OuiNonPipe],

  exports:[OuiNonPipe],

  imports: [CommonModule],

  providers: [ 
    AuthGuard,
    AuthInterceptor, 
    MediaMatcher,
    { provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptor,
    multi: true}
  ],

})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  } 
}

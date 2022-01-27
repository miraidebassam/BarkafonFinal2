import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from '@shared';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private store: LocalStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.store.getByKey();
    //console.log("User::::::::", user);
    if (user) {
        const cloned = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + user)
        });
        return next.handle(cloned).pipe(tap(() => { }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    this.router.navigate(['auth']);
                }
            }
        }));
    } else {
        return next.handle(req);
    }
}}

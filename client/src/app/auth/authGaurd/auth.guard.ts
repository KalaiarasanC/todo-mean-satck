import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import * as Cookies from 'es-cookie';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.isLoggedIn();
    }

    isLoggedIn() {
        if (Cookies.get('token')) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }
}

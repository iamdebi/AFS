import { Injectable } from "@angular/core";
import { Auth } from "aws-amplify";
import {
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanLoad {
  auth = true;
  constructor() {}

  async isAuthenticated() {
    return await Auth.currentAuthenticatedUser()
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isAuthenticated();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuthenticated();
  }

  ngOnInit() {}
}

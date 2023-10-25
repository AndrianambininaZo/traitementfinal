import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilisateurAuthService } from '../services/utilisateur/utilisateur-auth.service';
import { UtilisateurService } from '../services/utilisateur/utilisateur.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationGuard implements CanActivate {
  constructor(private route: Router, private service: UtilisateurService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const role = route.data['roles'] as string;
    if (role) {
      const match = this.service.getMatch(role);
      if (match) {
        return true;
      } else {
        this.route.navigate(['/forbidden']);
      }
    }
    this.route.navigate(['/login']);

    return false;
  }

}

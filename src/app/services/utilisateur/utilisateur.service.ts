import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/admin/model/login.model';
import { Utilisateur, UtilisateurRequest, addRoleByUserRequest } from 'src/app/admin/model/utilisateur.model';
import { environment } from 'src/environments/environment';
import { UtilisateurAuthService } from './utilisateur-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  token!: string
  constructor(private http: HttpClient, private servicesAuth: UtilisateurAuthService) {
    this.token = servicesAuth.getToken();

  }
  heders() {
    return new HttpHeaders(
      { "Authorization": "Bearer " + this.token }
    )
  }
  public enregistrerUtilisateur(utilisateur: UtilisateurRequest): Observable<any> {
    console.log(this.token)
    console.log(this.heders())
    return this.http.post(environment.backEndHost + "/api/utilisateur", utilisateur, { headers: this.heders() });
  }
  public ajouterRoleByUser(formRoleByUser: addRoleByUserRequest): Observable<any> {
    console.log(this.token)
    console.log(this.heders())

    return this.http.post(environment.backEndHost + "/api/addRole", formRoleByUser, { headers: this.heders() });
  }
  public listUtilisateur(): Observable<any> {
    return this.http.get(environment.backEndHost + "/api/utilisateur", { headers: this.heders() });
  }

  public authentification(login: Login): Observable<any> {
    return this.http.post(environment.backEndHost + "/connexion", login);
  }
  public authentificationIsAdmin(login: Login): Observable<any> {
    return this.http.post(environment.backEndHost + "/authentication", login);
  }
  public roleUtilisateur() {
    return this.servicesAuth.getRole();
  }
  public getMatch(routeEnctive: string): boolean {
    if (routeEnctive === this.servicesAuth.getRole()) {
      return true;
    } else return false;
  }

}

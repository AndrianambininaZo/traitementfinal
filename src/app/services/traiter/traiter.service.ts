import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListOperation } from 'src/app/admin/model/listeTache.model';
import { Reception } from 'src/app/admin/model/reception.model';
import { ListeReception } from 'src/app/admin/model/receptionListe.model';
import { ListTraitement, Traitemment } from 'src/app/admin/model/traitemment.mode';
import { environment } from 'src/environments/environment';
import { UtilisateurAuthService } from '../utilisateur/utilisateur-auth.service';
import { UtilisateurRequest, addRoleByUserRequest } from 'src/app/admin/model/utilisateur.model';
import { RequestPassword } from 'src/app/admin/model/requestPassword.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TraiterService {
  token!: string
  videoUrl!: SafeUrl;

  constructor(private http: HttpClient, private servicesAuth: UtilisateurAuthService, private sanitizer: DomSanitizer) {
    this.token = servicesAuth.getToken();
  }
  heders() {
    return new HttpHeaders(
      { "Authorization": "Bearer " + this.token }
    )
  }

  hedersa() {
    return new HttpHeaders(
      { "Authorization": "Bearer " + this.token, 'Content-Type': 'video/mp4' }
    )
  }

  public receptionTache(reception: Reception): Observable<any> {
    return this.http.post(environment.backEndHost + "/api/reception", reception, { headers: this.heders() });
  }
  public receptionGetUtilisateur(): Observable<any> {
    return this.http.get(environment.backEndHost + "/api/utilisateur", { headers: this.heders() });
  }
  public addUtilisateur(utilisateur: UtilisateurRequest): Observable<any> {
    return this.http.post(environment.backEndHost + "/api/utilisateur", utilisateur, { headers: this.heders() });
  }
  public setPassword(request: RequestPassword): Observable<any> {
    return this.http.post(environment.backEndHost + "/api/utilisateur/setPassword", request, { headers: this.heders() });
  }
  public getUtilisateur(id: number): Observable<UtilisateurRequest> {
    return this.http.get<UtilisateurRequest>(environment.backEndHost + "/api/utilisateur/" + id, { headers: this.heders() });
  }
  public addRolleByUser(formRoleByUser: addRoleByUserRequest): Observable<any> {
    return this.http.post(environment.backEndHost + "/api/addRole", formRoleByUser, { headers: this.heders() });
  }
  public setStatusUser(id: number): Observable<any> {
    return this.http.get(environment.backEndHost + "/api/utilisateur/setStatus?id=" + id, { headers: this.heders() });
  }

  public getReceptionTache(): Observable<any> {
    return this.http.get<Array<ListeReception>>(environment.backEndHost + "/api/reception", { headers: this.heders() });
  }
  public telechargerDoc(id: number): Observable<any> {
    return this.http.get(environment.backEndHost + "/api/telechargerDoc/" + id, { headers: this.heders(), observe: 'response', responseType: 'blob' });
  }
  public telechargerDocTraiter(id: number): Observable<any> {
    return this.http.get(environment.backEndHost + "/api/telechargerDocTraitee/" + id, { headers: this.heders(), observe: 'response', responseType: 'blob' });
  }
  public telechargerAudio(id: number): Observable<any> {
    return this.http.get(environment.backEndHost + "/api/telechargerAudio/" + id, { headers: this.heders(), observe: 'response', responseType: 'blob' });
  }
  public creerTraitemment(traitement: Traitemment): Observable<any> {
    return this.http.post(environment.backEndHost + "/api/traitemment", traitement, { headers: this.heders() });
  }
  public envoyerDoc(formDoc: FormData, id: number): Observable<any> {
    return this.http.post(environment.backEndHost + "/api/upload_traitement/" + id, formDoc, { headers: this.heders() });
  }
  public getListe(): Observable<Array<ListOperation>> {
    return this.http.get<Array<ListOperation>>(environment.backEndHost + "/api/list_Operation", { headers: this.heders() });
  }
  public receptioTache(reception: Reception): Observable<any> {
    return this.http.post(environment.backEndHost + "/api/reception", reception, { headers: this.heders() });
  }
  public getListeByClient(id: number): Observable<Array<ListOperation>> {
    return this.http.get<Array<ListOperation>>(environment.backEndHost + "/api/list_Operation/" + id, { headers: this.heders() });
  }

  public listeTraitementByclient(): Observable<any> {
    return this.http.get(environment.backEndHost + "/api/traitemmentByClient", { headers: this.heders() });
  }
  public listTraitement(): Observable<Array<ListTraitement>> {
    return this.http.get<Array<ListTraitement>>(environment.backEndHost + "/api/traitemment", { headers: this.heders() });
  }
  public listTraitementNoValider(): Observable<Array<ListTraitement>> {
    return this.http.get<Array<ListTraitement>>(environment.backEndHost + "/api/traitemmentByNoValidate", { headers: this.heders() });
  }
  public traitementValider(id: number): Observable<ListTraitement> {
    return this.http.get<ListTraitement>(environment.backEndHost + "/api/traitemmentByValidate/" + id, { headers: this.heders() });
  }
  public test(): Observable<any> {
    return this.http.get(environment.backEndHost + "/api/telechargerAudio/" + 2, { headers: this.heders() });
  }

  public telechargerAudioY() {
    this.http.get(environment.backEndHost + "/api/telechargerAudio/" + 2, { responseType: 'blob' }).subscribe(response => {
      const blob = new Blob([response], { type: 'video/mp4' });
      const url = URL.createObjectURL(blob);
      this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(url);
    });

  }

  getVideoUrl(): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'video/mp4',
      'Authorization': 'Bearer ' + this.token // Récupérez votre jeton JWT ici
    });


    return this.http.get(environment.backEndHost + "/api/videos", { headers, responseType: 'blob' });
  }




}

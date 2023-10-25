import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperationEntree } from 'src/app/admin/model/operationEntree.mode';
import { ListOperation } from 'src/app/admin/model/listeTache.model';
import { environment } from 'src/environments/environment';
import { Reception } from 'src/app/admin/model/reception.model';
import { UtilisateurAuthService } from '../utilisateur/utilisateur-auth.service';


@Injectable({
  providedIn: 'root'
})
export class TachesService {
  token!: string
  constructor(private http: HttpClient, private servicesAuth: UtilisateurAuthService) {
    this.token = servicesAuth.getToken();
  }

  heders() {
    return new HttpHeaders(
      { "Authorization": "Bearer " + this.token }
    )
  }
  public creerTaches(operation: OperationEntree): Observable<any> {
    return this.http.post(environment.backEndHost + "/api/create_tache", operation, { headers: this.heders() });
  }
  public creerDoc(formDoc: FormData, id: number): Observable<any> {
    return this.http.post(environment.backEndHost + "/api/upload/" + id, formDoc, { headers: this.heders() });
  }
  public creerAdio(formAudio: FormData, id: number): Observable<any> {
    return this.http.post(environment.backEndHost + "/api/upload/" + id, formAudio, { headers: this.heders() });
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
}

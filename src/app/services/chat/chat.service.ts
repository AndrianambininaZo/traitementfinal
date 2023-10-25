import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilisateurAuthService } from '../utilisateur/utilisateur-auth.service';
import { Observable, map } from 'rxjs';
import { UtilisateurRequest } from 'src/app/admin/model/utilisateur.model';
import { environment } from 'src/environments/environment';
import { ChatGroupRequest, ChatRequest, GetChat, GroupRequst } from 'src/app/admin/model/chatRequest.mode';
import { ChatBymessage } from 'src/app/admin/model/ChatBymessage.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  token!: string
  constructor(private http: HttpClient, private servicesAuth: UtilisateurAuthService) {
    this.token = servicesAuth.getToken();
  }
  heders() {
    return new HttpHeaders(
      { "Authorization": "Bearer " + this.token }
    )
  }
  // info chat
  public getUtilisateur(): Observable<UtilisateurRequest> {
    return this.http.get<UtilisateurRequest>(environment.backEndHost + "/api/utilisateur", { headers: this.heders() });
  }
  public getUtilisateurById(id: number): Observable<UtilisateurRequest> {
    return this.http.get<UtilisateurRequest>(environment.backEndHost + "/api/utilisateur/" + id, { headers: this.heders() });
  }
  public getUtilisateurByEmail(email: string): Observable<UtilisateurRequest> {
    return this.http.get<UtilisateurRequest>(environment.backEndHost + "/api/utilisateur_email/" + email, { headers: this.heders() });
  }
  public ajouterMessage(chatRequest: ChatRequest): Observable<ChatRequest> {
    return this.http.post<ChatRequest>(environment.backEndHost + "/api/save_Chat", chatRequest, { headers: this.heders() });
  }
  public getMessage(getChat: GetChat): Observable<any> {
    return this.http.post(environment.backEndHost + "/api/list_Chat", getChat, { headers: this.heders() });
  }
  public getMessages(): Observable<any> {
    return this.http.get(environment.backEndHost + "/api/list_Chats", { headers: this.heders() });
  }
  // info group
  public ajouterGroup(request: GroupRequst): Observable<GroupRequst> {
    return this.http.post<GroupRequst>(environment.backEndHost + "/api/save_Group", request, { headers: this.heders() });
  }
  public getListGroup(): Observable<any> {
    return this.http.get(environment.backEndHost + "/api/list_Group", { headers: this.heders() });
  }
  public getListUserByGroup(id: number): Observable<any> {
    return this.http.get(environment.backEndHost + "/api/list_userByChat/" + id, { headers: this.heders() });
  }
  public getListUserNoByGroup(id: number): Observable<any> {
    return this.http.get(environment.backEndHost + "/api/list_userNoByChat/" + id, { headers: this.heders() });
  }
  public addUserByGroup(idGroup: number, idUser: number): Observable<any> {
    const data = {
      idUser: idUser,
      idGroup: idGroup
    }
    return this.http.post(environment.backEndHost + "/api/add_UserByGroup", data, { headers: this.heders() });
  }
  public ajouterMessageBychat(chatRequest: ChatGroupRequest): Observable<ChatGroupRequest> {
    return this.http.post<ChatGroupRequest>(environment.backEndHost + "/api/save_ChatGroup", chatRequest, { headers: this.heders() });
  }
  public getMessagesByGroup(idGroup: number): Observable<any> {
    return this.http.get(environment.backEndHost + "/api/list_ChatsByGroup/" + idGroup, { headers: this.heders() });
  }
  public lengthMessaByDes(idGroup: number, idDes: number): Observable<number> {
    return this.http.get<number>(environment.backEndHost + "/api/list_ChatByDesIsExp?idGroup=" + idGroup + "&idUser=" + idDes, { headers: this.heders() });
  }
  public listUserIsLengthMessage(idDes: number): Observable<ChatBymessage> {
    return this.http.get<ChatBymessage>(environment.backEndHost + "/api/list_UserIsLengthMessage/" + idDes, { headers: this.heders() });
  }
  public modifierMessageVue(idDes: number, idExp: number): Observable<void> {
    return this.http.get<void>(environment.backEndHost + "/api/modifier_message_vue?idDes=" + idDes + "&idExp=" + idExp, { headers: this.heders() });
  }


  /*public length(idGroup: number, idDes: number): Observable<number> {
    return this.http.get(environment.backEndHost + "/api/list_ChatByDesIsExp?idGroup=" + idGroup + "&idUser=" + idDes, { headers: this.heders() })
      .pipe(
        map((response: any) => {
          // Vérifiez si la réponse contient le nombre attendu
          if (response && typeof response === 'number') {
            console.log("jbvsjkvsd")
            return response;
          } else {
            console.log("jbvsjkvsd")
            // Si la réponse n'est pas valide, vous pouvez lancer une exception ou renvoyer une valeur par défaut
            throw new Error('La réponse HTTP n\'est pas valide');
            // Ou bien, renvoyer une valeur par défaut
            // return 0;
          }
        })
      );
  }*/


}

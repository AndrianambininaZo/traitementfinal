import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { DasboardComponent } from './admin/dasboard/dasboard.component';
import { CreertacheComponent } from './admin/creertache/creertache.component';
import { ListeTachesComponent } from './admin/liste-taches/liste-taches.component';
import { TacheComponent } from './admin/tache/tache.component';
import { UtilisateurComponent } from './admin/utilisateur/utilisateur.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ClientDasboardComponent } from './admin/dasboard/client-dasboard/client-dasboard.component';
import { BackooficheDasboardComponent } from './admin/dasboard/backoofiche-dasboard/backoofiche-dasboard.component';
import { ListeOfOfficheComponent } from './admin/liste-of-offiche/liste-of-offiche.component';
import { ReceptionOfOfficheComponent } from './admin/reception-of-offiche/reception-of-offiche.component';
import { TelechargerOfOfficheComponent } from './admin/telecharger-of-offiche/telecharger-of-offiche.component';
import { TraitementOfOfficheComponent } from './admin/traitement-of-offiche/traitement-of-offiche.component';
import { AuthGuard } from 'auth-guard';
import { LoginForAdminComponent } from './login-for-admin/login-for-admin.component';
import { StatistiqueComponent } from './admin/statistique/statistique.component';
import { TachesJourComponent } from './admin/taches-jour/taches-jour.component';
import { FactureComponent } from './admin/facture/facture.component';
import { TacheEncorsComponent } from './admin/tache-encors/tache-encors.component';
import { TraitementComponent } from './admin/traitement/traitement.component';
import { TousTacheComponent } from './admin/tous-tache/tous-tache.component';
import { ParametreComponent } from './admin/parametre/parametre.component';
import { ListFactureComponent } from './admin/list-facture/list-facture.component';
import { ChatComponent } from './admin/chat/chat.component';
import { GroupChatComponent } from './admin/group-chat/group-chat.component';
import { AprosComponent } from './apros/apros.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "", redirectTo: "", pathMatch: "full" },
  { path: "connexion_arosaina", component: LoginForAdminComponent },
  { path: "forbidden", component: ForbiddenComponent },
  { path: "devI_R_Z", component: AprosComponent },

  {
    path: "my", component: AdminComponent, children: [     //page admin
      { path: "", component: DasboardComponent },
      { path: "admin/utilisateur", component: UtilisateurComponent },
      { path: "admin/list_tous", component: TousTacheComponent },
      { path: "admin/list_tache", component: ListeTachesComponent },
      { path: "admin/list_validation", component: TraitementComponent },
      { path: "admin/list_encours", component: TacheEncorsComponent },
      { path: "admin/statistique", component: StatistiqueComponent },
      { path: "admin/list_taches_jour", component: TachesJourComponent },
      { path: "admin/list_facture", component: ListFactureComponent },
      { path: "admin/facture", component: FactureComponent },
      { path: "admin/parametre", component: ParametreComponent },
      { path: "admin/chat", component: ChatComponent },
      { path: "admin/group", component: GroupChatComponent },

      //client
      { path: "client/creer_tache", component: CreertacheComponent },
      { path: "client", component: ClientDasboardComponent },
      { path: "client/tache", component: TacheComponent },

      //backofficher
      { path: "backoffice/reception/:id", component: TelechargerOfOfficheComponent },
      { path: "backoffice/traitement/:id", component: TraitementOfOfficheComponent },
      { path: "backoffice", component: BackooficheDasboardComponent },
      { path: "offiche/list_tache", component: ListeOfOfficheComponent },
      { path: "offiche/tache", component: ReceptionOfOfficheComponent },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

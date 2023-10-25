import { Component, OnInit } from '@angular/core';
import { TraiterService } from 'src/app/services/traiter/traiter.service';
import { ListeReception } from '../../model/receptionListe.model';
import { UtilisateurAuthService } from 'src/app/services/utilisateur/utilisateur-auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-backoofiche-dasboard',
  templateUrl: './backoofiche-dasboard.component.html',
  styleUrls: ['./backoofiche-dasboard.component.scss']
})
export class BackooficheDasboardComponent implements OnInit {
  totalPageItems: any;
  page: number = 1;
  listereception!: Array<ListeReception>
  mois: any = []
  moi!: number
  annee!: number
  annees: any = []
  role: any = this.utilisateurService.getRole();
  idUser: any = this.utilisateurService.getIdUser();
  lengthByMois!: number
  isLoggedIn!: boolean
  constructor(private route: Router, private utilisateurService: UtilisateurAuthService, private serviceTraiter: TraiterService) {
    this.isLoggedIn = utilisateurService.isLoggeInBackOffice()
    this.moi = new Date().getMonth()
    this.annee = new Date().getFullYear();
    this.annees = [this.annee, this.annee - 1]
    let mois = [
      { id: 0, mois: "janvier" },
      { id: 1, mois: "Fevirer" },
      { id: 2, mois: "Mars" },
      { id: 3, mois: "Avril" },
      { id: 4, mois: "Mai" },
      { id: 5, mois: "Juin" },
      { id: 6, mois: "Juiller" },
      { id: 7, mois: "Aout" },
      { id: 8, mois: "Septebre" },
      { id: 9, mois: "Octobre" },
      { id: 10, mois: "Novembre" },
      { id: 11, mois: "Decembre" },
    ]
    this.mois = mois.filter(re => {
      return re.id != this.moi
    })
    const nomMois = mois[this.moi]
    this.mois.unshift(nomMois)
  }

  ngOnInit(): void {
    if (!this.isLoggedIn) {
      this.route.navigateByUrl("/connexion_arosaina")
    }
    this.getListeReception();
  }
  getListeReception() {
    this.serviceTraiter.getReceptionTache().subscribe({
      next: (data) => {

        this.listereception = data.filter((rec: {
          dateReception: any; user: { id: any; }; operationEntree: { status: string }
        }) => {
          let rec_mois = new Date(rec.dateReception).getMonth();
          let rec_annee = new Date(rec.dateReception).getFullYear();
          return rec_mois == this.moi && rec_annee == this.annee && rec.user.id == this.idUser && rec.operationEntree.status == "Traitée";
        })
        this.lengthByMois = this.listereception.length
      }, error: (error) => {
        console.log(error)
      }
    })
  }
  selectByAnnee(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value
    this.annee = parseInt(value)
    console.log(this.annee)
    this.serviceTraiter.getReceptionTache().subscribe({
      next: (data) => {

        this.listereception = data.filter((rec: {
          dateReception: any; user: { id: any; }; operationEntree: { status: string }
        }) => {

          let rec_mois = new Date(rec.dateReception).getMonth();
          let rec_annee = new Date(rec.dateReception).getFullYear();

          return rec_mois == this.moi && rec_annee == this.annee && rec.user.id == this.idUser && rec.operationEntree.status == "Traitée";
        })
        this.lengthByMois = this.listereception.length
      }, error: (error) => {
        console.log(error)
      }
    })
  }
  selectByMois(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value
    this.moi = parseInt(value)
    this.serviceTraiter.getReceptionTache().subscribe({
      next: (data) => {

        this.listereception = data.filter((rec: {
          dateReception: any; user: { id: any; }; operationEntree: { status: string }
        }) => {

          let rec_mois = new Date(rec.dateReception).getMonth();
          let rec_annee = new Date(rec.dateReception).getFullYear();

          return rec_mois == this.moi && rec_annee == this.annee && rec.user.id == this.idUser && rec.operationEntree.status == "Traitée";
        })
        this.lengthByMois = this.listereception.length
      }, error: (error) => {
        console.log(error)
      }
    })

  }

}

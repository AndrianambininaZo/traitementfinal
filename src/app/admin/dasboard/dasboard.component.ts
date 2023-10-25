import { Component, OnInit } from '@angular/core';
import { TachesService } from 'src/app/services/taches/taches.service';
import { UtilisateurAuthService } from 'src/app/services/utilisateur/utilisateur-auth.service';
import { TraiterService } from 'src/app/services/traiter/traiter.service';
import { ListTraitement } from '../model/traitemment.mode';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.scss']
})
export class DasboardComponent implements OnInit {
  totalPageItems: any;
  page: number = 1;
  listeTache: any
  tachesAjourdui: any
  token!: string;
  total!: any;
  totalByClient!: number;
  moi!: number
  testa: boolean = true
  mois: any = []
  annees: any = []
  annee!: number
  inputRechercher!: string
  totalPageByClient!: number
  totalPageJour: any;
  totalMotsJour: any;
  listeTacheAujoudui: any;
  traitemeNoValider: ListTraitement[] | undefined;
  tacheNoValider!: Number
  isLoggedIn!: boolean
  role: any = this.utilisateurService.getRole();
  idUser: any = this.utilisateurService.getIdUser();
  constructor(private http: HttpClient, private route: Router, private servicetraiter: TraiterService, private servicetaches: TachesService, private utilisateurService: UtilisateurAuthService) {
    this.isLoggedIn = utilisateurService.isLoggeInAdmin()
    this.token = utilisateurService.getToken();
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

    interval(1000).subscribe(() => {

      this.getTotalParJour()
      this.getListeNovalider()
    })
    this.getStatitique();
  }
  getStatitique() {
    this.servicetraiter.listeTraitementByclient().subscribe(
      {
        next: (data) => {
          this.listeTache = data.filter((res: { mois: number; annee: number; "": any; }) => {
            return res.mois == this.moi && res.annee == this.annee
          })
          if (this.listeTache.length == 0) {
            this.testa = false
          }
          else {
            this.testa = true
          }
          this.totalByClient = this.listeTache.reduce((previousValue: any, currentValue: { mots: any; }) => parseInt(previousValue + currentValue.mots!), 0)
          this.totalPageByClient = this.listeTache.reduce((previousValue: any, currentValue: { pages: any; }) => parseInt(previousValue + currentValue.pages!), 0)

        }
      }
    )
  }
  selectByAnnee(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value
    this.annee = parseInt(value)
    this.servicetraiter.listeTraitementByclient().subscribe(
      {
        next: (data) => {
          this.listeTache = data.filter((res: {
            annee: number; mois: number; "": any;
          }) => {
            return res.mois == this.moi && res.annee == this.annee
          })
          this.totalByClient = this.listeTache.reduce((previousValue: any, currentValue: { mots: any; }) => parseInt(previousValue + currentValue.mots!), 0)
          this.totalPageByClient = this.listeTache.reduce((previousValue: any, currentValue: { pages: any; }) => parseInt(previousValue + currentValue.pages!), 0)

        }
      }
    )
  }
  getTotalParJour() {
    this.servicetraiter.listTraitement().subscribe(
      {
        next: (data) => {
          this.listeTacheAujoudui = data.filter((res) => {
            const date = new Date();
            const jour = date.getDate()
            const dadeVrais = date.toLocaleDateString("fr").replace("/", "-").replace("/", "-");
            return res.date == dadeVrais
          })
          this.total = this.listeTacheAujoudui.length
          this.totalMotsJour = this.listeTacheAujoudui.reduce((previousValue: any, currentValue: { mots: any; }) => parseInt(previousValue + currentValue.mots!), 0)
          this.totalPageJour = this.listeTacheAujoudui.reduce((previousValue: any, currentValue: { page: any; }) => parseInt(previousValue + currentValue.page!), 0)
        }
      }
    )
  }
  selectByMois(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value
    this.moi = parseInt(value)
    this.servicetraiter.listeTraitementByclient().subscribe(
      {
        next: (data) => {
          this.listeTache = data.filter((res: {
            annee: number; mois: number; "": any;
          }) => {
            return res.mois == this.moi && res.annee == this.annee
          })
          this.totalByClient = this.listeTache.reduce((previousValue: any, currentValue: { mots: any; }) => parseInt(previousValue + currentValue.mots!), 0)
          this.totalPageByClient = this.listeTache.reduce((previousValue: any, currentValue: { pages: any; }) => parseInt(previousValue + currentValue.pages!), 0)

        }
      }
    )
  }
  getKey(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value
    this.inputRechercher = value
    this.servicetraiter.listeTraitementByclient().subscribe(
      {
        next: (data) => {
          this.listeTache = data.filter((res: { annee: number; user: any; mois: number; "": any; }) => {
            return res.mois == this.moi && res.user.nom.toLowerCase().includes(this.inputRechercher.toLowerCase()) && res.annee == this.annee
          })
          this.totalByClient = this.listeTache.reduce((previousValue: any, currentValue: { mots: any; }) => parseInt(previousValue + currentValue.mots!), 0)
          this.totalPageByClient = this.listeTache.reduce((previousValue: any, currentValue: { pages: any; }) => parseInt(previousValue + currentValue.pages!), 0)

        }
      }
    )
  }
  redirectfacture(idUser: number, annee: number) {
    this.route.navigateByUrl("/my/admin/facture?id=" + idUser + "&idUser=" + this.moi + "&annee=" + annee)
  }
  getListeNovalider() {
    this.servicetraiter.listTraitementNoValider().subscribe({
      next: (data) => {
        this.traitemeNoValider = data
        this.tacheNoValider = this.traitemeNoValider.length
      }
    })
  }
  test() {
  }
  tst() {
    const url = 'localhost:8085/api/telechargerAudio/' + 1; // Remplacez l'URL par celle de votre API

    this.servicetraiter.test().subscribe((data: Blob) => {
      const downloadUrl = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'audio.mp3'; // Nom du fichier à télécharger
      link.click();
    });
  }
}

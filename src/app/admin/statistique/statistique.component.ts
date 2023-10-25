import { Component, OnInit } from '@angular/core';
import { TachesService } from 'src/app/services/taches/taches.service';
import { TraiterService } from 'src/app/services/traiter/traiter.service';
import { UtilisateurAuthService } from 'src/app/services/utilisateur/utilisateur-auth.service';
import { ListTraitement } from '../model/traitemment.mode';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})

export class StatistiqueComponent implements OnInit {
  totalPageItems: any;
  page: number = 1;
  listeTache!: Array<ListTraitement>
  tachesAjourdui: any
  token!: string
  moi!: number
  listClient: any
  mois: any = []
  annees: any = []
  annee!: number
  totalByClient!: number
  totalPageByClient!: number
  constructor(private servicetraiter: TraiterService, private servicetaches: TachesService, private servicesAuth: UtilisateurAuthService) {
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
    this.servicetraiter.listTraitement().subscribe({
      next: (data) => {
        this.listeTache = data.filter((res) => {
          let mois = new Date("" + res.dateFull)
          return mois.getMonth() == this.moi && res.annee == this.annee;
        })
        this.totalByClient = this.listeTache.reduce((previousValue, currentValue) => parseInt(previousValue + currentValue.mots!), 0)
        this.totalPageByClient = this.listeTache.reduce((previousValue, currentValue) => parseInt(previousValue + currentValue.page!), 0)
      }
    })
  }

  ngOnInit(): void {
  }
  selectByMois(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value
    this.servicetraiter.listTraitement().subscribe({
      next: (data) => {
        console.log(data)
        this.listeTache = data.filter((res) => {
          let mois = new Date("" + res.dateFull)
          return res.mois == parseInt(value) && res.annee == this.annee;
        })
        this.getClienByMois(parseInt(target.value))
        this.totalByClient = this.listeTache.reduce((previousValue, currentValue) => parseInt(previousValue + currentValue.mots!), 0)
        this.totalPageByClient = this.listeTache.reduce((previousValue, currentValue) => parseInt(previousValue + currentValue.page!), 0)
      }
    })

  }
  selectByClient(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value

    this.servicetraiter.listTraitement().subscribe({
      next: (data) => {
        this.listeTache = data.filter((res) => {
          return res.reception?.operationEntree.user.id == parseInt(value);
        })
        this.getClienByMois(parseInt(target.value))
        this.totalByClient = this.listeTache.reduce((previousValue, currentValue) => parseInt(previousValue + currentValue.mots!), 0)
        this.totalPageByClient = this.listeTache.reduce((previousValue, currentValue) => parseInt(previousValue + currentValue.page!), 0)
      }
    })
  }
  selectDate(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value
    this.servicetraiter.listTraitement().subscribe({
      next: (data) => {
        this.listeTache = data.filter((res) => {
          let date = new Date("" + value)
          let j = date.getDate()
          let jour: string
          let mois: string
          if (("" + j).length == 1) {
            jour = "0" + j
          } else {
            jour = j.toString();
          }

          let mo = date.getMonth() + 1;
          if (("" + mo).length == 1) {
            mois = "0" + mo
          } else {
            mois = mo.toString();
          }
          let annee = date.getFullYear()
          console.log(jour + "-" + mois + "-" + annee)
          let dateJour = jour + "-" + mois + "-" + annee
          return res.date == dateJour
        })
        this.totalByClient = this.listeTache.reduce((previousValue, currentValue) => parseInt(previousValue + currentValue.mots!), 0)
        this.totalPageByClient = this.listeTache.reduce((previousValue, currentValue) => parseInt(previousValue + currentValue.page!), 0)
      }
    })
  }
  getClienByMois(mois: number) {
    this.servicetraiter.listeTraitementByclient().subscribe(
      {
        next: (data) => {
          this.listClient = data.filter((res: { mois: number; }) => {
            return res.mois == mois;
          })
          console.log(this.listClient)
        }
      }
    )
  }
  selectByAnnee(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value
    this.annee = parseInt(value)
    this.servicetraiter.listTraitement().subscribe({
      next: (data) => {
        this.listeTache = data.filter((res) => {
          let mois = new Date("" + res.dateFull)
          return res.mois == this.moi && res.annee == this.annee;
        })
        this.totalByClient = this.listeTache.reduce((previousValue, currentValue) => parseInt(previousValue + currentValue.mots!), 0)
        this.totalPageByClient = this.listeTache.reduce((previousValue, currentValue) => parseInt(previousValue + currentValue.page!), 0)
      }
    })
  }


}

import { Component, OnInit } from '@angular/core';
import { TachesService } from 'src/app/services/taches/taches.service';
import { TraiterService } from 'src/app/services/traiter/traiter.service';
import { UtilisateurAuthService } from 'src/app/services/utilisateur/utilisateur-auth.service';
import { ListTraitement } from '../model/traitemment.mode';

@Component({
  selector: 'app-tous-tache',
  templateUrl: './tous-tache.component.html',
  styleUrls: ['./tous-tache.component.scss']
})
export class TousTacheComponent implements OnInit {
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
    this.annee = new Date().getFullYear();
    this.annees = [this.annee, this.annee - 1, this.annee - 2]
  }

  ngOnInit(): void {
    this.getTraitement()
  }
  getTraitement() {
    this.servicetraiter.listTraitement().subscribe({
      next: (data) => {
        console.log(data)
        this.listeTache = data.filter((res) => {
          return res.annee == this.annee;
        })
        this.totalByClient = this.listeTache.reduce((previousValue, currentValue) => parseInt(previousValue + currentValue.mots!), 0)
        this.totalPageByClient = this.listeTache.reduce((previousValue, currentValue) => parseInt(previousValue + currentValue.page!), 0)
      }
    })
  }
  selectByAnnee(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value
    this.annee = parseInt(value)
    this.servicetraiter.listTraitement().subscribe({
      next: (data) => {
        this.listeTache = data.filter((res) => {
          return res.annee == this.annee;
        })
        this.totalByClient = this.listeTache.reduce((previousValue, currentValue) => parseInt(previousValue + currentValue.mots!), 0)
        this.totalPageByClient = this.listeTache.reduce((previousValue, currentValue) => parseInt(previousValue + currentValue.page!), 0)
      }
    })
  }
  rechercheByCode(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value
    this.servicetraiter.listTraitement().subscribe({
      next: (data) => {
        this.listeTache = data.filter((res) => {
          return res.annee == this.annee && res.reception.operationEntree.codeTache.toLowerCase().includes(value.toLowerCase());
        })
        this.totalByClient = this.listeTache.reduce((previousValue, currentValue) => parseInt(previousValue + currentValue.mots!), 0)
        this.totalPageByClient = this.listeTache.reduce((previousValue, currentValue) => parseInt(previousValue + currentValue.page!), 0)
      }
    })
  }

}

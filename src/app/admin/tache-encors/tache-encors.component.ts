import { Component, OnInit } from '@angular/core';
import { ListOperation } from '../model/listeTache.model';
import { Reception } from '../model/reception.model';
import { TraiterService } from 'src/app/services/traiter/traiter.service';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';
import { ListeReception } from '../model/receptionListe.model';
import { interval } from 'rxjs';

@Component({
  selector: 'app-tache-encors',
  templateUrl: './tache-encors.component.html',
  styleUrls: ['./tache-encors.component.scss']
})
export class TacheEncorsComponent implements OnInit {
  listeReception!: Array<ListeReception>
  reception: Reception = new Reception();
  constructor(private serviceTraiter: TraiterService, private user: UtilisateurService) { }

  ngOnInit(): void {
    interval(1000).subscribe(() => {
      this.getListeTache()
    })

  }
  getListeTache() {
    this.serviceTraiter.getReceptionTache().subscribe({
      next: (data) => {
        this.listeReception = data.filter((res: any) => {
          return res.operationEntree.status == "En cours";
        })
      }
    })

  }

}

import { Component, OnInit } from '@angular/core';
import { ListOperation } from '../model/listeTache.model';
import { TachesService } from 'src/app/services/taches/taches.service';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';
import { UtilisateurAuthService } from 'src/app/services/utilisateur/utilisateur-auth.service';
import { TraiterService } from 'src/app/services/traiter/traiter.service';
import { Reception } from '../model/reception.model';
import { interval } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-of-offiche',
  templateUrl: './liste-of-offiche.component.html',
  styleUrls: ['./liste-of-offiche.component.scss']
})
export class ListeOfOfficheComponent implements OnInit {
  listeOperation!: Array<ListOperation>
  role: any = this.utilisateurService.getRole();
  idUser: any = this.utilisateurService.getIdUser();

  constructor(private route: Router, private sevichetache: TachesService, private serviceTraiter: TraiterService, private utilisateurService: UtilisateurAuthService) { }

  ngOnInit(): void {

    interval(1000).subscribe(() => {
      this.getListeTache();
    })

  }
  getListeTache() {
    this.sevichetache.getListe().subscribe({
      next: (data) => {
        this.listeOperation = data.filter((tach) => tach.status == "En instance")

      }
    })
  }

  prendreTaches(id: number) {
    const reception = new Reception();
    reception.idOperation = id
    reception.idUser = this.idUser
    console.log(reception);
    this.serviceTraiter.receptionTache(reception).subscribe(
      {
        next: (data) => {
          this.route.navigateByUrl("my/offiche/tache")

        }
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TachesService } from 'src/app/services/taches/taches.service';
import { ListOperation } from '../model/listeTache.model';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';
import { UtilisateurAuthService } from 'src/app/services/utilisateur/utilisateur-auth.service';
import { error } from 'console';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { interval } from 'rxjs';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.scss']
})
export class TacheComponent implements OnInit {
  listeOperation!: Array<ListOperation>
  idUser: any = this.utilisateurServices.getIdUser();
  inputrechercher!: string
  index!: number

  constructor(private serviceTache: TachesService, private utilisateurServices: UtilisateurAuthService) { }

  ngOnInit(): void {
    interval(1000).subscribe(() => {

    })
    this.getTaches();
  }
  getKey(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.value
    this.inputrechercher = file
    this.serviceTache.getListeByClient(this.idUser).subscribe(
      {
        next: (data) => {
          if (this.inputrechercher) {
            this.listeOperation = data.filter(re => re.status != "Traitée" && re.codeTache.toLowerCase().includes(this.inputrechercher.toLowerCase()))
            this.index = this.listeOperation.length
            console.log(this.index)
          } else this.listeOperation = data.filter(re => re.status != "Traitée")
        }, error: (error) => {

        }
      }
    );
  }
  getTaches() {
    this.serviceTache.getListeByClient(this.idUser).subscribe(
      {
        next: (data) => {
          this.listeOperation = data.filter((res) => {
            return res.status != "Traitée"
          })
          this.index = data.length
          console.log(this.index)
        }
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListOperation } from 'src/app/admin/model/listeTache.model';
import { TachesService } from 'src/app/services/taches/taches.service';
import { Reception } from '../model/reception.model';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';
import { interval } from 'rxjs';
@Component({
  selector: 'app-liste-taches',
  templateUrl: './liste-taches.component.html',
  styleUrls: ['./liste-taches.component.scss']
})
export class ListeTachesComponent implements OnInit {
  listeOperation!: Array<ListOperation>
  reception: Reception = new Reception();
  client!: any
  inputrechercher!: number
  constructor(private sevichetache: TachesService, private user: UtilisateurService) { }
  ngOnInit(): void {
    interval(1000).subscribe(() => {
      this.getListeTache();
    })
    this.getClieent();

  }
  getClieent() {
    this.user.listUtilisateur().subscribe(
      {
        next: (data) => {
          this.client = data.filter((client: { role: string; }) => {
            return client.role == "CLIENT"
          });
        }
      }
    )
  }
  getListeTache() {
    this.sevichetache.getListe().subscribe({
      next: (data) => {
        this.listeOperation = data.filter((res) => {
          return res.status == "En instance";
        })
      }
    })
  }/*
  selectByClient(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value
    this.inputrechercher = parseInt(value)
    console.log(this.inputrechercher)
    this.sevichetache.getListe().subscribe(
      {
        next: (data) => {
          this.listeOperation = data.filter(op => {
            if (this.inputrechercher == 0) {
              return op;
            }
            return op.user.id == this.inputrechercher;
          })
        }
      }
    )
  }*/
  test() {
    const date = new Date();
    const jour = date.getDate()
    const dadeVrais = date.toLocaleDateString("fr").replace("/", "-").replace("/", "-");
  }
}

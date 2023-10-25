import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TraiterService } from 'src/app/services/traiter/traiter.service';
import { TachesService } from 'src/app/services/taches/taches.service';
interface OperationEntree {
  id: number;
  description: string;
  priority: string;
  idUser: number;
  fileName: string;

}

@Component({
  selector: 'app-telecharger-of-offiche',
  templateUrl: './telecharger-of-offiche.component.html',
  styleUrls: ['./telecharger-of-offiche.component.scss']
})
export class TelechargerOfOfficheComponent implements OnInit {
  idOperation!: number
  operation!: any
  operationSingle!: OperationEntree
  codeTache!: string
  description!: string
  constructor(route: ActivatedRoute, private serviceTraiter: TraiterService, private serviceOperation: TachesService) {
    this.idOperation = route.snapshot.params['id'];
    serviceOperation.getListe().subscribe({
      next: (data) => {
        this.operation = data.filter((res) => {
          return res.id == this.idOperation;
        })
        this.codeTache = this.operation[0].codeTache
        this.description = this.operation[0].description
      }
    })

  }
  ngOnInit(): void {
  }
  teleChargerDoc() {
    this.serviceTraiter.telechargerDoc(this.idOperation).subscribe({
      next: (data) => {
        console.log(data)
        let blob: Blob = data.body as Blob
        let a = document.createElement('a');
        a.download = this.codeTache;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      }
    });
  }
  teleChargerAudio() {
    this.serviceTraiter.telechargerAudio(this.idOperation).subscribe({
      next: (data) => {
        console.log(data)
        let blob: Blob = data.body as Blob
        let a = document.createElement('a');
        a.download = this.codeTache;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      }
    });
  }

}

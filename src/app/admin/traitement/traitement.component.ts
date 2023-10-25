import { Component, OnInit } from '@angular/core';
import { TraiterService } from 'src/app/services/traiter/traiter.service';

@Component({
  selector: 'app-traitement',
  templateUrl: './traitement.component.html',
  styleUrls: ['./traitement.component.scss']
})
export class TraitementComponent implements OnInit {
  traitemeNoValider: any

  constructor(private serviceTraiter: TraiterService) { }

  ngOnInit(): void {
    this.getListeNovalider()
  }
  getListeNovalider() {
    this.serviceTraiter.listTraitementNoValider().subscribe({
      next: (data) => {
        console.log(data)
        this.traitemeNoValider = data
      }
    })
  }
  accepterTraitemen(id: number) {
    this.serviceTraiter.traitementValider(id).subscribe({
      next: (data) => {
        window.location.reload()
      }
    })
  }
  telechargeFile(id: number, codeTache: string) {
    this.serviceTraiter.telechargerDocTraiter(id).subscribe({
      next: (data) => {
        let blob: Blob = data.body as Blob
        let a = document.createElement('a');
        a.download = codeTache;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      }
    });
  }

}

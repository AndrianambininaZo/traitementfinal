import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TraiterService } from 'src/app/services/traiter/traiter.service';
import { ListTraitement } from '../model/traitemment.mode';
import { interval } from 'rxjs';

@Component({
  selector: 'app-taches-jour',
  templateUrl: './taches-jour.component.html',
  styleUrls: ['./taches-jour.component.scss']
})
export class TachesJourComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollContainer', { static: true }) scrollContainer: ElementRef | undefined;
  listByDay: Array<ListTraitement> | undefined
  errorMessage!: string

  constructor(private servicetraiter: TraiterService) { }

  ngOnInit(): void {
    interval(1000).subscribe(() => {
      this.getTotalParJour()
      this.scrollToBottom()
    })

  }
  getTotalParJour() {
    this.servicetraiter.listTraitement().subscribe(
      {
        next: (data) => {
          this.listByDay = data.filter((res) => {
            const date = new Date();
            const jour = date.getDate()
            const dadeVrais = date.toLocaleDateString("fr").replace("/", "-").replace("/", "-");
            return res.date == dadeVrais
          })
        }, error: (err) => {
          this.errorMessage = err.message
        }
      }
    )
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }
  scrollToBottom() {
    const scrollContainer = this.scrollContainer?.nativeElement
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
  }

}

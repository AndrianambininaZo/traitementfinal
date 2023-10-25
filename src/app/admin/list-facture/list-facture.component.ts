import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { TraiterService } from 'src/app/services/traiter/traiter.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-facture',
  templateUrl: './list-facture.component.html',
  styleUrls: ['./list-facture.component.scss']
})
export class ListFactureComponent implements OnInit {
  //@ViewChild('scrollContainer', { static: true }) scrollContainer: ElementRef | undefined;
  videoUrl!: string;
  test: string = "./../../../assets/images/testv.mp4"


  constructor(private http: HttpClient, private traiterService: TraiterService, private sanitizer: DomSanitizer) {
    this.getVideoUrl();
  }


  ngOnInit(): void {


  }
  getVideoUrl(): void {
    this.traiterService.getVideoUrl().subscribe((response: Blob) => {
      const videoBlob = new Blob([response], { type: 'video/mp4' });
      this.videoUrl = URL.createObjectURL(videoBlob);
      console.log(this.videoUrl)
    });
  }
}


import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navBackOffiche, navClient, navData } from './data';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';
import { UtilisateurAuthService } from 'src/app/services/utilisateur/utilisateur-auth.service';
interface NavToggle {
  screenWidth: number;
  openNav: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  @Output() onToggleNav: EventEmitter<NavToggle> = new EventEmitter();
  openNav = true;
  data = navData;
  dataClient = navClient;
  dataBackOffiche = navBackOffiche;
  screenWidth = 0;
  role: any


  constructor(public servi: UtilisateurService, private serviceAuth: UtilisateurAuthService) {
    this.role = this.serviceAuth.getRole();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 600) {
      this.openNav = false;
      this.onToggleNav.emit({ openNav: this.openNav, screenWidth: this.screenWidth });
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }
  onOpenNav(): void {
    this.openNav = !this.openNav;
    this.onToggleNav.emit({ openNav: this.openNav, screenWidth: this.screenWidth });
  }
  onColseNav(): void {
    this.openNav = false;
    this.onToggleNav.emit({ openNav: this.openNav, screenWidth: this.screenWidth });
  }


}

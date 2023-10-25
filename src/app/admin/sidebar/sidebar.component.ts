import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurAuthService } from 'src/app/services/utilisateur/utilisateur-auth.service';
class User {
  id?: number;
  nom?: string;
  role?: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  openModal: boolean = false;
  user: User = new User();
  nom = this.service.getUser()
  role!: string;

  constructor(private route: Router, private service: UtilisateurAuthService) {
    this.role = service.getRole();

  }

  ngOnInit(): void {
  }
  openModaProfil(): void {
    localStorage.clear();
    this.route.navigate(['/'])

  }
  deconnexion() {
    localStorage.clear();
    this.route.navigate(['/connexion_arosaina'])
  }
  deconnexionClient() {
    localStorage.clear();
    this.route.navigate(['/'])

  }
}

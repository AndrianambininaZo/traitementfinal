import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../admin/model/login.model';
import { UtilisateurService } from '../services/utilisateur/utilisateur.service';
import { UtilisateurAuthService } from '../services/utilisateur/utilisateur-auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-for-admin',
  templateUrl: './login-for-admin.component.html',
  styleUrls: ['./login-for-admin.component.scss']
})
export class LoginForAdminComponent implements OnInit {
  loginForm!: FormGroup
  message!: string
  login: Login = new Login();

  constructor(private fb: FormBuilder, private services: UtilisateurService,
    private toastr: ToastrService,
    private authService: UtilisateurAuthService,
    private route: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control("", [Validators.email, Validators.required]),
      password: this.fb.control("", [Validators.required, Validators.minLength(6), Validators.maxLength(14)]),
    })
  }
  authentification() {
    if (this.loginForm.valid) {
      this.login = this.loginForm.value
      this.login.codeEntree = "isBackAndAdmin"
      this.services.authentificationIsAdmin(this.login).subscribe({
        next: (res) => {
          if (res.user.status == 1) {
            if (res.user.role[0].nomRole == "ADMIN") {
              this.authService.setUser(res.user.nom);
              this.authService.setRole(res.user.role[0].nomRole);
              this.authService.setToken(res.jwtToken);
              this.authService.setIdUser(res.user.id)
              this.route.navigate(['/my']);
              this.toastr.success('Connexion réussie', 'Succès');

            } else if (res.user.role[0].nomRole == "BACKOFFICE") {
              this.authService.setUser(res.user.nom);
              this.authService.setRole(res.user.role[0].nomRole);
              this.authService.setToken(res.jwtToken);
              this.authService.setIdUser(res.user.id)
              this.route.navigate(['/my/backoffice']);
              this.toastr.success('Connexion réussie', 'Succès');
            } else {
              this.toastr.warning("Votre compte et bloquee veillez rappeeller le service client", "Erreur")
              return;
            }
          }
        }, error: (err) => {
          if (err.status == 500) {
            this.toastr.error("Verifir email ou le mot depass saisie", "Authentification erreur")
          } else {
            this.toastr.error("Le serveur ne repond pas", "Erreur serveur")
          }

        }
      })

    } else {
      this.toastr.error("Remplir tous le champs et verifier le donne saisie", "Erreur")
    }
  }
}



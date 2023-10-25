import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';
import { Utilisateur, UtilisateurRequest, addRoleByUserRequest } from '../model/utilisateur.model';
import { interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TraiterService } from 'src/app/services/traiter/traiter.service';
class Role {
  role?: string;
}

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {
  totalPageItems: any;
  page: number = 1;
  modal: boolean = true;
  formUtilisateur!: FormGroup;
  formModifier!: FormGroup;
  disableForm: boolean = true
  disableFormModifier: boolean = false
  utilisateur: UtilisateurRequest = new UtilisateurRequest();
  user!: any
  userModif: Utilisateur = new Utilisateur();
  role: Role = new Role()
  constructor(private test: TraiterService, private services: UtilisateurService, private fb: FormBuilder, private http: HttpClient) {

  }

  ngOnInit(): void {
    this.getUtilisateur();
    this.formUtilisateur = this.fb.group({
      nom: this.fb.control("", [Validators.required, Validators.minLength(2)]),
      email: this.fb.control("", [Validators.required, Validators.email]),
      password: this.fb.control("", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      role: this.fb.control("", Validators.required),
    })

  }
  getUtilisateur() {
    this.test.receptionGetUtilisateur().subscribe({
      next: (data) => {
        this.user = data
      }
    });

  }

  enregitrerUtilisateur() {
    if (this.formUtilisateur.valid) {
      this.utilisateur = new UtilisateurRequest();
      this.utilisateur.nom = this.formUtilisateur.controls['nom'].value
      this.utilisateur.email = this.formUtilisateur.controls['email'].value
      this.utilisateur.password = this.formUtilisateur.controls['password'].value
      this.role = this.formUtilisateur.value
      console.log(this.role.role)
      console.log(this.utilisateur)
      this.test.addUtilisateur(this.utilisateur).subscribe(
        data => {
          const addRoleByUser = {
            role: this.role.role,
            email: data.email
          }
          this.test.addRolleByUser(addRoleByUser).subscribe(
            {
              next: (data) => {
                this.getUtilisateur();
                this.modal = true;
                this.formUtilisateur.reset(0);
              }, error: (err) => {
                this.modal = false
              }
            }
          )
        }
      );

    }
  }
  openModal() {
    this.modal = false
  }
  annuller() {
    this.formUtilisateur.reset(0);
    this.modal = true
  }
  desactiverCompter(id: any) {
    const idParse = parseInt(id);
    this.test.setStatusUser(id).subscribe({
      next: (data) => {
        this.getUtilisateur();
      }, error: (err) => {
        console.log(err);
      }
    })

  }
  modifierUtilisateur(user: Utilisateur) {
    this.disableForm = false
    this.disableFormModifier = true;
    this.userModif.email = user.email
    console.log(user.password)
    this.formModifier = this.fb.group({
      id: this.fb.control(user.id),
      nom: this.fb.control(user.nom),
      email: this.fb.control(user.email),
      password: this.fb.control(user.password),
      role: this.fb.control(user.role?.toLowerCase()),
      status: this.fb.control(user.status)
    })
  }

}

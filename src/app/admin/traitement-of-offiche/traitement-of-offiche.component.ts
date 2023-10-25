import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TraiterService } from 'src/app/services/traiter/traiter.service';
import { UtilisateurAuthService } from 'src/app/services/utilisateur/utilisateur-auth.service';
import { Traitemment } from '../model/traitemment.mode';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-traitement-of-offiche',
  templateUrl: './traitement-of-offiche.component.html',
  styleUrls: ['./traitement-of-offiche.component.scss']
})
export class TraitementOfOfficheComponent implements OnInit {
  idOperation!: number
  codeTache!: string
  isValidation: boolean = false
  messageIsValider!: string
  formTraitement!: FormGroup
  public fileOperationDoc: any = File;
  public fileName: any = File.name;
  role: any = this.utilisateurService.getRole();
  idUser: any = this.utilisateurService.getIdUser()
  constructor(private toastr: ToastrService, private router: Router, private tacheService: TraiterService, private route: ActivatedRoute, private fb: FormBuilder, private utilisateurService: UtilisateurAuthService) {
    this.idOperation = route.snapshot.params['id'];
    this.codeTache = this.route.snapshot.queryParamMap.get('code')!;
  }

  ngOnInit(): void {
    this.formTraitement = this.fb.group({
      description: this.fb.control(""),
      audio: this.fb.control("", [Validators.required]),
    })
    console.log(this.codeTache)
  }

  onSelectFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files as FileList
    this.fileOperationDoc = file[0];
    this.fileName = file[0].name
    this.validationTraitement(this.fileName)
  }
  validationTraitement(code: string): boolean {
    console.log(code)
    if (code == this.codeTache + ".docx") {
      this.isValidation = true
      this.messageIsValider = ""
      console.log(true)
      return true;
    } else {
      console.log(false)
      this.isValidation = false
      this.messageIsValider = "Verifier le document selectioner! Chercher le doc " + this.codeTache + ".docx"
      return false;
    }

  }
  ajoutrTraitement(submitForm: FormGroup) {
    if (submitForm.valid && this.isValidation) {
      const formData = new FormData();
      formData.append("files", this.fileOperationDoc, this.fileName);
      const operationEntre = new Traitemment();
      operationEntre.audio = this.formTraitement.controls['audio'].value
      operationEntre.id = this.idUser
      operationEntre.idReception = this.idOperation
      console.log(operationEntre)
      this.tacheService.creerTraitemment(operationEntre).subscribe(
        data => {
          this.tacheService.envoyerDoc(formData, data).subscribe({
            next: (data) => {
              submitForm.reset(0);
            }
          })
          this.toastr.success('Traitemment effectuer', 'Succès');
          this.router.navigateByUrl("/my/backoffice")
        }
      )
      // window.location.href = "http://localhost:4200/my";


    }
  }


}

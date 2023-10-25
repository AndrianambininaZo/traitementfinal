import { Component, OnInit } from '@angular/core';
import { OperationEntree } from '../model/operationEntree.mode';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TachesService } from 'src/app/services/taches/taches.service';
import { Router } from '@angular/router';
import { UtilisateurAuthService } from 'src/app/services/utilisateur/utilisateur-auth.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-creertache',
  templateUrl: './creertache.component.html',
  styleUrls: ['./creertache.component.scss']
})
export class CreertacheComponent implements OnInit {
  operationEntre: OperationEntree = new OperationEntree();
  formOperation!: FormGroup;
  public fileOperationDoc: any = File;
  public fileOperationAudio: any = File;
  public fileName: any = File.name;
  public fileName2: any = File.name;
  role: any = this.utilisateurService.getRole();
  idUser: any = this.utilisateurService.getIdUser();

  constructor(private tacheService: TachesService, private fb: FormBuilder, private toastr: ToastrService,
    private router: Router, private utilisateurService: UtilisateurAuthService) { }

  ngOnInit(): void {
    this.formOperation = this.fb.group({
      description: this.fb.control("", [Validators.required]),
      priority: this.fb.control("", [Validators.required]),
    })
  }
  onSelectFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files as FileList
    this.fileOperationDoc = file[0];
    this.fileName = file[0].name
    console.log(this.fileOperationDoc)
  }
  onSelectFileAudio(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files as FileList
    this.fileOperationAudio = file[0];
    this.fileName2 = file[0].name
    console.log(this.fileOperationAudio)
  }
  ajouterTache(submitForm: FormGroup) {

    Swal.fire({
      title: 'Ajout nouveau tache',
      text: 'Vous ȇtes sur(e) ?',
      width: '350px',
      heightAuto: true,
      showCancelButton: true,
      confirmButtonColor: 'rgb(36, 168, 43)',
      cancelButtonColor: 'red',
      confirmButtonText: 'OUI',
      cancelButtonText: 'ANNULLER'
    }).then((resultat) => {
      if (resultat.value) {
        if (submitForm.valid) {
          this.operationEntre = submitForm.value;
          this.operationEntre.fileName = this.fileName
          this.operationEntre.idUser = this.idUser;
          console.log(this.operationEntre);
          const formData = new FormData();
          const formData1 = new FormData();
          formData.append("files", this.fileOperationDoc, this.fileName);
          formData1.append("files", this.fileOperationAudio, this.fileName2);
          this.tacheService.creerTaches(this.operationEntre).subscribe(
            data => {
              this.tacheService.creerDoc(formData, data).subscribe({
                next: (data) => {
                  this.tacheService.creerDoc(formData1, data).subscribe();
                }, error: (err) => {
                  this.tacheService.creerDoc(formData1, data).subscribe();
                }
              });

              submitForm.reset(0);
              this.toastr.success('Creation effectuer', 'Succès');
              this.router.navigateByUrl("/my/client/tache");
            }
          );
          // window.location.href = "http://localhost:4200/my";
        }
        Swal.fire({
          title: '',
          text: 'En registrement avec succes',
          width: '350px',
        })

      } else if (resultat.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: '',
          text: 'Annulation terminer',
          width: '350px',
        })
      }
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-apros',
  templateUrl: './apros.component.html',
  styleUrls: ['./apros.component.scss']
})
export class AprosComponent implements OnInit {
  modalRodin: boolean = false
  modalZo: boolean = false
  fomrMail!: FormGroup

  constructor(private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fomrMail = this.fb.group({
      email: this.fb.control("", [Validators.required, Validators.email]),
      object: this.fb.control("", [Validators.required]),
      message: this.fb.control("", [Validators.required])
    })
  }
  openModalIsRodin() {
    this.modalRodin = true
    this.modalZo = false
  }
  closeModalIsRodin() {
    this.modalRodin = false
  }
  openModalIsZo() {
    this.modalRodin = false
    this.modalZo = true
  }
  closeModalIsZo() {
    this.modalZo = false
  }

  handleMessage() {
    this.toastr.success("Message envoyer", "Success");
    this.fomrMail.reset(0)
  }

}

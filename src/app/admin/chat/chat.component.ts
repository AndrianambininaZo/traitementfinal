import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, interval, map } from 'rxjs';
import { ChatService } from 'src/app/services/chat/chat.service';
import { UtilisateurAuthService } from 'src/app/services/utilisateur/utilisateur-auth.service';
import { ChatGroupRequest, ChatRequest, GetChat } from '../model/chatRequest.mode';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  // @ViewChild('scrollContainer', { static: true }) scrollContainer: ElementRef | undefined;
  nomExpediteur!: any
  User: any;
  utilisateur: any
  listGroup: any
  idUser!: number
  formMessage!: FormGroup
  formMessageByGroup !: FormGroup
  checkClient: any
  listMessage: any
  listMessageByGroup: any
  idDestinateur!: number
  nomDestinateur!: string
  selected: boolean = false
  nomGroupCheck!: string
  number!: Observable<number>
  listUserMessage: any
  testIsfalse: boolean = false
  constructor(private fb: FormBuilder, private service: ChatService, private utilisateurService: UtilisateurAuthService) {
    this.idUser = parseInt(utilisateurService.getIdUser()!)
    service.getUtilisateurById(this.idUser).subscribe({
      next: (data) => {
        this.nomDestinateur = data.nom!
      }
    })
    this.nomGroupCheck = this.getNomGrougCheck()!
    service.getUtilisateurByEmail(this.checkUser()!).subscribe({
      next: (data) => {
        this.idDestinateur = data.id!
      }
    })
  }

  ngOnInit(): void {
    this.getUtilisateur()
    this.geListGroup()
    this.formMessage = this.fb.group({
      message: this.fb.control("", [Validators.required])
    });
    this.formMessageByGroup = this.fb.group({
      messageGroup: this.fb.control("", [Validators.required])
    });
    interval(1000).subscribe(() => {
      this.getMessage()
      this.listUserIsLengthMessage()

    })
    this.getMessageByGroup();
    this.checkClient = this.checkUser();
    this.nomExpediteur = this.checkUserNom()
  }



  getUtilisateur() {
    this.service.getUtilisateur().subscribe({
      next: (data) => {
        this.utilisateur = data
        this.User = this.utilisateur.filter((res: { role: any, id: number }) => {
          return res.role[0].nomRole != "CLIENT" && res.id != this.idUser
        })
      }
    })
  }
  selectUser(id: number, email: string) {
    localStorage.setItem("des", email);
    this.checkClient = this.checkUser();
    this.selected = false
    this.modifierMessageVue(id);
    this.service.getUtilisateurById(id).subscribe({
      next: (data) => {
        localStorage.setItem("desNom", data.nom!);
        this.idDestinateur = data.id!
        this.nomExpediteur = this.checkUserNom();
        this.getMessage()
      }
    });
  }
  ajouterMessage() {
    const email = localStorage.getItem("des")!
    if (email) {
      this.service.getUtilisateurByEmail(email).subscribe({
        next: (data) => {
          this.idDestinateur = data.id!
          this.handleChat()
        }, error: (err) => {
          console.log(err)
        }
      })

    } else {
      alert("")
    }

  }
  checkUser() {
    return localStorage.getItem("des");
  }
  checkUserNom() {
    return localStorage.getItem("desNom");
  }
  getMessage() {
    this.service.getMessages().subscribe({
      next: (data) => {
        this.listMessage = data.filter((res: any) => {
          return (res.idExp == this.idDestinateur && res.userDes.id == this.idUser) || (res.idExp == this.idUser && res.userDes.id == this.idDestinateur)
        })
      }, error: (err) => {
        console.log(err)
      }
    })
  }
  geListGroup() {
    this.service.getListGroup().subscribe({
      next: (data) => {
        console.log(data)
        this.listGroup = data.filter((group: { users: any[]; }) => group.users.some(user => user.id === this.idUser))
      }, error: (err) => {
        console.log(err)
      }
    })
  }
  handleChat() {
    const data = new ChatRequest()
    data.idExp = this.idDestinateur
    data.message = this.formMessage.controls['message'].value
    data.idUserDes = this.idUser
    data.idUserExp = this.idDestinateur
    this.service.ajouterMessage(data).subscribe({
      next: (data) => {
        this.getMessage()
        this.formMessage.reset(0)
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  // Info by group
  selectGroup(id: number, nom: string) {
    localStorage.setItem("idGroupBychat", id.toString())
    localStorage.setItem("nomGroupBychat", nom)
    this.selected = true
    this.nomGroupCheck = this.getNomGrougCheck()!
    this.getIdGroupCheck()
    this.getMessageByGroup();

  }

  ajouterMessageGroup() {
    const data = new ChatGroupRequest()
    data.idGroup = parseInt(this.getIdGroupCheck()!)
    data.idUser = this.idUser
    data.message = this.formMessageByGroup.controls['messageGroup'].value
    this.service.ajouterMessageBychat(data).subscribe({
      next: (data) => {
        this.formMessageByGroup.reset(0)
        this.getMessageByGroup()
      }, error: (err) => {
        alert("erreur via serveur")
      }
    })

  }
  getNomGrougCheck() {
    return localStorage.getItem("nomGroupBychat")
  }
  getIdGroupCheck() {
    return localStorage.getItem("idGroupBychat");
  }
  getMessageByGroup() {
    const idGroup = parseInt(this.getIdGroupCheck()!);
    if (idGroup) {

      this.service.getMessagesByGroup(idGroup).subscribe({
        next: (data) => {
          this.listMessageByGroup = data
        }, error: (err) => {
          console.log(err)
        }
      })
    }

  }
  /*
    public teste(id: number) {    
       this.service.lengthMessaByDes(2, this.idUser);
    }
  
    public testa(idExp: number): Observable<number> {
      this.service.lengthMessaByDes(idExp, this.idUser).subscribe({
        next: (data) => {
          console.log(data)
        }
      })
      return this.number;
  
    }*/
  listUserIsLengthMessage() {
    this.service.listUserIsLengthMessage(this.idUser).subscribe({
      next: (data) => {
        this.listUserMessage = data

      }, error: (err) => {
        console.log(err)
      }
    })
  }
  public test(id: number): number {
    //console.log(this.listUserMessage)
    // console.log(this.listUserMessage.find((res: { idExp: number; }) => res.idExp == id).sumMessage)
    if (this.listUserMessage.length == 0) {
      // console.log(this.listUserMessage.find((res: { idExp: number; }) => res.idExp == id).sumMessage)
      return 0;
    } else {
      var elementExiste = this.listUserMessage.some((element: { idExp: number; }) => {
        return element.idExp === id;
      });
      if (elementExiste) {
        //console.log(this.listUserMessage.find((res: { idExp: number; }) => res.idExp == id).sumMessage)
        return this.listUserMessage.find((res: { idExp: number; }) => res.idExp == id).sumMessage;
      } else {
        return 0;
      }
      //console.log(this.listUserMessage.find((res: { idExp: number; }) => res.idExp == id).sumMessage)

    }

  }
  modifierMessageVue(idDes: number) {
    this.service.modifierMessageVue(idDes, this.idUser).subscribe()
  }
  //scrolle en bas  automatique

  /* ngAfterViewInit() {
     this.scrollToBottom();
   }
   scrollToBottom() {
     const scrollContainer = this.scrollContainer?.nativeElement;
     scrollContainer.scrollTop = scrollContainer.scrollHeight;
   }*/
}

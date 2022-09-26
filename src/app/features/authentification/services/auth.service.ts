import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Token } from "@angular/compiler";
import { Injectable } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MenuItem, MessageService } from "primeng/api";
import { empty, Subject } from "rxjs";
import { AppComponent } from "src/app/app.component";
import { environment } from 'src/environments/environment'
import { MembersConnected, TokenDTO } from "../Models";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private _Http : HttpClient, private _router : Router, private _messageService : MessageService) { }

  MemberRegistered : TokenDTO | null = null
  MemberConnected : MembersConnected = {Token : '', Pseudo : '', Elo : '', Connect : false, roleID : 2}

  StateSubjectMemberConnect : Subject<MembersConnected> = new Subject<MembersConnected>();  
  StateSubjectItemMenu : Subject<MenuItem[]> = new Subject<MenuItem[]>();  


  StateSubjectCheckPseudo : Subject<string> = new Subject<string>();
  pseudo! : string

  item : MenuItem[] = []

 

  ngOnInit(): void
  {

  }

  login(value : any){
    return this._Http.post<TokenDTO>(environment.api_base_url + 'Auth', value).subscribe(
      {
        next : (data: TokenDTO) => {this.MemberRegistered  =  data,
          localStorage.setItem('Token',this.MemberRegistered.token),
          localStorage.setItem('Id', this.MemberRegistered.membersRegistered.id)
          localStorage.setItem('Pseudo', this.MemberRegistered.membersRegistered.pseudo)
          localStorage.setItem('Elo', this.MemberRegistered.membersRegistered.elo.toString())
          localStorage.setItem('RoleID', this.MemberRegistered.membersRegistered.roleID.toString())
          localStorage.setItem('Connect', 'true'), this.GetMemberConnect(), this.GetMenu()
          ,this._router.navigate([''])},
        error : (response) => {this._messageService.add({severity:'error', summary: response.error, life : 3000});
        
        }

        // 
      }
  )}

  GetMemberConnect(){
    if(localStorage.length !== 0){    
        this.MemberConnected.Token = localStorage.getItem('Token');
        this.MemberConnected.Pseudo = localStorage.getItem('Pseudo');
        this.MemberConnected.Elo = localStorage.getItem('Elo');
        let role = localStorage.getItem('RoleID')
        if(role !== null) this.MemberConnected.roleID = parseInt(role);
        if(localStorage.getItem('Connect') === 'true'){
          this.MemberConnected.Connect = true
        }
        else this.MemberConnected.Connect = false
        this.StateSubjectMemberConnect.next(this.MemberConnected)
      } 
      else{
        this.MemberConnected = {Token : '', Pseudo : '', Elo : '', Connect : false, roleID : 2}
        this.StateSubjectMemberConnect.next(this.MemberConnected)
      }
  }

  LogoutMember(){
    localStorage.clear()
    this.GetMemberConnect()
    this.GetMenu()
  }

  NewMembers(value : FormGroup){
    return this._Http.post<string>(environment.api_base_url + 'Members', value.value).subscribe(
      {
        next : () => {this._router.navigate([''])},
        error : (response) => {this._messageService.add({severity:'error', summary: response.error, life : 3000})}
      })
  }

  PseudoCheck(value : any){
    return this._Http.head<string>(environment.api_base_url + 'Members/PseudoCheck' + '?pseudo=' + value).subscribe(
      {
        next : () => {this.pseudo = 'ddd',this.StateSubjectCheckPseudo.next(this.pseudo);
        },
        error : (response) => {this._messageService.add({severity:'error', summary: response.error, life : 3000});
        }
      })
  }


  GetMenu(){
    this.item = [
      {
          label:'Accueil',
          icon:'pi pi-fw pi-home',
          routerLink : ['']
      },
      {
          label:'Tournois',
          icon:'pi pi-fw pi-box',
          routerLink : ['tournament']
      },
      {
        label:'Membres',
        icon:'pi pi-fw pi-user',
        visible : this.MemberConnected.roleID == 1 ? true : false,
        items : [
        { 
          label:'Ajouter un membre',
          icon:'pi pi-fw pi-user-plus',
          routerLink : ['authentification', 'registration']
        }
        ]
      },
    ];
    this.StateSubjectItemMenu.next(this.item)
  }

  

}

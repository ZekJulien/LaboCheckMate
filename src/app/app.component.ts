import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { connect } from 'rxjs';
import { MembersConnected } from './features/authentification/Models';
import { AuthService } from './features/authentification/services/auth.service';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  MemberConnected! : MembersConnected 
  items: MenuItem[]  = []
  isConnected! : boolean


  constructor(private _AuthServices : AuthService) {
      
  }

 
  ngOnInit() {

    this._AuthServices.StateSubjectMemberConnect.subscribe({
      next : (data : MembersConnected) => this.MemberConnected = data
    })
    
    this._AuthServices.StateSubjectItemMenu.subscribe({
      next : (data : MenuItem[]) => this.items = data
    })
    
    this.GetMembersConnect()
    this.GetMenu()
    
}


GetMenu(){
  this._AuthServices.GetMenu()
}

GetMembersConnect(){
  this._AuthServices.GetMemberConnect()
}

LogoutMember(){
  this._AuthServices.LogoutMember()
}


}

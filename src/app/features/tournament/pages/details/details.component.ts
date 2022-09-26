import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { date } from '@rxweb/reactive-form-validators';
import { timeout } from 'rxjs';
import { MembersConnected } from 'src/app/features/authentification/Models';
import { AuthService } from 'src/app/features/authentification/services/auth.service';
import { TournamentDetailsDTO } from '../../models';
import { TournamentService } from '../../services/tournament.service';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  TournamentDetails! : TournamentDetailsDTO
  MemberConnected! : MembersConnected 
  MemberSubscribe : boolean = false
  Charge : boolean = true

  constructor(private _router : Router,private _tournamentServices : TournamentService,private _ActivatedRoute : ActivatedRoute, private _authServices : AuthService)
  { 
    
  }


  ngOnInit(): void {
    this._tournamentServices.StateSubjectTournamentDetails.subscribe({
      next : (data : TournamentDetailsDTO) => this.TournamentDetails = data
    })
    this._authServices.StateSubjectMemberConnect.subscribe({
      next : (data : MembersConnected) => this.MemberConnected = data
    })

    this.GetDetails()
    this.GetMemberConnect()
    
  }

  ngAfterViewChecked(){
    this.Checksubscribe(this.MemberConnected.Pseudo)
  }

  test(){
    console.log(this.Charge);
  }

  GetMemberConnect(){
    this._authServices.GetMemberConnect()
  }

  GetDetails(){
    this._tournamentServices.GetDetails(this._ActivatedRoute.snapshot.params['id'])
  }

  Checksubscribe(pseudo : string | null | undefined){
    if(this.TournamentDetails !== null || pseudo !== null || pseudo !== undefined){

      for (let index = 0; index < this.TournamentDetails.membersRegistered.length; index++) {
        if(this.TournamentDetails.membersRegistered[index].pseudo === pseudo){
          this.MemberSubscribe = true
          break;
        }
        this.MemberSubscribe = false
      }
      if(this.TournamentDetails.membersRegistered.length === 0) this.MemberSubscribe = false;
    }
  }

  SubscribeToTournament(value : string){
    this.TournamentDetails = {
      id:this.TournamentDetails.id,
      categoryID : this.TournamentDetails.categoryID,
      location : this.TournamentDetails.location,
      maxELO : this.TournamentDetails.maxELO,
      maxNumberPlayers : this.TournamentDetails.maxNumberPlayers,
      membersRegistered : this.TournamentDetails.membersRegistered,
      minELO : this.TournamentDetails.minELO,
      minNumberPlayers : this.TournamentDetails.minNumberPlayers,
      name : this.TournamentDetails.name,
      registrationEndDate : this.TournamentDetails.registrationEndDate,
      round : this.TournamentDetails.round,
      statusID : this.TournamentDetails.statusID,
      tournamentCreateDate : this.TournamentDetails.tournamentCreateDate,
      tournamentUpdateDate : this.TournamentDetails.tournamentUpdateDate,
      womenOnly : this.TournamentDetails.womenOnly,
    }
    this._tournamentServices.SubscribeToTournamentDetails(value)
  }

  UnSubscribeFromTournament(value : string){
    this.TournamentDetails = {
      id:this.TournamentDetails.id,
      categoryID : this.TournamentDetails.categoryID,
      location : this.TournamentDetails.location,
      maxELO : this.TournamentDetails.maxELO,
      maxNumberPlayers : this.TournamentDetails.maxNumberPlayers,
      membersRegistered : this.TournamentDetails.membersRegistered,
      minELO : this.TournamentDetails.minELO,
      minNumberPlayers : this.TournamentDetails.minNumberPlayers,
      name : this.TournamentDetails.name,
      registrationEndDate : this.TournamentDetails.registrationEndDate,
      round : this.TournamentDetails.round,
      statusID : this.TournamentDetails.statusID,
      tournamentCreateDate : this.TournamentDetails.tournamentCreateDate,
      tournamentUpdateDate : this.TournamentDetails.tournamentUpdateDate,
      womenOnly : this.TournamentDetails.womenOnly,
    }
    this._tournamentServices.UnSubscribeFromTournamentDetails(value)
  }

  CountPlayers(){
    this.TournamentDetails.membersRegistered.length
  }



}

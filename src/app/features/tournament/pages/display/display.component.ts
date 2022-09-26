import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MembersConnected } from 'src/app/features/authentification/Models';
import { AuthService } from 'src/app/features/authentification/services/auth.service';
import { TournamentDTO } from '../../models';
import { TournamentService } from '../../services/tournament.service';

@Component({
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  TournamentList : TournamentDTO[] = []
  MemberConnected! : MembersConnected
  CreateTournament : boolean = false

  constructor(private _tournamentServices : TournamentService, private _router : Router, private _authServices : AuthService) { }

  ngOnInit(): void {

    this._tournamentServices.StateSubjectTournamentList.subscribe({
      next : (data : TournamentDTO[]) => this.TournamentList = data
    })
    this._authServices.StateSubjectMemberConnect.subscribe({
      next : (data : MembersConnected) => this.MemberConnected = data
    })

    this.GetTournamentList();
    this.GetMember();
  }




  test(){
    console.log(this.TournamentList);
    console.log(this.MemberConnected);
    
  }
  
  GetMember(){
    this._authServices.GetMemberConnect();
  }

  GetTournamentList(){
    this._tournamentServices.GetTournamentList();
  }

  DeleteTournament(id : string){
    this._tournamentServices.DeleteTournament(id)
  }

  GetDetails(id : string){
    this._router.navigate(['tournament/details/' + id]);
  }

  SubscribeToTournament(value : string){
    this._tournamentServices.SubscribeToTournament(value);
  }

  UnSubscribeFromTournament(value : string){
    this._tournamentServices.UnSubscribeFromTournament(value);
  }

}

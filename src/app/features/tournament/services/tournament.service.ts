import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TournamentDetailsDTO, TournamentDTO } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  TournamentList : TournamentDTO[] = []
  TournamentDetails! : TournamentDetailsDTO

  StateSubjectTournamentList : Subject<TournamentDTO[]> = new Subject<TournamentDTO[]>();
  StateSubjectTournamentDetails : Subject<TournamentDetailsDTO> = new Subject<TournamentDetailsDTO>();

  constructor(private _Http : HttpClient, private _router : Router, private _messageService : MessageService) { }

  GetTournamentList(){
    return this._Http.get<TournamentDTO[]>(environment.api_base_url + 'Tournament').subscribe(
      {
        next : (data: TournamentDTO[]) => {this.TournamentList  =  data, this.StateSubjectTournamentList.next(this.TournamentList)},
        error : (response) => {this._messageService.add({severity:'error', summary: response.error, life : 3000})}
      }
  )}

  DeleteTournament(id : string){
    return this._Http.delete(environment.api_base_url + 'Tournament/' + id).subscribe(
      {
        next : () => {this.GetTournamentList(),this._messageService.add({severity:'success', summary: 'Le tournoi a bien été supprimer', life : 3000}),this.StateSubjectTournamentList.next(this.TournamentList)},
        error : (reponse) => {this._messageService.add({severity:'error', summary: reponse.error, life : 3000})}
      }
    )
  }


  GetDetails(id : string){
    
    return this._Http.get<TournamentDetailsDTO>(environment.api_base_url + 'Tournament/' + id).subscribe(
      {
        next : (data: TournamentDetailsDTO) => {this.TournamentDetails  =  data,
          this.StateSubjectTournamentDetails.next(this.TournamentDetails)
        },
        error : (response) => {this._messageService.add({severity:'error', summary: response.error, life : 3000})}
      }
  )
  }

  SubscribeToTournament(value : string){
    return this._Http.post<string>(environment.api_base_url + 'TournamentInscription/' + value, value).subscribe(
      {
        next : () => {this.GetTournamentList(), this._messageService.add({severity:'success', summary: 'Vous êtes inscris au tournoi', life : 3000})},
        error : (response) => {this._messageService.add({severity:'error', summary: response.error, life : 3000})}
      })
  }

  UnSubscribeFromTournament(value : string){
    return this._Http.delete<string>(environment.api_base_url + 'TournamentInscription/' + value).subscribe(
      {
        next : () => {this.GetTournamentList(), this._messageService.add({severity:'warn', summary: 'Vous êtes désincrits du tournoi', life : 3000})},
        error : (response) => {this._messageService.add({severity:'error', summary: response.error, life : 3000})}
      })
  }

  SubscribeToTournamentDetails(value : string){
    return this._Http.post<string>(environment.api_base_url + 'TournamentInscription/' + value, value).subscribe(
      {
        next : () => {this.GetDetails(value), this._messageService.add({severity:'success', summary: 'Vous êtes inscris au tournoi', life : 3000})},
        error : (response) => {this._messageService.add({severity:'error', summary: response.error, life : 3000})}
      })
  }

  UnSubscribeFromTournamentDetails(value : string){
    return this._Http.delete<string>(environment.api_base_url + 'TournamentInscription/' + value).subscribe(
      {
        next : () => {this.GetDetails(value), this._messageService.add({severity:'warn', summary: 'Vous êtes désincrits du tournoi', life : 3000})},
        error : (response) => {this._messageService.add({severity:'error', summary: response.error, life : 3000})}
      })
  }


}

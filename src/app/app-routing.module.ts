import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'authentification', loadChildren: () => import('./features/authentification/authentification.module').then(m => m.AuthentificationModule) },
  { path: 'tournament', loadChildren: () => import('./features/tournament/tournament.module').then(m => m.TournamentModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

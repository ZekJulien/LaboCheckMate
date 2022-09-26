import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './pages/details/details.component';
import { DisplayComponent } from './pages/display/display.component';
import { TournamentComponent } from './tournament.component';

const routes: Routes = [{ path: '', component: TournamentComponent, children : [
  { path : '' , redirectTo : 'display', pathMatch : 'full'},
  { path : 'display' ,component : DisplayComponent}
] },
  { path : 'details/:id', component : DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './authentification.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';

const routes: Routes = [{ path: '', component: AuthentificationComponent, children : [
  { path : '' , redirectTo : 'login', pathMatch : 'full'},
  { path : 'login' ,component : LoginComponent}
]},
  { path : 'registration', component : RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthentificationRoutingModule { }

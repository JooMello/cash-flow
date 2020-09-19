import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MovementsComponent} from "./pages/movements/movements.component";
import {LoginModule} from "./theme/login/login.module";
import {LoginComponent} from "./theme/login/login.component";
import {MainComponent} from "./theme/main/main.component";
import {HomeComponent} from "./pages/home/home.component";
import {PeriodsComponent} from "./pages/periods/periods.component";
import {AngularFireAuthGuard, redirectUnauthorizedTo} from "@angular/fire/auth-guard";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
  {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: MainComponent,
    children : [
      {
        path: '',
        component: HomeComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
      },
      {
        path: 'movimentos',
        component: MovementsComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
      },
      {
        path: 'periodos',
        component: PeriodsComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

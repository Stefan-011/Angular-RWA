import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RezultatComponent } from './components/rezultat/rezultat.component';
import { PoljeComponent } from './components/polje/polje.component';
import { TeamViewComponent } from './components/team-view/team-view.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { AdminPageComponent } from './components/admin-page/admin-page.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'rezultat', component: RezultatComponent, canActivate: [AuthGuard] },
  { path: 'teamview', component: TeamViewComponent, canActivate: [AuthGuard] },
  { path: 'polje', component: PoljeComponent, canActivate: [AuthGuard] },
  { path: 'panel', component: AdminPanelComponent, canActivate: [AdminGuard] },
  {
    path: 'admin_page',
    component: AdminPageComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

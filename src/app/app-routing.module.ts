import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RezultatComponent } from './rezultat/rezultat.component';
import { PoljeComponent } from './polje/polje.component';
import { TeamViewComponent } from './team-view/team-view.component';

const routes: Routes = [  
  {path:"home", component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"rezultat", component:RezultatComponent},
  {path:"teamview", component:TeamViewComponent},
  {path:"polje", component:PoljeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
 

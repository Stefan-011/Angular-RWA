import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { RezultatComponent } from './rezultat/rezultat.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [  
  {path:"home", component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"myteam", component:MyTeamComponent},
  {path:"shop", component:ShopComponent},
  {path:"rezultat", component:RezultatComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
 

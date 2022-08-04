import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoljeComponent } from './polje/polje.component';
import { RezultatComponent } from './rezultat/rezultat.component';
import { ShopComponent } from './shop/shop.component';
import { MyTeamComponent } from './my-team/my-team.component';

@NgModule({
  declarations: [
    AppComponent,
    PoljeComponent,
    RezultatComponent,
    ShopComponent,
    MyTeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { userReducer } from './store/user.reducer';
import { OtherTeamState } from './store/Otherteam.reducer';
import {EffectsModule} from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoljeComponent } from './polje/polje.component';
import { RezultatComponent } from './rezultat/rezultat.component';
import { HttpClientModule } from  '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { AppState } from './app.state';
import { OtherTeamEffects } from './store/Otherteam.effects';
import { UserEffects } from './store/user.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TeamViewComponent } from './team-view/team-view.component'

@NgModule({
  declarations: [
    AppComponent,
    PoljeComponent,
    RezultatComponent,
    HomeComponent,
    LoginComponent,
    TeamViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule ,
    CommonModule,
    StoreModule.forRoot<AppState>({user: userReducer, OtherTeam:OtherTeamState}),
    EffectsModule.forRoot([OtherTeamEffects,UserEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

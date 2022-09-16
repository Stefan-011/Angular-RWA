import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { userReducer } from './store/user.reducer';
import { OtherTeamState } from './store/Otherteam.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoljeComponent } from './components/polje/polje.component';
import { RezultatComponent } from './components/rezultat/rezultat.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { StoreModule } from '@ngrx/store';
import { AppState } from './app.state';
import { OtherTeamEffects } from './store/Otherteam.effects';
import { MyTeamEffects } from './store/myteam.effects';
import { UserEffects } from './store/user.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TeamViewComponent } from './components/team-view/team-view.component';
import { MyTeamReducer } from './store/myteam.reducer';
import { LoginReducer } from './store/login.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { LoginEffects } from './store/login.effects';
import { RezulatatEffects } from './store/rezultat.effects';
import { RezultatReducer } from './store/rezultat.reducer';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './services/auth.interceptor';
import { ShopReducer } from './store/shop.reducer';
import { PanelReducer } from './store/panel.reducer';
import { PanelEffects } from './store/panel.effect';
import { ShopEffects } from './store/shop.effects';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
@NgModule({
  declarations: [
    AppComponent,
    PoljeComponent,
    RezultatComponent,
    HomeComponent,
    LoginComponent,
    TeamViewComponent,
    DialogComponent,
    AdminPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    StoreModule.forRoot<AppState>({
      user: userReducer,
      OtherTeam: OtherTeamState,
      MyTeam: MyTeamReducer,
      Login: LoginReducer,
      Rezultat: RezultatReducer,
      Shop: ShopReducer,
      Panel: PanelReducer,
    }),
    EffectsModule.forRoot([
      OtherTeamEffects,
      UserEffects,
      MyTeamEffects,
      LoginEffects,
      RezulatatEffects,
      PanelEffects,
      ShopEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    AuthGuard,
    AdminGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { OtherTeamState } from './store/Otherteam.reducer';
import { MyTeamState } from './store/myteam.reducer';
import { UserState } from './store/user.reducer';
import { LoginState } from './store/login.reducer';
import { RezultatState } from './store/rezultat.reducer';
import { ShopState } from './store/shop.reducer';
import { PanelState } from './store/panel.reducer';
import { TestScheduler } from 'rxjs/testing';

export interface AppState {
  user: UserState;
  MyTeam: MyTeamState;
  OtherTeam: OtherTeamState;
  Login: LoginState;
  Rezultat: RezultatState;
  Shop: ShopState;
  Panel: PanelState;
}

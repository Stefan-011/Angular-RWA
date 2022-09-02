import { OtherTeamState } from './store/Otherteam.reducer';
import { MyTeamState } from './store/myteam.reducer';
import { UserState } from './store/user.reducer';
import { LoginState } from './store/login.reducer';

export interface AppState {
  user: UserState;
  MyTeam: MyTeamState;
  OtherTeam: OtherTeamState;
  Login: LoginState;
}

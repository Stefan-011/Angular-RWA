import { player } from "./models/player";
import { user } from "./models/user";
import { MyTeamState } from "./store/myteam.reducer";
import { OtherTeamState } from "./store/Otherteam.reducer";
import { UserState } from "./store/user.reducer";

export interface AppState {
    user:UserState,
    MyTeam:MyTeamState,
    OtherTeam:OtherTeamState
  }
import { user } from "./models/user";
import { OtherTeamState } from "./store/Otherteam.reducer";
import { UserState } from "./store/user.reducer";

export interface AppState {
    user:UserState;
    OtherTeam:OtherTeamState;
  }
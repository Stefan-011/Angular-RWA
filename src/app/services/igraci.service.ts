import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { player } from '../models/player';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { PanelErrorMessage } from '../Enums/PanelErrorMessage';
import { RequestResponse } from '../models/RequestResponse';

@Injectable({
  providedIn: 'root',
})
export class IgraciService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  GetAllPlayers() {
    return this.http.get<player[]>(environment.api + '/my-team');
  }

  GetTeamPlayers(TeamName: string) {
    return this.http.get<player[]>(
      environment.api + `/players/GetAllByTeam:${TeamName}`
    );
  }

  GetTeamPlayersByTeamID(TeamID: number) {
    return this.http.get<player[]>(
      environment.api + `/players/GetTeamPlayersByTeamID:${TeamID}`
    );
  }

  GetPlayernameID(id: number) {
    return this.http.get<player>(
      environment.api + `/players/GetPlayerByID:${id}`
    );
  }

  CreatePlayer(Player: player, TeamID: number) {
    return this.http.post<RequestResponse<any, PanelErrorMessage>>(
      environment.api + `/players/CreatePlayer/:${TeamID}`,
      Player
    );
  }

  EditPlayer(Player: player, TeamID: number) {
    return this.http.put<RequestResponse<any, PanelErrorMessage>>(
      environment.api + `/players/EditPlayer/:${TeamID}`,
      Player
    );
  }

  DeletePlayer(id: number) {
    return this.http.delete<RequestResponse<any, PanelErrorMessage>>(
      environment.api + `/players/DeletePlayer:${id}`
    );
  }
}

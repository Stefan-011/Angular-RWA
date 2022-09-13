import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Sponzor } from '../models/Sponzor';
import { Injectable } from '@angular/core';
import { MyTeam } from '../models/MyTeam';
import { player } from '../models/player';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { RequestResponse } from '../models/RequestResponse';
import { ShopErrorMsg } from '../Enums/ShopErrorMsg';
import { TeamSablon } from '../models/TeamSablon';
import { PanelErrorMessage } from '../Enums/PanelErrorMessage';

@Injectable({
  providedIn: 'root',
})
export class MyteamService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  GetMyTeam() {
    return this.http.get<MyTeam>(environment.api + `/my-team/GetMyTeam`);
  }

  SellMyPlayer(ID: number) {
    return this.http.delete<player>(
      environment.api + `/my-team/RemovePlayer:${ID}`
    );
  }

  BuyMyPlayer(NewOneID: number) {
    return this.http.put<RequestResponse<player, ShopErrorMsg>>(
      environment.api + `/my-team/AddPlayer:${NewOneID}`,
      {
        Headers: undefined,
      }
    );
  }

  AddSponzor(id: number) {
    return this.http.put<RequestResponse<Sponzor, ShopErrorMsg>>(
      environment.api + `/my-team/AddSponzor:${id}`,
      {
        Headers: undefined,
      }
    );
  }

  RemoveSponzor() {
    return this.http.put<RequestResponse<Sponzor, ShopErrorMsg>>(
      environment.api + `/my-team/RemoveSponzor`,
      {
        Headers: undefined,
      }
    );
  }

  GetAllTeams() {
    return this.http.get<RequestResponse<TeamSablon[], PanelErrorMessage>>(
      environment.api + `/my-team/GetCreatedTeams`
    );
  }

  CreateTeam(Team: TeamSablon) {
    alert(Team.name);
    return this.http.post<RequestResponse<any, PanelErrorMessage>>(
      environment.api + `/my-team/CreateTeam`,
      Team
    );
  }

  EditTeam(Team: TeamSablon) {
    alert('TEST');
    return this.http.put<RequestResponse<any, PanelErrorMessage>>(
      environment.api + `/my-team/EditTeam`,
      Team
    );
  }

  DeleteTeam(id: number) {
    return this.http.delete<RequestResponse<any, PanelErrorMessage>>(
      environment.api + `/my-team/DeleteTeam:${id}`
    );
  }
}

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

  CreateTeam(Team: TeamSablon) {
    return this.http.post<TeamSablon>(
      environment.api + `/my-team/CreateTeam`,
      Team
    );
  }

  EditTeam() {
    //  return this.http.pust<MyTeam>(environment.api )
  }

  DeleteTeam() {
    //  return this.http.delete<MyTeam>(environment.api )
  }
}

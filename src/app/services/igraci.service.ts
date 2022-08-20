import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { player } from '../models/player';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';


@Injectable({
  providedIn: 'root'
})
export class IgraciService {

  constructor(private http: HttpClient,private store:Store<AppState>) { }

  GetAllPlayers()
  {
    return this.http.get<player[]>(environment.api + '/my-team');
  }
  
  GetTeamPlayers(TeamName:string)
  {
    return this.http.get<player[]>(environment.api + `/players/GetAllByTeam:${TeamName}`,);
  }

  GetPlayernameID(id:number)
  {
    return this.http.get<player>(environment.api + `/players/GetPlayerByID:${id}`);
  }
}

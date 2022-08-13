import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { AppState } from '../app.state';
import { player } from '../models/player';
import { user } from '../models/user';
import { selectUsersname } from '../store/user.selector';

@Injectable({
  providedIn: 'root'
})
export class MyteamService {

  constructor(private http: HttpClient,private store:Store<AppState>) { }


  GetMyTeam(username:string)
  {
    return this.http.get<player[]>(environment.api + `/MyTeamPlayers?team=${username}`);
  }

  SaveMyTeam(team:player[])
  {
    return this.http.post<player[]>(environment.api + `/MyTeamPlayers`,team);
  }
  
  /*RemovePlayer(nickname:string)
  {
    return this.http.delete(environment.api + `/MyTeamPlayers?nick=${nickname}`,);
  }*/

  RemovePlayer(nickname:string)
  {
    return this.http.get(environment.api + `/MyTeamPlayers?nick=${nickname}`,);
  }

  SellMyPlayer(ID:number)
  {
    return this.http.delete<player>(environment.api + `/MyTeamPlayers/${ID}`);
  }

  BuyMyPlayer(NewOne:player,username:string)
  {
    return this.http.post<player>(environment.api + `/MyTeamPlayers`,
    {
    name:NewOne.name, 
    lname:NewOne.lname,
    impact:NewOne.impact, 
    team:username, 
    nick:NewOne.nick, 
    price:NewOne.price, 
    rating:NewOne.rating,
    kd:NewOne.kd,
    img:NewOne.img
  });
}

CheckMyPlayer(nick:string,username:string)
{
  return this.http.get<player[]>(environment.api + `/MyTeamPlayers?team=ss&&nick=${nick}`);
}
    
}


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { AppState } from '../app.state';
import { MyTeam } from '../models/MyTeam';
import { player } from '../models/player';
import { user } from '../models/user';
import { selectUsersname } from '../store/user.selector';

@Injectable({
  providedIn: 'root'
})
export class MyteamService {

  constructor(private http: HttpClient,private store:Store<AppState>) { }


  GetMyTeam(token:string)
  {
    var headers_object = new HttpHeaders({
      'Authorization': "Bearer " + token,
      'Content-Type': 'application/json',
    });
    const httpOptions = {
      headers: headers_object,
    };

    return this.http.get<MyTeam>(environment.api + `/my-team/GetMyTeam`,httpOptions);
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

  SellMyPlayer(ID:number,token:string)
  {
    var headers_object = new HttpHeaders({
      'Authorization': "Bearer " + token,
      'Content-Type': 'application/json',
    });
    const httpOptions = {
      headers: headers_object,
    };
    return this.http.delete<player>(environment.api + `/my-team/RemovePlayer:${ID}`,httpOptions);
  }

  BuyMyPlayer(NewOneID:number,token:string)
  {

    var headers_object = new HttpHeaders({
      'Authorization': "Bearer " + token,
      'Content-Type': 'application/json',
    });
    const httpOptions = {
      headers: headers_object,
    };

    return this.http.get<player>(environment.api + `/my-team/AddPlayer:${NewOneID}`,httpOptions);
}

CheckMyPlayer(nick:string,username:string)
{
  return this.http.get<player[]>(environment.api + `/MyTeamPlayers?team=${username}&&nick=${nick}`);
}
    
}


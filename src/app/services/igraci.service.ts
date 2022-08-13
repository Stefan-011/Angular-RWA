import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { player } from '../models/player';
import { environment } from 'src/environments/environment';
import { user } from '../models/user';
import { Store } from '@ngrx/store';
import { selectUsersname } from '../store/user.selector';
import { AppState } from '../app.state';

@Injectable({
  providedIn: 'root'
})
export class IgraciService {

  constructor(private http: HttpClient,private store:Store<AppState>) { }

  GetAllPlayers()
  {
    return this.http.get<player[]>(environment.api + '/igraci');
  }
  
  GetTeamPlayers(TeamName:string)
  {
    return this.http.get<player[]>(environment.api + `/igraci?team=${TeamName}`);
  }

  GetPlayernameID(id:number)
  {
    return this.http.get<player>(environment.api + `/igraci/${id}`);
  }

  

  Test()
  {
    let t = new user();
    t.money = 500;
    t.username ="Milos"
    return this.http.post(environment.api + '/korisnici',t);
  }

  TestGet()
  {
    return this.http.get<user>(environment.api + '/korisnici/1');
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { player } from '../models/player';
import { environment } from 'src/environments/environment';
import { team } from '../models/team';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class IgraciService {

  constructor(private http: HttpClient) { }

  GetAllPlayers()
  {
    return this.http.get<player[]>(environment.api + '/igraci');
  }

  GetAllTeams()
  {
    return this.http.get<team[]>(environment.api + '/timovi');
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

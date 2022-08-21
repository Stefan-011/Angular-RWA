import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Sponzor } from '../models/Sponzor';
import { Injectable } from '@angular/core';
import { MyTeam } from '../models/MyTeam';
import { player } from '../models/player';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class MyteamService {

  constructor(
    private http: HttpClient,
    private store:Store<AppState>
    ) {}


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


AddSponzor(token:string,id:number) 
  {
    var headers_object = new HttpHeaders({
      'Authorization': "Bearer " + token,
      'Content-Type': 'application/json',
    });
    const httpOptions = {
      headers: headers_object,
    };

    return this.http.get<Sponzor>(environment.api + `/my-team/AddSponzor:${id}`,httpOptions);
  }


  RemoveSponzor(token:string)
  {
    var headers_object = new HttpHeaders({
      'Authorization': "Bearer " + token,
      'Content-Type': 'application/json',
    });
    const httpOptions = {
      headers: headers_object,
    };
    return this.http.get<boolean>(environment.api + `/my-team/RemoveSponzor`,httpOptions);
  }

}


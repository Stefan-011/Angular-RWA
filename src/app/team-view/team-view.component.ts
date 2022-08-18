import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.state';
import * as OtherTeamSelect from "src/app/store/Otherteam.selector"
import * as OtherTeamAction from "src/app/store/Otherteam.action"
import * as UserSelectors from 'src/app/store/user.selector'
import { TeamNamesEnum } from '../Enums/TeamNamesEnum';
import { player } from '../models/player';
import { selectUsersname } from 'src/app/store/user.selector';
import { selectMyTeam } from 'src/app/store/myteam.selector';
import * as MyTeamActions from 'src/app/store/myteam.action'
import * as MyTeamSelector from 'src/app/store/myteam.selector'
import { MyteamService } from '../services/myteam.service';
import { UserService } from '../services/user.service';
import { IgraciService } from '../services/igraci.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css']
})
export class TeamViewComponent implements OnInit {

  $ComponentType:Observable<string>;
  $UsersMoney:Observable<number>;
  compType:string;
  TeamNames:string[];
  $ActiveTeam:Observable<player[]>;
  @Input() Username:string;


  constructor(private store:Store<AppState>,private myteamservice:MyteamService,private igraciservice:IgraciService, private cookieservice:CookieService) { 
    this.compType = "";
    this.$ComponentType = store.select(UserSelectors.SelectComponent);
    this.$UsersMoney = store.select(UserSelectors.selectUsersMoney);
    this.TeamNames = []
    this.$ActiveTeam = this.store.select(OtherTeamSelect.selectCurrentOtherTeams);
    this.Username = ""
  }

  ngOnInit(): void {
    this.InitilizeTeamNames();
    this.$ComponentType.subscribe((type)=>{
      if(this.compType != type)
     {
      this.compType = type;
      if(type == "shop")
      {
      this.$ActiveTeam = this.store.select(OtherTeamSelect.selectCurrentOtherTeams);
      this.store.dispatch(OtherTeamAction.GetAllPlayers({name:TeamNamesEnum.Astralis}));
      this.store.select(OtherTeamSelect.selectName).subscribe((data)=>console.log(data));
      }
      else if (this.compType == "myteam")
      {
        this.$ActiveTeam = this.store.select(selectMyTeam)
      }
     }  
    });

    this.$ActiveTeam.subscribe();
    this.$UsersMoney.subscribe();
  }
 

  InitilizeTeamNames()
  {
    var select = document.getElementById('Team-cmbox');
    let i = 0;
    const values = Object.values(TeamNamesEnum);
    
    for (let obj in TeamNamesEnum)
    {
      this.TeamNames[i] = values[i];
       i++;
    } 
  
  }


  test()
  {
    let name = document.getElementById("Team-cmbox") as HTMLSelectElement
    this.store.dispatch(OtherTeamAction.GetAllPlayers({name:name.value}));
    this.$ActiveTeam = this.store.select(OtherTeamSelect.selectCurrentOtherTeams);
    this.$ActiveTeam.subscribe((data)=>console.log(data))
    //this.ActiveTeam =
 //   let  t = document.getElementById("Team-cmbox") as HTMLSelectElement;
  // console.log("value: "+t.value)
  }

  SellPlayer(id:number)
  {
    let ID = 0;
    this.store.dispatch(MyTeamActions.SelectPlayer({ID:id}));
   // this.store.select(MyTeamSelector.selectPlayerID).subscribe((data=>{alert(data)}))
    this.store.select(MyTeamSelector.selectPlayer).subscribe((data)=>ID = parseInt(data?.id+"")) // Poboljsaj
   // this.myteamservice.SellMyPlayer(ID).subscribe((data2)=>console.log(data2))
   this.store.dispatch(MyTeamActions.SellPlayer({ID:ID,token:this.cookieservice.get("token")}))
  }

  BuyPlayer(nick:string,id:number)
  {
    let Num = 0;
    this.store.select(MyTeamSelector.selectNumberOfPlayers).subscribe((data)=> {Num = data;console.log(data)})
  
    if(Num < 5)
    {
      this.store.dispatch(MyTeamActions.CheckMyPlayer({nick:nick,username:this.Username,ID:id}));
      alert(`(${Num+1}/5)`)
    }
    else
    alert("Vas tim je pun (5/5)")
   this.store.dispatch(MyTeamActions.BuyPlayer({ID:id,token:this.cookieservice.get("token")}))
   //this.igraciservice.GetPlayerID(id).subscribe((data)=>this.myteamservice.BuyMyPlayer(data).subscribe())
  }


  
}

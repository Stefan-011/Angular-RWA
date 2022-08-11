import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.state';
import * as OtherTeamSelect from "src/app/store/Otherteam.selector"
import * as OtherTeamAction from "src/app/store/Otherteam.action"
import * as UserSelectors from 'src/app/store/user.selector'
import { TeamNamesEnum } from '../Enums/TeamNamesEnum';
import { player } from '../models/player';


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

  constructor(private store:Store<AppState>) { 
    this.compType = "";
    this.$ComponentType = store.select(UserSelectors.SelectComponent);
    this.$UsersMoney = store.select(UserSelectors.selectUsersMoney);
    this.TeamNames = []
    this.$ActiveTeam = this.store.select(OtherTeamSelect.selectCurrentOtherTeams);
  }

  ngOnInit(): void {
    this.InitilizeTeamNames();
    this.$ComponentType.subscribe((type)=>{
      if(this.compType != type)
     {
      this.compType = type;
      if(type == "shop")
      {
      this.store.dispatch(OtherTeamAction.GetAllPlayers({name:TeamNamesEnum.Astralis}));
      this.store.select(OtherTeamSelect.selectName).subscribe((data)=>console.log(data));
      }
     // else if (this.compType == "myteam")
     }  
    })
    ;
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
}

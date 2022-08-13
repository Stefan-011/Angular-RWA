import { Component, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { observable, Observable } from 'rxjs';
import { AppState } from '../app.state';
import * as OtherTeamSelect from "src/app/store/Otherteam.selector"
import * as OtherTeamAction from "src/app/store/Otherteam.action"
import * as UserSelectors from 'src/app/store/user.selector'
import * as MyTeamActions from 'src/app/store/myteam.action'
import * as MyTeamSelector from 'src/app/store/myteam.selector'
import { TeamNamesEnum } from '../Enums/TeamNamesEnum';
import { player } from '../models/player';
import { MyteamService } from '../services/myteam.service';
import { selectUsersname } from 'src/app/store/user.selector';
import { selectMyTeam } from 'src/app/store/myteam.selector';

@Component({
  selector: 'app-polje',
  templateUrl: './polje.component.html',
  styleUrls: ['./polje.component.css']
})
export class PoljeComponent implements OnInit {

  $ComponentType:Observable<string>;
  @Input() $ActiveTeam:Observable<player[]>;
  @Input() $MyTeam:Observable<player[]>;
  compType:string;
  TeamNames:string[];
  ActiveTeamName:string;
  FinalResult:string[];

  constructor(private store:Store<AppState>,private myteamservice:MyteamService) {
    this.compType = "";
    this.$ComponentType = store.select(UserSelectors.SelectComponent);
    this.TeamNames = []
    this.ActiveTeamName = ""
    this.$ActiveTeam = this.store.select(OtherTeamSelect.selectCurrentOtherTeams);
    this.$MyTeam = this.store.select(selectMyTeam)
    this.FinalResult = [];
   }

  ngOnInit(): void {
    this.InitilizeTeamNames();
    this.store.dispatch(OtherTeamAction.GetAllPlayers({name:TeamNamesEnum.Astralis}));
    this.ActiveTeamName = TeamNamesEnum.Astralis;
   // this.store.select(selectUsersname).subscribe(data=>{console.log(data);this.store.dispatch(MyTeamActions.GetMyTeam({name:data}));})// Poboljsaj
   
   //
  //  this.store.dispatch(MyTeamActions.GetMyTeam());
    //this.store.select(MyTeamSelector.selectMyTeam).subscribe((data)=>console.log(data))
   // this.store.select(OtherTeamSelect.selectName).subscribe((data)=>console.log(data));
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
    this.ActiveTeamName = name.value;
    this.store.dispatch(OtherTeamAction.GetAllPlayers({name:name.value}));
    this.$ActiveTeam = this.store.select(OtherTeamSelect.selectCurrentOtherTeams);
    this.$ActiveTeam.subscribe((data)=>console.log(data))
    //this.ActiveTeam =
 //   let  t = document.getElementById("Team-cmbox") as HTMLSelectElement;
  // console.log("value: "+t.value)
  }

  GetRezultat(data: string[]){   
    this.FinalResult =  data;
  }
}

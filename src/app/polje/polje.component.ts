import * as OtherTeamSelect from "src/app/store/Otherteam.selector"
import * as OtherTeamAction from "src/app/store/Otherteam.action"
import { selectMyTeam } from 'src/app/store/myteam.selector';
import * as UserSelectors from 'src/app/store/user.selector'
import { TeamNamesEnum } from '../Enums/TeamNamesEnum';
import { Component, Input, OnInit} from '@angular/core';
import { player } from '../models/player';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-polje',
  templateUrl: './polje.component.html',
  styleUrls: ['./polje.component.css']
})
export class PoljeComponent implements OnInit {
  @Input() $ActiveTeam:Observable<player[]>; 
  @Input() $MyTeam:Observable<player[]>; 

  $ComponentType:Observable<string>; 

  compType:string; 
  TeamNames:string[]; 
  FinalResult:string[]; 
  ActiveTeamName:string; 


  constructor(private store:Store<AppState>) 
    {
    this.compType = "";
    this.TeamNames = [];
    this.FinalResult = [];
    this.ActiveTeamName = "";
    this.$MyTeam = this.store.select(selectMyTeam);
    this.$ComponentType = store.select(UserSelectors.SelectComponent);
    this.$ActiveTeam = this.store.select(OtherTeamSelect.selectCurrentOtherTeams); 
   }


  ngOnInit(): void 
  {
    this.InitilizeTeamNames();
    this.ActiveTeamName = TeamNamesEnum.Astralis;
    this.store.dispatch(OtherTeamAction.GetAllPlayers({name:TeamNamesEnum.Astralis})); 
  }


 InitilizeTeamNames():void 
 {
   let i = 0;
   const values = Object.values(TeamNamesEnum);
   for (let obj in TeamNamesEnum)
   {
     this.TeamNames[i] = values[i];
     i++;
   } 
 }


ChangeOtherTeam():void
  {
    let name = document.getElementById("Team-cmbox") as HTMLSelectElement;
    this.ActiveTeamName = name.value;
    this.store.dispatch(OtherTeamAction.GetAllPlayers({name:name.value}));
    this.$ActiveTeam = this.store.select(OtherTeamSelect.selectCurrentOtherTeams);
    this.$ActiveTeam.subscribe();
  }


  GetRezultat(data: string[]){   
    this.FinalResult =  data;
  }
}

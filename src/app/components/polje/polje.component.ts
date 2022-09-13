import * as OtherTeamSelect from 'src/app/store/Otherteam.selector';
import * as OtherTeamAction from 'src/app/store/Otherteam.action';
import { selectMyTeam } from 'src/app/store/myteam.selector';
import * as UserSelectors from 'src/app/store/user.selector';
import { TeamNamesEnum } from '../../Enums/TeamNamesEnum';
import { Component, Input, OnInit } from '@angular/core';
import { player } from '../../models/player';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TeamSablon } from 'src/app/models/TeamSablon';

@Component({
  selector: 'app-polje',
  templateUrl: './polje.component.html',
  styleUrls: ['./polje.component.css'],
})
export class PoljeComponent implements OnInit {
  @Input() $ActiveTeam: Observable<player[]>;
  @Input() $MyTeam: Observable<player[]>;

  $TeamListObs: Observable<TeamSablon[]>;
  $ActiveTeamName: Observable<string>;

  TeamNames: string[];
  FinalResult: string[];
  TeamList: TeamSablon[];
  ActiveTeamName: string;

  constructor(private store: Store<AppState>) {
    this.TeamNames = [];
    this.FinalResult = [];
    this.ActiveTeamName = '';
    this.TeamList = [];
    this.$MyTeam = this.store.select(selectMyTeam);
    this.$ActiveTeam = this.store.select(
      OtherTeamSelect.selectCurrentOtherTeams
    );
    this.$TeamListObs = store.select(OtherTeamSelect.SelectTeamList);
    this.$ActiveTeamName = store.select(OtherTeamSelect.selectName);
  }

  ngOnInit(): void {
    this.store.dispatch(OtherTeamAction.GetTeamList());
    this.$ActiveTeamName.subscribe((name) => (this.ActiveTeamName = name));
    this.$TeamListObs.subscribe((TeamList) => {
      this.TeamList = TeamList;
      this.InitilizeTeamNames();
    });
  }

  InitilizeTeamNames(): void {
    let i = 0;
    this.TeamList.forEach((element) => {
      this.TeamNames[i] = element.name;
      if (i == 0)
        this.store.dispatch(
          OtherTeamAction.SetName({ name: this.TeamNames[i] })
        );
      i++;
    });
    this.store.dispatch(
      OtherTeamAction.GetAllPlayers({ name: this.ActiveTeamName })
    );
  }

  ChangeOtherTeam(): void {
    let name = document.getElementById('Team-cmbox') as HTMLSelectElement;
    this.store.dispatch(OtherTeamAction.SetName({ name: name.value }));
    this.store.dispatch(
      OtherTeamAction.GetAllPlayers({ name: this.ActiveTeamName })
    );
    //this.$ActiveTeam.subscribe();
  }

  GetRezultat(data: string[]) {
    this.FinalResult = data;
  }
}

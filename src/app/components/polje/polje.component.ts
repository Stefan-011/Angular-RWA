import * as OtherTeamSelect from 'src/app/store/Otherteam.selector';
import * as OtherTeamAction from 'src/app/store/Otherteam.action';
import { selectMyTeam } from 'src/app/store/myteam.selector';
import { Component, Input, OnInit } from '@angular/core';
import { player } from '../../models/player';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TeamSablon } from 'src/app/models/TeamSablon';
import * as MyTeamActions from 'src/app/store/myteam.action';

@Component({
  selector: 'app-polje',
  templateUrl: './polje.component.html',
  styleUrls: ['./polje.component.css'],
})
export class PoljeComponent implements OnInit {
  @Input() $ActiveTeam: Observable<player[]>;
  @Input() $MyTeam: Observable<player[]>;

  $Unsubscribe: Subject<void>;
  $TeamListObs: Observable<TeamSablon[]>;
  $ActiveTeamName: Observable<string>;

  TeamNames: string[];
  FinalResult: string[];
  TeamList: TeamSablon[];
  ActiveTeamName: string;

  constructor(private store: Store<AppState>) {
    this.$Unsubscribe = new Subject<void>();
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
    this.store.dispatch(MyTeamActions.GetMyTeam());

    this.$MyTeam.pipe(takeUntil(this.$Unsubscribe)).subscribe();
    this.$ActiveTeam.pipe(takeUntil(this.$Unsubscribe)).subscribe();

    this.$ActiveTeamName
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((name) => {
        this.ActiveTeamName = name;
        if (this.ActiveTeamName != '')
          this.store.dispatch(
            OtherTeamAction.GetAllPlayers({ name: this.ActiveTeamName })
          );
      });

    this.$TeamListObs
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((TeamList) => {
        this.TeamList = TeamList;
        this.InitilizeTeamNames();
      });
  }

  InitilizeTeamNames(): void {
    let iterator = 0;
    this.TeamList.forEach((team) => {
      this.TeamNames[iterator] = team.name;
      if (iterator == 0) {
        this.store.dispatch(
          OtherTeamAction.SetName({ name: this.TeamNames[iterator] })
        );
      }
      iterator++;
    });
  }

  ChangeOtherTeam(): void {
    let name = document.getElementById('Team-cmbox') as HTMLSelectElement;
    this.store.dispatch(OtherTeamAction.SetName({ name: name.value }));
  }

  GetRezultat(Result: string[]): void {
    this.FinalResult = Result;
  }

  ngOnDestroy(): void {
    this.$Unsubscribe.next();
    this.$Unsubscribe.complete();
    this.$Unsubscribe.unsubscribe();
  }
}

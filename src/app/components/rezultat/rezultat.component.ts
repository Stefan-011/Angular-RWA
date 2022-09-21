import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as OtherTeamSelect from 'src/app/store/Otherteam.selector';
import * as UserSelect from 'src/app/store/user.selector';
import { GameStats } from '../../models/GameStats';
import { MapsEnum } from '../../Enums/MapsEnum';
import { player } from '../../models/player';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { interval, Observable, Subject, takeUntil } from 'rxjs';
import * as RezultatSelector from 'src/app/store/rezultat.selector';
import * as RezultatActions from 'src/app/store/rezultat.action';
import { IMap } from 'src/app/models/IMap';
import { OpenDialog } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Probability } from 'src/app/Enums/Probability';

@Component({
  selector: 'app-rezultat',
  templateUrl: './rezultat.component.html',
  styleUrls: ['./rezultat.component.css'],
})
export class RezultatComponent implements OnInit {
  private readonly MAX_NUMBER_OF_GAMES = 3;
  private readonly NUMBER_OF_MAPS = 7;

  @Output() ResultListener: EventEmitter<string[]>;
  @Input() $ActiveTeam: Observable<player[]>;
  @Input() $MyTeam: Observable<player[]>;
  $Unsubscribe: Subject<void>;

  $LeftWinnsObs: Observable<number>;
  $RightWinnsObs: Observable<number>;
  $MapObs: Observable<IMap[]>;
  $LeftTeamNameObs: Observable<string>;
  $RightTeamNameObs: Observable<string>;

  RightTeamName: string;
  LeftTeamName: string;

  LeftTeam: player[];
  RightTeam: player[];

  LeftWinns: number;
  RightWinns: number;
  MapsUsed: IMap[];

  constructor(private store: Store<AppState>, private matDialog: MatDialog) {
    this.$Unsubscribe = new Subject<void>();
    this.ResultListener = new EventEmitter();
    this.$ActiveTeam = new Observable();
    this.$MyTeam = new Observable();

    this.LeftTeamName = '';
    this.RightTeamName = '';
    this.RightTeam = [];
    this.RightWinns = 0;
    this.LeftTeam = [];
    this.LeftWinns = 0;
    this.MapsUsed = [];

    this.$LeftTeamNameObs = this.store.select(UserSelect.selectUsersname);
    this.$RightTeamNameObs = this.store.select(OtherTeamSelect.selectName);
    this.$LeftWinnsObs = this.store.select(
      RezultatSelector.selectLeftTeamWinns
    );
    this.$RightWinnsObs = this.store.select(
      RezultatSelector.selectRightTeamWinns
    );
    this.$MapObs = this.store.select(RezultatSelector.selectMapUsedMaps);
  }

  ngOnInit(): void {
    this.SetupObservables();
  }

  SetupObservables(): void {
    this.$MyTeam
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((Team) => (this.LeftTeam = Team));

    this.$ActiveTeam
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((Team) => (this.RightTeam = Team));

    this.$LeftTeamNameObs
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((Name) => (this.LeftTeamName = Name));

    this.$RightTeamNameObs
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((Name) => (this.RightTeamName = Name));

    this.$LeftWinnsObs
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((Win) => (this.LeftWinns = Win));

    this.$RightWinnsObs
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((Win) => (this.RightWinns = Win));

    this.$MapObs
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((Map) => (this.MapsUsed = Map));
  }

  RacunajEfektivnostTima(Team: player[]): number {
    let RetVal = 0;
    Team.forEach((player) => {
      RetVal += player.impact * 40 + player.kd * 60 + player.rating * 10;
    });
    return RetVal + Math.floor(Math.random() * (20 - 1 + 1)) + 1;
  }

  ClearStateForNewSimulation(): void {
    this.store.dispatch(RezultatActions.CleanMapPool());
    this.store.dispatch(
      RezultatActions.SetRightTeamWinns({ NumberOfWinns: 0 })
    );
    this.store.dispatch(RezultatActions.SetLeftTeamWinns({ NumberOfWinns: 0 }));
    let Row = document.getElementById('GameTable') as HTMLTableRowElement;
    this.ResultListener.emit(['', '']);
    while (Row.firstChild) {
      Row.removeChild(Row.firstChild);
    }
  }

  Simuliraj(): void {
    if (this.LeftTeam.length < 5)
      return OpenDialog('Vas tim ima manje od 5 igraca !!!', this.matDialog);

    this.ClearStateForNewSimulation();

    let GameCounter = 1;
    let winner = '';
    const display = interval(2500);
    const StopDisplay$ = new Subject<void>();
    let Btn = document.getElementById('btn-sim') as HTMLButtonElement;

    Btn.disabled = true;

    display.pipe(takeUntil(StopDisplay$)).subscribe(() => {
      this.StartGame(GameCounter);
      GameCounter++;
      if (this.RightWinns == 2 || this.LeftWinns == 2) {
        StopDisplay$.next();

        if (this.RightWinns == 2) winner = this.RightTeamName;
        else winner = this.LeftTeamName;

        let Array = [
          this.LeftWinns + ':' + this.RightWinns,
          'Pobednik: ' + winner.toUpperCase(),
        ];
        this.ResultListener.emit(Array);
        Btn.disabled = false;
      }
    });
  }

  GetRandomMap(): MapsEnum {
    let MapIndex =
      Math.floor(Math.random() * (this.NUMBER_OF_MAPS - 1 + 0)) + 0;
    switch (MapIndex) {
      case 0:
        return MapsEnum.Inferno;
      case 1:
        return MapsEnum.Cache;
      case 2:
        return MapsEnum.Mirage;
      case 3:
        return MapsEnum.Nuke;
      case 4:
        return MapsEnum.Overpass;
      case 5:
        return MapsEnum.Dust2;
      case 6:
        return MapsEnum.Vertigo;
      case 7:
        return MapsEnum.Train;
      default:
        return MapsEnum.Dust2;
    }
  }

  RoundsAlghoritm(LeftScore: number, rightScore: number, Game: number): string {
    let HigherProbability: Probability,
      Razlika: number,
      HigherRound = 0,
      LowwerRound = 0;

    if (LeftScore > rightScore) HigherProbability = Probability.Left;
    else HigherProbability = Probability.Right;

    Razlika = Math.abs(LeftScore - rightScore);
    switch (Game) {
      case 1:
        HigherRound = this.RoundsAlghoritmExtension(Razlika, Probability.High);
        LowwerRound = this.RoundsAlghoritmExtension(Razlika, Probability.Low);

        while (
          (HigherRound != 16 && LowwerRound != 16) ||
          (HigherRound == 16 && LowwerRound == 16)
        ) {
          HigherRound = this.RoundsAlghoritmExtension(
            Razlika,
            Probability.High
          );
          LowwerRound = this.RoundsAlghoritmExtension(Razlika, Probability.Low);
        }

        break;
      case 2:
        HigherRound = this.RoundsAlghoritmExtension(Razlika, Probability.High);
        LowwerRound = this.RoundsAlghoritmExtension(Razlika, Probability.Low);
        while (
          (HigherRound != 16 && LowwerRound != 16) ||
          (HigherRound == 16 && LowwerRound == 16)
        ) {
          HigherRound = this.RoundsAlghoritmExtension(
            Razlika,
            Probability.High
          );
          LowwerRound = this.RoundsAlghoritmExtension(Razlika, Probability.Low);
        }

        break;
      case 3:
        if (Razlika > 30) {
          HigherRound = 16;
          LowwerRound = 404;
          while (LowwerRound > 16) {
            LowwerRound = this.RoundsAlghoritmExtension(
              Razlika,
              Probability.Low
            );
          }
        } else {
          HigherRound = this.RoundsAlghoritmExtension(
            Razlika,
            Probability.High
          );
          LowwerRound = this.RoundsAlghoritmExtension(Razlika, Probability.Low);

          while (
            (HigherRound != 16 && LowwerRound != 16) ||
            (HigherRound == 16 && LowwerRound == 16)
          ) {
            HigherRound = this.RoundsAlghoritmExtension(
              Razlika,
              Probability.High
            );
            LowwerRound = this.RoundsAlghoritmExtension(
              Razlika,
              Probability.Low
            );
          }
        }

        break;
    }

    return this.RoundsAlghoritmResult(
      HigherProbability,
      HigherRound,
      LowwerRound
    );
  }

  RoundsAlghoritmExtension(
    Difference: number,
    probability: Probability
  ): number {
    if (probability == Probability.High) {
      if (Difference <= 30) return Math.floor(Math.random() * (16 - 6 + 1)) + 6;
      else if (Difference <= 60)
        return Math.floor(Math.random() * (16 - 15 + 1)) + 15;
      else return 16;
    } else {
      if (Difference <= 30)
        return Math.floor(Math.random() * (16 - 12 + 1)) + 12;
      else if (Difference <= 60)
        return Math.floor(Math.random() * (16 - 3 + 1)) + 3;
      else return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    }
  }

  RoundsAlghoritmResult(
    HigherProbability: Probability,
    HigherRound: number,
    LowwerRound: number
  ): string {
    if (HigherProbability == Probability.Left) {
      if (HigherRound > LowwerRound)
        this.store.dispatch(
          RezultatActions.SetLeftTeamWinns({
            NumberOfWinns: this.LeftWinns + 1,
          })
        );
      else
        this.store.dispatch(
          RezultatActions.SetRightTeamWinns({
            NumberOfWinns: this.RightWinns + 1,
          })
        );

      return HigherRound + ' : ' + LowwerRound;
    } else {
      if (HigherRound > LowwerRound)
        this.store.dispatch(
          RezultatActions.SetRightTeamWinns({
            NumberOfWinns: this.RightWinns + 1,
          })
        );
      else
        this.store.dispatch(
          RezultatActions.SetLeftTeamWinns({
            NumberOfWinns: this.LeftWinns + 1,
          })
        );

      return LowwerRound + ' : ' + HigherRound;
    }
  }

  DrawResult(GameStat: GameStats): void {
    let Table = document.getElementById('GameTable') as HTMLTableElement;
    let Row = document.createElement('TR');
    Row.style.border = '2px white solid';
    Table.appendChild(Row);
    for (let i = 0; i < this.MAX_NUMBER_OF_GAMES; i++) {
      let NewData = document.createElement('TD');
      NewData.style.width = '30%';
      switch (i) {
        case 0:
          NewData.innerHTML = this.LeftTeamName;
          break;

        case 1:
          NewData.innerHTML = GameStat.Map + '<br>' + GameStat.Rounds;
          break;

        case 2:
          NewData.innerHTML = this.RightTeamName;
          break;
      }
      Row.appendChild(NewData);
    }
  }

  CheckMapAppearance(map: string): boolean {
    let occurrence = false;

    this.MapsUsed.forEach((element) => {
      if (map == element.name) {
        occurrence = true;
      }
    });
    if (occurrence) return false;
    else return true;
  }

  StartGame(GameCounter: number): void {
    let Stats: GameStats = {
      Map: MapsEnum.Dust2,
      Rounds: '0',
    };

    do {
      Stats.Map = this.GetRandomMap();
    } while (this.CheckMapAppearance(Stats.Map) != true);

    Stats.Rounds = this.RoundsAlghoritm(
      this.RacunajEfektivnostTima(this.LeftTeam),
      this.RacunajEfektivnostTima(this.RightTeam),
      GameCounter
    );

    let NewMap: IMap = {
      id: GameCounter,
      name: Stats.Map,
    };

    this.store.dispatch(RezultatActions.UseMap({ Map: NewMap }));
    this.DrawResult(Stats);
    GameCounter++;
  }

  ngOnDestroy(): void {
    this.$Unsubscribe.next();
    this.$Unsubscribe.complete();
    this.$Unsubscribe.unsubscribe();
  }
}

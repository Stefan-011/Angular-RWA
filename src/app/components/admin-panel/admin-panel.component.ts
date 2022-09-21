import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { CRUDState } from 'src/app/Enums/CRUDState';
import { PanelErrorMessage } from 'src/app/Enums/PanelErrorMessage';
import { PanelMode } from 'src/app/Enums/Panelmode';
import { player } from 'src/app/models/player';
import { Sponzor } from 'src/app/models/Sponzor';
import { TeamSablon } from 'src/app/models/TeamSablon';
import * as PanelAction from 'src/app/store/panel.action';
import * as PanelSelector from 'src/app/store/panel.selector';
import { OpenDialog } from '../dialog/dialog.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  $Unsubscribe: Subject<void>;
  $PlayerObs: Observable<player>;
  $TeamObs: Observable<TeamSablon>;
  $SponzorObs: Observable<Sponzor>;
  $PanelModeObs: Observable<PanelMode>;
  $PlayerListObs: Observable<player[]>;
  $TeamListObs: Observable<TeamSablon[]>;
  $SponzorListObs: Observable<Sponzor[]>;
  $ErrorMessageObs: Observable<PanelErrorMessage>;
  $CRUDObs: Observable<CRUDState>;

  Player: player;
  Team: TeamSablon;
  Sponzor: Sponzor;

  PlayerList: player[];
  TeamList: TeamSablon[];
  SponzorList: Sponzor[];
  PanelMode: PanelMode;
  CRUDState: CRUDState;

  constructor(private store: Store<AppState>, private matDialog: MatDialog) {
    this.Player = {
      id: 0,
      kd: 0,
      img: '',
      nick: '',
      team: '',
      name: '',
      price: 0,
      lname: '',
      impact: 0,
      rating: 0,
    };

    this.Sponzor = {
      id: 0,
      img: '',
      name: '',
      money: 0,
    };

    this.Team = {
      id: 0,
      name: '',
    };
    this.$Unsubscribe = new Subject<void>();
    this.PanelMode = PanelMode.DEFAULT;
    this.CRUDState = CRUDState.DEFAULT;

    this.PlayerList = [];
    this.SponzorList = [];
    this.TeamList = [];

    this.$ErrorMessageObs = this.store.select(PanelSelector.SelectErrorMessage);
    this.$PanelModeObs = this.store.select(PanelSelector.SelectPanelMode);
    this.$PlayerObs = this.store.select(PanelSelector.SelectPlayer);
    this.$TeamObs = this.store.select(PanelSelector.SelectTeam);
    this.$SponzorObs = this.store.select(PanelSelector.SelectSponzor);
    this.$PlayerListObs = this.store.select(PanelSelector.SelectPlayerList);
    this.$TeamListObs = this.store.select(PanelSelector.SelectTeamList);
    this.$SponzorListObs = this.store.select(PanelSelector.SelectSponzorList);
    this.$CRUDObs = this.store.select(PanelSelector.SelectCRUDState);
  }

  ngOnInit(): void {
    this.store.dispatch(PanelAction.GetSponzorList());
    this.store.dispatch(PanelAction.GetTeamList());
    this.SetupObservables();
  }

  SetupObservables(): void {
    this.$ErrorMessageObs
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((ErrMsg) => {
        this.ErrorMessageShow(ErrMsg);
      });

    this.$PanelModeObs
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((NewMode) => {
        this.PanelMode = NewMode;
      });

    this.$PlayerObs
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((NewPlayer) => (this.Player = NewPlayer));

    this.$TeamObs
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((NewTeam) => (this.Team = NewTeam));

    this.$SponzorObs
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((NewSponzor) => (this.Sponzor = NewSponzor));

    this.$PlayerListObs
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((NewPlayerList) => (this.PlayerList = NewPlayerList));

    this.$TeamListObs
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((NewTeamList) => (this.TeamList = NewTeamList));

    this.$SponzorListObs
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((NewSponzorList) => (this.SponzorList = NewSponzorList));

    this.$CRUDObs.pipe(takeUntil(this.$Unsubscribe)).subscribe((CRUDSTATE) => {
      this.CRUDState = CRUDSTATE;
      this.RefreshObjState();
    });
  }

  ChangeMode(Mode: string, CRUD: string): void {
    switch (Mode) {
      case PanelMode.IGRAC:
        this.store.dispatch(
          PanelAction.SetPanelMode({ Mode: PanelMode.IGRAC })
        );
        break;

      case PanelMode.TIM:
        this.store.dispatch(PanelAction.SetPanelMode({ Mode: PanelMode.TIM }));
        break;

      case PanelMode.SPOZNOR:
        this.store.dispatch(
          PanelAction.SetPanelMode({ Mode: PanelMode.SPOZNOR })
        );
        break;
    }
    this.SetCRUDState(CRUD);
  }

  CreateOperation(): void {
    switch (this.PanelMode) {
      case PanelMode.IGRAC:
        this.store.dispatch(
          PanelAction.CreatePlayer({
            TeamID: this.Team.id,
            Player: this.Player,
          })
        );

        break;

      case PanelMode.SPOZNOR:
        this.store.dispatch(
          PanelAction.CreateSponzor({ Sponzor: this.Sponzor })
        );

        break;

      case PanelMode.TIM:
        this.store.dispatch(PanelAction.CreateTeam({ Team: this.Team }));
        break;
    }
  }

  DeleteOperation(): void {
    switch (this.PanelMode) {
      case PanelMode.IGRAC:
        this.store.dispatch(
          PanelAction.DeletePlayer({ PlayerID: this.Player.id })
        );
        break;

      case PanelMode.SPOZNOR:
        this.store.dispatch(
          PanelAction.DeleteSponzor({ SponzorID: this.Sponzor.id })
        );
        break;

      case PanelMode.TIM:
        this.store.dispatch(PanelAction.DeleteTeam({ TeamID: this.Team.id }));
        break;
    }
  }

  EditOperation(): void {
    switch (this.PanelMode) {
      case PanelMode.IGRAC:
        this.store.dispatch(
          PanelAction.EditPlayer({
            Player: this.Player,
            TeamID: this.GetNewTeamForPlayer(),
          })
        );
        break;

      case PanelMode.SPOZNOR:
        this.store.dispatch(PanelAction.EditSponzor({ Sponzor: this.Sponzor }));
        break;

      case PanelMode.TIM:
        this.store.dispatch(PanelAction.EditTeam({ Team: this.Team }));
        break;
    }
  }

  ErrorMessageShow(ErrMsg: PanelErrorMessage): void {
    if (ErrMsg == PanelErrorMessage.default) return;
    let RetMsg = '';
    switch (ErrMsg) {
      case PanelErrorMessage.none:
        RetMsg = 'Uspesno izvrsena operacija!';
        break;
      case PanelErrorMessage.PlayersNotFound:
        RetMsg = 'Igrac nije pronadjen!';
        break;
      case PanelErrorMessage.SponzorAlreadyExists:
        RetMsg = 'Sponzor vec postoji!';
        break;
      case PanelErrorMessage.SponzorNotFound:
        RetMsg = 'Sponzor nije pronadjen!';
        break;
      case PanelErrorMessage.TeamAlreadyExists:
        RetMsg = 'Tim vec postoji!';
        break;
      case PanelErrorMessage.TeamNotFound:
        RetMsg = 'Tim nije pronadjen!';
        break;
      case PanelErrorMessage.TeamIsFull:
        RetMsg = 'Tim je pun!';
        break;
    }
    OpenDialog(RetMsg, this.matDialog);
    this.store.dispatch(PanelAction.SetPanelMode({ Mode: PanelMode.DEFAULT }));
    this.store.dispatch(
      PanelAction.SetErrorMessage({ ErrorMsg: PanelErrorMessage.default })
    );
    this.RefreshObjState();
  }

  GetNewTeamForPlayer(): number {
    let SelectElement = document.getElementById(
      'TeamSelectEDIT'
    ) as HTMLSelectElement;
    let TeamID: number = 0;
    if (SelectElement.value == '') TeamID = this.Team.id;
    else TeamID = parseInt(SelectElement.value);
    return TeamID;
  }

  SetSponzor(): void {
    let SelectElement = document.getElementById(
      'SponzorSelect'
    ) as HTMLSelectElement;
    let Index = SelectElement.selectedIndex;

    this.store.dispatch(
      PanelAction.SetSponzor({ Sponzor: this.SponzorList[Index - 1] })
    );
  }

  SetTeam(): void {
    let SelectElement = document.getElementById(
      'TeamSelect'
    ) as HTMLSelectElement;
    let Index = SelectElement.selectedIndex,
      EmptyIndex = 1;

    this.store.dispatch(
      PanelAction.SetTeam({ Team: this.TeamList[Index - EmptyIndex] })
    );
    this.store.dispatch(PanelAction.GetPlayerList({ TeamId: this.Team.id }));
  }

  SetPlayer(): void {
    let SelectElement = document.getElementById(
      'PlayerSelect'
    ) as HTMLSelectElement;
    let Index = SelectElement.selectedIndex,
      EmptyIndex = 1;

    this.store.dispatch(
      PanelAction.SetPlayer({ Player: this.PlayerList[Index - EmptyIndex] })
    );
  }

  SetCRUDState(State: string): void {
    switch (State) {
      case CRUDState.CREATE:
        this.store.dispatch(
          PanelAction.SetCRUDState({ Operation: CRUDState.CREATE })
        );

        break;
      case CRUDState.EDIT:
        this.store.dispatch(
          PanelAction.SetCRUDState({ Operation: CRUDState.EDIT })
        );

        break;
      case CRUDState.DELETE:
        this.store.dispatch(
          PanelAction.SetCRUDState({ Operation: CRUDState.DELETE })
        );
        break;
    }
  }

  TakeTeamInfo(name: string, OPERATION: string): void {
    const NewTeam: TeamSablon = {
      id: this.Team.id,
      name: name,
    };
    if (name == '') {
      OpenDialog('Uneto ime tima nije validno!', this.matDialog);
      return;
    }
    this.SetCRUDState(OPERATION);
    this.store.dispatch(PanelAction.SetTeam({ Team: NewTeam }));
    this.CallOperation(OPERATION);
  }

  TakeSponzorInfo(
    name: string,
    img: string,
    money: string,
    OPERATION: string
  ): void {
    let ErrMsg: string = '';
    if (name == '') {
      ErrMsg = 'Uneto ime sponzora nije validno!';
      OpenDialog(ErrMsg, this.matDialog);
      return;
    }
    if (
      parseInt(money) != 1000 &&
      parseInt(money) != 2000 &&
      parseInt(money) != 3000
    ) {
      ErrMsg = 'Isprvane opcije: 1000,2000,3000';
      OpenDialog(ErrMsg, this.matDialog);
      ErrMsg = 'Ne validna kolicina novca!';
      OpenDialog(ErrMsg, this.matDialog);
      return;
    }

    const NewSponzor: Sponzor = {
      id: this.Sponzor.id,
      name: name,
      img: img,
      money: parseInt(money),
    };
    this.store.dispatch(PanelAction.SetSponzor({ Sponzor: NewSponzor }));
    this.SetCRUDState(OPERATION);
    this.CallOperation(OPERATION);
  }

  TakePlayerInfo(
    nick: string,
    name: string,
    lname: string,
    img: string,
    kd: string,
    impact: string,
    rating: string,
    price: string,
    OPERATION: string
  ): void {
    if (
      this.GetPlayerInfoValidity(
        rating,
        kd,
        impact,
        name,
        nick,
        lname,
        price
      ) == false
    )
      return;

    const NewPlayer: player = {
      id: this.Player.id,
      nick: nick,
      name: name,
      lname: lname,
      img: img,
      kd: parseFloat(kd),
      impact: parseFloat(impact),
      rating: parseFloat(rating),
      price: parseInt(price),
      team: '',
    };
    this.store.dispatch(PanelAction.SetPlayer({ Player: NewPlayer }));
    this.SetCRUDState(OPERATION);
    this.CallOperation(OPERATION);
  }

  GetPlayerInfoValidity(
    rating: string,
    kd: string,
    impact: string,
    name: string,
    nick: string,
    lname: string,
    price: string
  ): boolean {
    let ErrMsg: string;

    if (
      parseFloat(rating) > 2 ||
      parseFloat(kd) > 2 ||
      parseFloat(impact) > 2 ||
      parseFloat(rating) < 0 ||
      parseFloat(kd) < 0 ||
      parseFloat(impact) < 0
    ) {
      ErrMsg = 'Polja Rajting,K/D,Uticaj su u rasponu od 0-2 !';
      OpenDialog(ErrMsg, this.matDialog);
      return false;
    }

    if (name == '' || nick == '' || lname == '') {
      ErrMsg = 'Popunite licne informacije (Ime,Prezime,Nadimak)!';
      OpenDialog(ErrMsg, this.matDialog);
      return false;
    }

    if (parseInt(price) < 1000 || parseInt(price) > 4000 || price == '') {
      ErrMsg = 'Cena je u rasponu od 1000 - 4000!';
      OpenDialog(ErrMsg, this.matDialog);
      return false;
    }
    if (rating == '' && kd == '' && impact == '') {
      ErrMsg = 'Popunite sve podatke statistike (K/D, Uticaj,Rejting)!';
      OpenDialog(ErrMsg, this.matDialog);
      return false;
    }
    if (this.Team.id == 0) {
      ErrMsg = 'Izaberite tim za igraca!';
      OpenDialog(ErrMsg, this.matDialog);
      return false;
    }
    return true;
  }

  CallOperation(OPERATION: string): void {
    switch (OPERATION) {
      case CRUDState.CREATE:
        this.CreateOperation();
        break;
      case CRUDState.EDIT:
        this.EditOperation();
        break;
      case CRUDState.DELETE:
        this.DeleteOperation();
        break;
    }
  }

  ShowImg(ImgSrc: string): void {
    let Img = document.getElementById('ShowImage') as HTMLImageElement;
    Img.src = ImgSrc;
  }

  RefreshObjState(): void {
    let CleanPlayer = {
      id: 0,
      kd: 0,
      img: '',
      nick: '',
      team: '',
      name: '',
      price: 0,
      lname: '',
      impact: 0,
      rating: 0,
    };

    let CleanSponzor = {
      id: 0,
      img: '',
      name: '',
      money: 0,
    };

    let CleanTeam = {
      id: 0,
      name: '',
    };

    this.store.dispatch(PanelAction.SetTeam({ Team: CleanTeam }));
    this.store.dispatch(PanelAction.SetPlayer({ Player: CleanPlayer }));
    this.store.dispatch(PanelAction.SetSponzor({ Sponzor: CleanSponzor }));
    this.store.dispatch(PanelAction.GetSponzorList());
    this.store.dispatch(PanelAction.GetTeamList());
  }

  ngOnDestroy(): void {
    this.$Unsubscribe.next();
    this.$Unsubscribe.complete();
    this.$Unsubscribe.unsubscribe();
  }
}

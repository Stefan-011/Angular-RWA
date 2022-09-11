import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { CRUDState } from 'src/app/Enums/CRUDState';
import { PanelErrorMessage } from 'src/app/Enums/PanelErrorMessage';
import { PanelMode } from 'src/app/Enums/Panelmode';
import { MyTeam } from 'src/app/models/MyTeam';
import { player } from 'src/app/models/player';
import { Sponzor } from 'src/app/models/Sponzor';
import { TeamSablon } from 'src/app/models/TeamSablon';
import { IgraciService } from 'src/app/services/igraci.service';
import { MyteamService } from 'src/app/services/myteam.service';
import { SponzorService } from 'src/app/services/sponzor.service';
import * as PanelAction from 'src/app/store/panel.action';
import { PanelReducer } from 'src/app/store/panel.reducer';
import * as PanelSelector from 'src/app/store/panel.selector';
import { OpenDialog } from '../dialog/dialog.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
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
  // Za PanelState (PanelMod,OperationMode??,Player,Team,Sponzor,TeamList,PlayerList)
  // Za promenu podataka kada se predje u Editmode lokalne promenjive dobijaju vrednost onih sa observerima (UBACITI U PANEL STATE OPERATION MODE)

  constructor(
    private MyTeamService: MyteamService,
    private SponzorService: SponzorService,
    private PlayerService: IgraciService,
    private store: Store<AppState>,
    private matDialog: MatDialog
  ) {
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
      name: '',
      id: 0,
    };

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
    this.$ErrorMessageObs.subscribe((ErrMsg) => {
      this.ErrorMessageShow(ErrMsg);
      this.RefreshObjState();
    });
    this.$PanelModeObs.subscribe((NewMode) => {
      this.PanelMode = NewMode;
    });
    this.$PlayerObs.subscribe((NewPlayer) => (this.Player = NewPlayer));
    this.$TeamObs.subscribe((NewTeam) => (this.Team = NewTeam));
    this.$SponzorObs.subscribe((NewSponzor) => (this.Sponzor = NewSponzor));

    this.$PlayerListObs.subscribe(
      (NewPlayerList) => (this.PlayerList = NewPlayerList)
    );
    this.$TeamListObs.subscribe((NewTeamList) => (this.TeamList = NewTeamList));
    this.$SponzorListObs.subscribe(
      (NewSponzorList) => (this.SponzorList = NewSponzorList)
    );

    this.$CRUDObs.subscribe((CRUDSTATE) => {
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
        this.store.dispatch(
          PanelAction.SetPanelMode({ Mode: PanelMode.DEFAULT })
        );
        break;

      case PanelMode.SPOZNOR:
        this.store.dispatch(
          PanelAction.CreateSponzor({ Sponzor: this.Sponzor })
        );
        this.store.dispatch(
          PanelAction.SetPanelMode({ Mode: PanelMode.DEFAULT })
        );
        break;

      case PanelMode.TIM:
        this.store.dispatch(PanelAction.CreateTeam({ Team: this.Team }));
        this.store.dispatch(
          PanelAction.SetPanelMode({ Mode: PanelMode.DEFAULT })
        );
        break;
    }
  }

  DeleteOperation(): void {
    switch (this.PanelMode) {
      case PanelMode.IGRAC:
        break;

      case PanelMode.SPOZNOR:
        this.store.dispatch(
          PanelAction.DeleteSponzor({ SponzorID: this.Sponzor.id })
        ); //REWORK
        this.store.dispatch(
          PanelAction.SetPanelMode({ Mode: PanelMode.DEFAULT })
        );
        break;

      case PanelMode.TIM:
        break;
    }
  }

  EditOperation(): void {
    switch (this.PanelMode) {
      case PanelMode.IGRAC:
        alert('T');
        let SelectElement = document.getElementById(
          'TeamSelectEDIT'
        ) as HTMLSelectElement;
        let Index = SelectElement.selectedIndex;
        this.store.dispatch(
          PanelAction.EditPlayer({
            Player: this.Player,
            TeamID: this.TeamList[Index - 1].id,
          })
        ); // REWORK

        break;

      case PanelMode.SPOZNOR:
        console.log(this.Sponzor);
        this.store.dispatch(PanelAction.EditSponzor({ Sponzor: this.Sponzor })); // REWORK
        this.store.dispatch(
          PanelAction.SetPanelMode({ Mode: PanelMode.DEFAULT })
        );
        break;

      case PanelMode.TIM:
        this.store.dispatch(PanelAction.EditTeam({ Team: this.Team })); // REWORK
        this.store.dispatch(
          PanelAction.SetPanelMode({ Mode: PanelMode.DEFAULT })
        );
        break;
    }
  }

  ErrorMessageShow(ErrMsg: PanelErrorMessage) {
    if (ErrMsg == PanelErrorMessage.default) return;
    let RetMsg = '';
    switch (ErrMsg) {
      case PanelErrorMessage.none:
        RetMsg = 'Uspesno izvrsena operacija!';
        break;
    }
    OpenDialog(RetMsg, this.matDialog);
    this.store.dispatch(
      PanelAction.SetErrorMessage({ ErrorMsg: PanelErrorMessage.default })
    );
  }

  SetSponzor() {
    let SelectElement = document.getElementById(
      'SponzorSelect'
    ) as HTMLSelectElement;
    let Index = SelectElement.selectedIndex;

    this.store.dispatch(
      PanelAction.SetSponzor({ Sponzor: this.SponzorList[Index - 1] })
    );
  }

  SetTeam() {
    let SelectElement = document.getElementById(
      'TeamSelect'
    ) as HTMLSelectElement;

    let Index = SelectElement.selectedIndex;
    this.store.dispatch(
      PanelAction.SetTeam({ Team: this.TeamList[Index - 1] })
    );
    this.store.dispatch(PanelAction.GetPlayerList({ TeamId: this.Team.id }));
  }

  SetPlayer() {
    let SelectElement = document.getElementById(
      'PlayerSelect'
    ) as HTMLSelectElement;
    let Index = SelectElement.selectedIndex;

    this.store.dispatch(
      PanelAction.SetPlayer({ Player: this.PlayerList[Index - 1] })
    );
  }

  TakeSponzorInfo(
    name: string,
    img: string,
    money: string,
    OPERATION: string
  ): void {
    const NewSponzor: Sponzor = {
      id: this.Sponzor.id,
      name: name,
      img: img,
      money: parseInt(money),
    };
    this.store.dispatch(PanelAction.SetSponzor({ Sponzor: NewSponzor }));
    this.SetCRUDState(OPERATION);
    console.log(NewSponzor);
    this.CallOperation(OPERATION);
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

  RefreshObjState() {
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
      name: '',
      id: 0,
    };
    this.store.dispatch(PanelAction.SetTeam({ Team: CleanTeam }));
    this.store.dispatch(PanelAction.SetPlayer({ Player: CleanPlayer }));
    this.store.dispatch(PanelAction.SetSponzor({ Sponzor: CleanSponzor }));

    this.store.dispatch(PanelAction.GetSponzorList());
    this.store.dispatch(PanelAction.GetTeamList());
  }

  TakeTeamInfo(name: string, OPERATION: string): void {
    const NewTeam: TeamSablon = {
      id: this.Team.id,
      name: name,
    };
    this.store.dispatch(PanelAction.SetTeam({ Team: NewTeam }));
    this.SetCRUDState(OPERATION);
    console.log(NewTeam);
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
  ) {
    const NewPlayer: player = {
      id: this.Player.id,
      nick: nick,
      name: name,
      lname: lname,
      img: img,
      kd: parseInt(kd),
      impact: parseInt(impact),
      rating: parseInt(rating),
      price: parseInt(price),
      team: '',
    };
    this.store.dispatch(PanelAction.SetPlayer({ Player: NewPlayer }));
    this.SetCRUDState(OPERATION);
    this.CallOperation(OPERATION);
  }

  CallOperation(OPERATION: string) {
    alert(OPERATION);
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
}

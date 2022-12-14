import { Observable, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { player } from '../../models/player';
import { Sponzor } from '../../models/Sponzor';
import { Component, Input, OnInit } from '@angular/core';
import * as MyTeamActions from 'src/app/store/myteam.action';
import * as UserSelectors from 'src/app/store/user.selector';
import * as MyTeamSelector from 'src/app/store/myteam.selector';
import * as OtherTeamAction from 'src/app/store/Otherteam.action';
import * as OtherTeamSelect from 'src/app/store/Otherteam.selector';
import { ComponentEnum } from 'src/app/Enums/ComponentEnum';
import { ShopMode } from 'src/app/Enums/ShopMode';
import * as UserActions from 'src/app/store/user.action';
import * as ShopAction from 'src/app/store/shop.action';
import * as ShopSelect from 'src/app/store/shop.selector';
import { MatDialog } from '@angular/material/dialog';
import { OpenDialog } from '../dialog/dialog.component';
import { ShopErrorMsg } from 'src/app/Enums/ShopErrorMsg';
import { TeamSablon } from 'src/app/models/TeamSablon';
import { faPersonRifle } from '@fortawesome/free-solid-svg-icons';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css'],
})
export class TeamViewComponent implements OnInit {
  @Input() Username: string;

  $Unsubscribe: Subject<void>;
  $ComponentTypeObs: Observable<ComponentEnum>;
  $ActiveTeamObs: Observable<player[]>;
  $UsersMoneyObs: Observable<number>;
  $SponzorObs: Observable<Sponzor>;
  $ShopObs: Observable<ShopMode>;
  $ShopErrorMsgObs: Observable<ShopErrorMsg>;
  $PlayerCountObs: Observable<number>;
  $TeamListObs: Observable<TeamSablon[]>;
  $ActiveTeamNameObs: Observable<string>;
  $SponzorListObs: Observable<Sponzor[]>;
  $SelectedPlayerObs: Observable<number>;
  $MyTeamObs: Observable<player[]>;

  compType: ComponentEnum;
  Shop_mode: ShopMode;
  TeamNames: string[];
  MyTeamMoney: number;
  SponzorMyTeam: Sponzor;
  SponzorArray: Sponzor[];
  ShopErrorMsg: ShopErrorMsg;
  PlayerCount: number;
  TeamArray: TeamSablon[];
  ActiveTeamName: string;
  SelectedPlayerID: number;

  faPersonRifle = faPersonRifle;
  faHandshake = faHandshake;

  constructor(private store: Store<AppState>, private matDialog: MatDialog) {
    this.SelectedPlayerID = 0;
    this.compType = ComponentEnum.Home;
    this.Username = '';
    this.TeamNames = [];
    this.MyTeamMoney = 0;
    this.SponzorArray = [];
    this.PlayerCount = -1;
    this.TeamArray = [];
    this.ActiveTeamName = '';
    this.Shop_mode = ShopMode.Igraci;
    this.ShopErrorMsg = ShopErrorMsg.default;
    this.$Unsubscribe = new Subject<void>();
    this.$MyTeamObs = store.select(MyTeamSelector.selectMyTeam);
    this.$TeamListObs = store.select(OtherTeamSelect.SelectTeamList);
    this.$ShopErrorMsgObs = store.select(ShopSelect.SelectErrorMsg);
    this.$ShopObs = store.select(ShopSelect.SelectShopState);
    this.$UsersMoneyObs = store.select(UserSelectors.selectUsersMoney);
    this.$ComponentTypeObs = store.select(UserSelectors.SelectComponent);
    this.$SponzorObs = this.store.select(MyTeamSelector.selectSponzor);
    this.$SelectedPlayerObs = this.store.select(MyTeamSelector.selectPlayerID);
    this.$SponzorListObs = this.store.select(ShopSelect.SelectSponzorList);
    this.$PlayerCountObs = this.store.select(
      MyTeamSelector.selectNumberOfPlayers
    );
    this.$ActiveTeamObs = this.store.select(
      OtherTeamSelect.selectCurrentOtherTeams
    );
    this.$ActiveTeamNameObs = store.select(OtherTeamSelect.selectName);
    this.SponzorMyTeam = {
      id: -1,
      img: '',
      name: '',
      money: 0,
    };
  }

  ngOnInit(): void {
    this.store.dispatch(ShopAction.GetSponzorList());
    this.store.dispatch(OtherTeamAction.GetTeamList());
    this.SetupObservables();
  }

  LayoutSetup(type: ComponentEnum): void {
    this.store.dispatch(UserActions.GetLoggedUser());
    this.ModeChange(ShopMode.Igraci);
    this.store.dispatch(MyTeamActions.GetMyTeam());
  }

  SetupObservables(): void {
    this.$SelectedPlayerObs
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((PlyID) => (this.SelectedPlayerID = PlyID));

    this.$SponzorListObs
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((SponzorList) => (this.SponzorArray = SponzorList));

    this.$ComponentTypeObs
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((type) => {
        this.compType = type;
        this.LayoutSetup(this.compType);
      });

    this.$TeamListObs
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((NewTeams) => {
        this.TeamArray = NewTeams;
        this.InitilizeTeamNames();
      });

    this.$UsersMoneyObs
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((money) => (this.MyTeamMoney = money));

    this.$ShopObs
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((State) => (this.Shop_mode = State));

    this.$ShopErrorMsgObs
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((ErrMsg) => {
        this.ShopErrorMsg = ErrMsg;
        if (this.ShopErrorMsg != ShopErrorMsg.default)
          this.ShowErrorMsg(this.ShopErrorMsg);
      });

    this.$PlayerCountObs
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((NumOfPly) => {
        if (
          this.PlayerCount != -1 &&
          (this.compType == ComponentEnum.MyTeam ||
            this.compType == ComponentEnum.Shop)
        )
          OpenDialog('(' + NumOfPly + '/5)', this.matDialog);
        this.PlayerCount = NumOfPly;
      });

    this.$ActiveTeamNameObs
      .pipe(takeUntil(this.$Unsubscribe))
      .subscribe((name) => {
        this.ActiveTeamName = name;
        if (this.ActiveTeamName != '')
          this.store.dispatch(
            OtherTeamAction.GetAllPlayers({ name: this.ActiveTeamName })
          );
      });

    this.$MyTeamObs.pipe(takeUntil(this.$Unsubscribe)).subscribe();
    this.$ActiveTeamObs.pipe(takeUntil(this.$Unsubscribe)).subscribe();

    this.$SponzorObs.pipe(takeUntil(this.$Unsubscribe)).subscribe((sponzor) => {
      this.SponzorMyTeam = sponzor;
    });
  }

  InitilizeTeamNames(): void {
    let iterator = 0;
    this.TeamArray.forEach((element) => {
      this.TeamNames[iterator] = element.name;
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

  SellPlayer(id: number): void {
    this.store.dispatch(MyTeamActions.SelectPlayer({ ID: id }));
    this.store.dispatch(
      MyTeamActions.SellPlayer({
        ID: this.SelectedPlayerID,
        NumOfPlayers: this.PlayerCount,
      })
    );
  }

  BuyPlayer(id: number): void {
    this.store.dispatch(
      MyTeamActions.BuyPlayer({
        ID: id,
        NumOfPlayers: this.PlayerCount,
      })
    );
  }

  ModeChange(mode: string): void {
    if (mode == ShopMode.Igraci)
      this.store.dispatch(ShopAction.SetShopMode({ Mode: ShopMode.Igraci }));
    else if (mode == ShopMode.Sponzori)
      this.store.dispatch(ShopAction.SetShopMode({ Mode: ShopMode.Sponzori }));
  }

  Apliciraj(Money: number, id: number) {
    let PureChance = 0,
      ExitResult = false;

    PureChance = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    switch (parseInt(Money + '')) {
      case 3000:
        if (PureChance >= 95) ExitResult = true;
        break;

      case 2000:
        if (PureChance >= 80) ExitResult = true;
        break;

      case 1000:
        if (PureChance >= 40) ExitResult = true;
        break;

      default:
        break;
    }

    if (ExitResult == true) {
      this.store.dispatch(
        MyTeamActions.AddSponzor({
          id: id,
        })
      );
    } else OpenDialog('Vas zahtev je odbijen !', this.matDialog);
  }

  PrekiniSaradanju(money: number): void {
    if (money <= this.MyTeamMoney) {
      this.store.dispatch(MyTeamActions.RemoveSponzor());
    } else
      OpenDialog(
        'Pre prekida saradnje morate vratiti novac sponzoru !!',
        this.matDialog
      );
  }

  ShowErrorMsg(ErrMsg: ShopErrorMsg): void {
    let Message: string = '';
    switch (ErrMsg) {
      case ShopErrorMsg.ActiveSponzorDealError:
        Message = 'Vi vec imate aktivno sponzorstvo !';
        break;
      case ShopErrorMsg.BreakingSponzorDealError:
        Message = 'Pre prekida saradnje morate vratiti novac sponzoru !';
        break;
      case ShopErrorMsg.FullTeamError:
        Message = 'Kapaciteti vaseg tima su popunjeni!';
        break;
      case ShopErrorMsg.NoEnoughMoneyError:
        Message = 'Nemate dovoljno novca za datu transakciju !';
        break;
      case ShopErrorMsg.PlayerAlreadyInTeamError:
        Message = 'Izabrani igrac je vec u vasem timu !';
        break;
      case ShopErrorMsg.none:
        Message = 'Uspesna transakcija !';
        break;
      case ShopErrorMsg.SponzorAccepted:
        Message = 'Vas zahtev je prihvacen !';
        break;
    }
    OpenDialog(Message, this.matDialog);
    this.store.dispatch(
      ShopAction.SetErrorMsg({ ErrorMSG: ShopErrorMsg.default })
    );
  }

  ngOnDestroy(): void {
    this.$Unsubscribe.next();
    this.$Unsubscribe.complete();
    this.$Unsubscribe.unsubscribe();
    this.store.dispatch(OtherTeamAction.SetName({ name: '' }));
  }
}

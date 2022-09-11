import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { player } from '../../models/player';
import { Sponzor } from '../../models/Sponzor';
import { CookieService } from 'ngx-cookie-service';
import { TeamNamesEnum } from '../../Enums/TeamNamesEnum';
import { Component, Input, OnInit } from '@angular/core';
import * as MyTeamActions from 'src/app/store/myteam.action';
import { selectMyTeam } from 'src/app/store/myteam.selector';
import { SponzorService } from '../../services/sponzor.service';
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
import { ComponentType } from '@angular/cdk/portal';
import { leadingComment } from '@angular/compiler';
import { TeamSablon } from 'src/app/models/TeamSablon';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css'],
})
export class TeamViewComponent implements OnInit {
  @Input() Username: string;

  $ComponentType: Observable<ComponentEnum>;
  $ActiveTeam: Observable<player[]>;
  $UsersMoney: Observable<number>;
  $SponzorObs: Observable<Sponzor>;
  $ShopObs: Observable<ShopMode>;
  $ShopErrorMsgObs: Observable<ShopErrorMsg>;
  $PlayerCountObs: Observable<number>;
  $TeamListObs: Observable<TeamSablon[]>;

  compType: ComponentEnum;
  Shop_mode: ShopMode;
  TeamNames: string[];
  MyTeamMoney: number;
  SponzorMyTeam: Sponzor;
  SponzorArray: Sponzor[];
  ShopErrorMsg: ShopErrorMsg;
  PlayerCount: number;
  TeamArray: TeamSablon[];

  constructor(
    private store: Store<AppState>,
    private cookieservice: CookieService,
    private SponzorService: SponzorService,
    private matDialog: MatDialog
  ) {
    this.compType = ComponentEnum.none;
    this.Username = '';
    this.TeamNames = [];
    this.MyTeamMoney = 0;
    this.SponzorArray = [];
    this.PlayerCount = -1;
    this.TeamArray = [];
    this.Shop_mode = ShopMode.Igraci;
    this.ShopErrorMsg = ShopErrorMsg.default;
    this.$TeamListObs = store.select(OtherTeamSelect.SelectTeamList);
    this.$ShopErrorMsgObs = store.select(ShopSelect.SelectErrorMsg);
    this.$ShopObs = store.select(ShopSelect.SelectShopState);
    this.$UsersMoney = store.select(UserSelectors.selectUsersMoney);
    this.$ComponentType = store.select(UserSelectors.SelectComponent);
    this.$SponzorObs = this.store.select(MyTeamSelector.selectSponzor);
    this.$PlayerCountObs = this.store.select(
      MyTeamSelector.selectNumberOfPlayers
    );
    this.$ActiveTeam = this.store.select(
      OtherTeamSelect.selectCurrentOtherTeams
    );
    this.SponzorMyTeam = {
      id: -1,
      img: '',
      name: '',
      money: 0,
    };
  }

  ngOnInit(): void {
    this.GetSponzori();
    this.InitilizeTeamNames();
    this.$ComponentType.subscribe((type) => {
      if (type) this.LayoutSetup(type);
    });

    this.$TeamListObs.subscribe((NewTeams) => {
      this.TeamArray = NewTeams;
      if (this.TeamArray != null) this.InitilizeTeamNames();
    });

    this.$UsersMoney.subscribe((money) => (this.MyTeamMoney = money));
    this.$ShopObs.subscribe((State) => (this.Shop_mode = State));
    this.$ShopErrorMsgObs.subscribe((ErrMsg) => {
      this.ShopErrorMsg = ErrMsg;
      if (this.ShopErrorMsg != ShopErrorMsg.default)
        this.ShowErrorMsg(this.ShopErrorMsg);
    });

    this.$PlayerCountObs.subscribe((NumOfPly) => {
      if (this.PlayerCount != -1)
        OpenDialog('(' + this.PlayerCount + '/5)', this.matDialog);
      this.PlayerCount = NumOfPly;
    });
  }

  LayoutSetup(type: ComponentEnum): void {
    this.store.dispatch(UserActions.GetLoggedUser());
    if (this.compType != type) {
      this.compType = type;
      if (type == ComponentEnum.Shop) {
        this.$ActiveTeam = this.store.select(
          OtherTeamSelect.selectCurrentOtherTeams
        );
        this.store.dispatch(
          OtherTeamAction.GetAllPlayers({ name: TeamNamesEnum.Astralis })
        );
      } else if (this.compType == ComponentEnum.MyTeam) {
        this.store.dispatch(MyTeamActions.GetMyTeam());
        this.ModeChange(ShopMode.Igraci);
        this.$ActiveTeam = this.store.select(selectMyTeam);
        this.$SponzorObs.subscribe((sponzor) => {
          if (
            sponzor != null &&
            this.SponzorMyTeam != null &&
            this.compType == 'SHOP'
          ) {
            OpenDialog('Vas zahtev je prihvacen !', this.matDialog);
          }
          this.SponzorMyTeam = sponzor;
        });
      }
    }
  }

  InitilizeTeamNames(): void {
    let i = 0;
    this.store.dispatch(OtherTeamAction.GetTeamList());
    this.TeamArray.forEach((element) => {
      this.TeamNames[i] = element.name;
      i++;
    });
  }

  ChangeOtherTeam(): void {
    let name = document.getElementById('Team-cmbox') as HTMLSelectElement;
    alert(name.value);
    this.store.dispatch(OtherTeamAction.GetAllPlayers({ name: name.value }));
    this.$ActiveTeam = this.store.select(
      OtherTeamSelect.selectCurrentOtherTeams
    );
  }

  SellPlayer(id: number, price: number): void {
    var ID = 0;
    this.store.dispatch(MyTeamActions.SelectPlayer({ ID: id }));
    this.store
      .select(MyTeamSelector.selectPlayer)
      .subscribe((data) => (ID = parseInt(data?.id + '')));
    this.store.dispatch(
      MyTeamActions.SellPlayer({
        ID: ID,
        token: this.cookieservice.get('token'),
      })
    );
  }

  BuyPlayer(id: number): void {
    this.store.dispatch(
      MyTeamActions.BuyPlayer({
        ID: id,
        token: this.cookieservice.get('token'),
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

  async GetSponzori() {
    this.SponzorService.GetAll().subscribe(
      (data) => (this.SponzorArray = data)
    );
  }

  Apliciraj(Money: number, id: number) {
    //REWORK
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
      this.MyTeamMoney = +this.MyTeamMoney + +Money;
      this.store.dispatch(
        MyTeamActions.AddSponzor({
          id: id,
          token: this.cookieservice.get('token'),
        })
      );
    } else OpenDialog('Vas zahtev je odbijen !', this.matDialog);
  }

  PrekiniSaradanju(money: number): void {
    //REWORK
    if (money <= this.MyTeamMoney) {
      this.store.dispatch(
        MyTeamActions.RemoveSponzor({ token: this.cookieservice.get('token') })
      );
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
        Message = 'Pre prekida saradnje <br /> morate vratiti novac sponzoru !';
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
    }
    OpenDialog(Message, this.matDialog);
    this.store.dispatch(
      ShopAction.SetErrorMsg({ ErrorMSG: ShopErrorMsg.default })
    );
  }
}

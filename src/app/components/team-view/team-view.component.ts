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

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css'],
})
export class TeamViewComponent implements OnInit {
  @Input() Username: string;

  $ComponentType: Observable<string>;
  $ActiveTeam: Observable<player[]>;
  $UsersMoney: Observable<number>;
  $SponzorObs: Observable<Sponzor>;

  compType: string;
  Shop_mode: boolean;
  TeamNames: string[];
  MyTeamMoney: number;
  SponzorMyTeam: Sponzor;
  SponzorArray: Sponzor[];

  constructor(
    private store: Store<AppState>,
    private cookieservice: CookieService,
    private SponzorService: SponzorService
  ) {
    this.compType = '';
    this.Username = '';
    this.TeamNames = [];
    this.MyTeamMoney = 0;
    this.SponzorArray = [];
    this.Shop_mode = false;
    this.$UsersMoney = store.select(UserSelectors.selectUsersMoney);
    this.$ComponentType = store.select(UserSelectors.SelectComponent);
    this.$SponzorObs = this.store.select(MyTeamSelector.selectSponzor);
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
    this.$ActiveTeam.subscribe();
    this.$ComponentType.subscribe((type) => {
      if (this.compType != type) {
        this.compType = type;
        if (type == 'shop') {
          this.$ActiveTeam = this.store.select(
            OtherTeamSelect.selectCurrentOtherTeams
          );
          this.store.dispatch(
            OtherTeamAction.GetAllPlayers({ name: TeamNamesEnum.Astralis })
          );
          this.store.select(OtherTeamSelect.selectName).subscribe();
        } else if (this.compType == 'myteam') {
          this.ModeChange(false);
          this.$ActiveTeam = this.store.select(selectMyTeam);
          this.$SponzorObs.subscribe((sponzor) => {
            if (sponzor != null) this.SponzorMyTeam = sponzor;
          });
        }
      }
    });

    this.$UsersMoney.subscribe((money) => (this.MyTeamMoney = money));
  }

  InitilizeTeamNames(): void {
    let i = 0;
    const values = Object.values(TeamNamesEnum);
    for (let obj in TeamNamesEnum) {
      this.TeamNames[i] = values[i];
      i++;
    }
  }

  ChangeOtherTeam(): void {
    let name = document.getElementById('Team-cmbox') as HTMLSelectElement;
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
    this.MyTeamMoney = +this.MyTeamMoney + +price;
  }

  BuyPlayer(nick: string, id: number, price: number): void {
    var Num = 0;
    this.store
      .select(MyTeamSelector.selectNumberOfPlayers)
      .subscribe((data) => (Num = data));

    if (Num <= 4) {
      if (+price <= +this.MyTeamMoney) {
        this.store.dispatch(
          MyTeamActions.BuyPlayer({
            ID: id,
            token: this.cookieservice.get('token'),
          })
        );
        this.store
          .select(MyTeamSelector.selectNumberOfPlayers)
          .subscribe((data) => (Num = data));
        Num++;
        alert('(' + Num + '/5)');
      } else alert('Nemate dovljno novca za kupovinu !');
    } else alert('Vas tim je pun (5/5)');
  }

  ModeChange(mode: boolean): void {
    this.Shop_mode = mode;
  }

  async GetSponzori() {
    this.SponzorService.GetAll().subscribe(
      (data) => (this.SponzorArray = data)
    );
  }

  Apliciraj(Money: number, id: number) {
    let PureChance = 0,
      ExitResult = false;

    if (this.SponzorMyTeam.id != -1)
      return alert('Vi vec imate aktivno sponzorstvo !');
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
      alert('Vas zahtev je prihvacen !');
      this.MyTeamMoney = +this.MyTeamMoney + +Money;
      this.store.dispatch(
        MyTeamActions.AddSponzor({
          id: id,
          token: this.cookieservice.get('token'),
        })
      );
    } else alert('Vas zahtev je odbijen !');
  }

  PrekiniSaradanju(money: number) {
    if (money <= this.MyTeamMoney) {
      this.store.dispatch(
        MyTeamActions.RemoveSponzor({ token: this.cookieservice.get('token') })
      );
    } else alert('Pre prekida saradnje morate vratiti novac sponzoru !!!');
  }
}

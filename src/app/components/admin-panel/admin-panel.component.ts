import { Component, OnInit } from '@angular/core';
import { PanelMode } from 'src/app/Enums/Panelmode';
import { MyTeam } from 'src/app/models/MyTeam';
import { player } from 'src/app/models/player';
import { Sponzor } from 'src/app/models/Sponzor';
import { TeamSablon } from 'src/app/models/TeamSablon';
import { MyteamService } from 'src/app/services/myteam.service';
import { SponzorService } from 'src/app/services/sponzor.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  Player: player;
  Team: TeamSablon;
  Sponzor: Sponzor;
  PanelMode: PanelMode;

  // Za PanelState (PanelMod,OperationMode??,Player,Team,Sponzor,TeamList,PlayerList)

  constructor(
    private MyTeamService: MyteamService,
    private SponzorService: SponzorService
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
  }

  ngOnInit(): void {}

  ChangeMode(num: number): void {
    if (num == 0) this.PanelMode = PanelMode.IGRAC;
    else if (num == 1) this.PanelMode = PanelMode.TIM;
    else if (num == 2) this.PanelMode = PanelMode.SPOZNOR;
  }

  CreateNewObj(): void {
    switch (this.PanelMode) {
      case PanelMode.IGRAC:
        break;

      case PanelMode.SPOZNOR:
        this.SponzorService.CreateSponzor(this.Sponzor).subscribe((data) => {
          console.log(data);
        });
        break;

      case PanelMode.TIM:
        this.MyTeamService.CreateTeam(this.Team).subscribe((data) => {
          console.log(data);
        });
        break;
    }
  }

  DeleteObj(): void {
    switch (this.PanelMode) {
      case PanelMode.IGRAC:
        break;

      case PanelMode.SPOZNOR:
        break;

      case PanelMode.TIM:
        break;
    }
  }

  EditObj(): void {
    switch (this.PanelMode) {
      case PanelMode.IGRAC:
        break;

      case PanelMode.SPOZNOR:
        break;

      case PanelMode.TIM:
        break;
    }
  }
}

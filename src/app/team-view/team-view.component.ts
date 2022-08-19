import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.state';
import * as OtherTeamSelect from "src/app/store/Otherteam.selector"
import * as OtherTeamAction from "src/app/store/Otherteam.action"
import * as UserSelectors from 'src/app/store/user.selector'
import { TeamNamesEnum } from '../Enums/TeamNamesEnum';
import { player } from '../models/player';
import { selectUsersname } from 'src/app/store/user.selector';
import { selectMyTeam } from 'src/app/store/myteam.selector';
import * as MyTeamActions from 'src/app/store/myteam.action'
import * as MyTeamSelector from 'src/app/store/myteam.selector'
import { MyteamService } from '../services/myteam.service';
import { UserService } from '../services/user.service';
import { IgraciService } from '../services/igraci.service';
import { CookieService } from 'ngx-cookie-service';
import { SponzorService } from '../services/sponzor.service';
import { Sponzor } from '../models/Sponzor';
import * as UserActions from '../store/user.action';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css']
})
export class TeamViewComponent implements OnInit {

  $ComponentType:Observable<string>;
  $UsersMoney:Observable<number>;
  compType:string;
  TeamNames:string[];
  $ActiveTeam:Observable<player[]>;
  @Input() Username:string;
  Shop_mode:boolean; // false --> Igraci | true --> Sponzori
  SponzorArray:Sponzor[]; 
  $SponzorObs:Observable<Sponzor>;
  SponzorMyTeam:Sponzor;
  $MoneyObs:Observable<number>;
  MyTeamMoney:number;

  constructor(private store:Store<AppState>,private myteamservice:MyteamService,private igraciservice:IgraciService, private cookieservice:CookieService,private SponzorService:SponzorService) { 
    this.compType = "";
    this.$ComponentType = store.select(UserSelectors.SelectComponent);
    this.$UsersMoney = store.select(UserSelectors.selectUsersMoney);
    this.TeamNames = []
    this.$ActiveTeam = this.store.select(OtherTeamSelect.selectCurrentOtherTeams);
    this.Username = ""
    this.Shop_mode = false;
    this.SponzorArray = [];
    this.$SponzorObs = this.store.select(MyTeamSelector.selectSponzor);
    this.SponzorMyTeam = new Sponzor();
    this.$MoneyObs = this.store.select(UserSelectors.selectUsersMoney);
    this.MyTeamMoney = 0;
  }

  ngOnInit(): void {
    this.InitilizeTeamNames();
    this.$ComponentType.subscribe((type)=>{
      if(this.compType != type)
     {
      this.compType = type;
      if(type == "shop")
      {
      this.$ActiveTeam = this.store.select(OtherTeamSelect.selectCurrentOtherTeams);
      this.store.dispatch(OtherTeamAction.GetAllPlayers({name:TeamNamesEnum.Astralis}));
      this.store.select(OtherTeamSelect.selectName).subscribe();
      }
      else if (this.compType == "myteam")
      {
        this.ModeChange(false)
        this.$ActiveTeam = this.store.select(selectMyTeam)
        this.$SponzorObs.subscribe((sponzor)=>this.SponzorMyTeam = sponzor);
      }
     }  
    });

    this.$ActiveTeam.subscribe();
    this.$UsersMoney.subscribe();
    this.$MoneyObs.subscribe((money)=> this.MyTeamMoney = money)
    
  }
 

  InitilizeTeamNames()
  {
    var select = document.getElementById('Team-cmbox');
    let i = 0;
    const values = Object.values(TeamNamesEnum);
    
    for (let obj in TeamNamesEnum)
    {
      this.TeamNames[i] = values[i];
       i++;
    } 
  
  }


  ChangeOtherTeam()
  {
    let name = document.getElementById("Team-cmbox") as HTMLSelectElement
    this.store.dispatch(OtherTeamAction.GetAllPlayers({name:name.value}));
    this.$ActiveTeam = this.store.select(OtherTeamSelect.selectCurrentOtherTeams);
    this.$ActiveTeam.subscribe()
  }

  SellPlayer(id:number ,price:number)
  {
  
    let ID = 0;
    this.store.dispatch(MyTeamActions.SelectPlayer({ID:id}));
    this.store.select(MyTeamSelector.selectPlayer).subscribe((data)=>ID = parseInt(data?.id+"")) // Poboljsaj
    this.store.dispatch(MyTeamActions.SellPlayer({ID:ID,token:this.cookieservice.get("token")}))
    this.MyTeamMoney =  +this.MyTeamMoney + +price
    this.store.dispatch(UserActions.SaveChanges({token:this.cookieservice.get("token"),money:this.MyTeamMoney})) 
  }

  BuyPlayer(nick:string,id:number ,price:number)
  {
    let Num = 0;
    this.store.select(MyTeamSelector.selectNumberOfPlayers).subscribe((data)=> {Num = data;console.log(data)})
  
    if(Num <= 4)
    {
      if(price <= this.MyTeamMoney )
      {
      this.store.dispatch(MyTeamActions.CheckMyPlayer({nick:nick,username:this.Username,ID:id}));
      this.store.dispatch(MyTeamActions.BuyPlayer({ID:id,token:this.cookieservice.get("token")}))
      this.MyTeamMoney =  +this.MyTeamMoney - +price
      this.store.dispatch(UserActions.SaveChanges({token:this.cookieservice.get("token"),money:this.MyTeamMoney})) 
      alert(`(${Num+1}/5)`)
      }
      else
      alert('Nemate dovljno novca za kupovinu !')
     
    }
    else
    alert("Vas tim je pun (5/5)")   
   //this.igraciservice.GetPlayerID(id).subscribe((data)=>this.myteamservice.BuyMyPlayer(data).subscribe())
  }

  ModeChange(mode:boolean)
  {
    this.Shop_mode = mode;
    if(mode)
    this.GetSponzori()
    
  }
  GetSponzori()
  {
    this.SponzorService.GetAll().subscribe((data)=>{this.SponzorArray = data;console.log(this.SponzorArray[0])});  
  }

  Apliciraj(Money:number, id:number)
  {
    
    
console.log(this.SponzorMyTeam.id)
    if(this.SponzorMyTeam.id!= -1)
    return alert("Vi vec imate aktivno sponzorstvo !")

    let PureChance = Math.floor(Math.random() * (100 - 1 + 1)) + 1 
    switch(parseInt(Money+""))
    {
      case 3000:
       if(PureChance >= 85)
       {
        alert("Vas zahtev je prihvacen !")
        this.store.dispatch(MyTeamActions.AddSponzor({id:id,token:this.cookieservice.get("token")})) 
        this.MyTeamMoney = +this.MyTeamMoney+ + Money
        this.store.dispatch(UserActions.SaveChanges({token:this.cookieservice.get("token"),money:this.MyTeamMoney}))      
       }
       else
       alert("Vas zahtev je odbijen !")
      break;

      case 2000:
        if(PureChance >= 60)
        {
          alert("Vas zahtev je prihvacen !")
          this.store.dispatch(MyTeamActions.AddSponzor({id:id,token:this.cookieservice.get("token")})) 
          this.MyTeamMoney = +this.MyTeamMoney+ + Money
          this.store.dispatch(UserActions.SaveChanges({token:this.cookieservice.get("token"),money:this.MyTeamMoney})) 
        }

        else
        alert("Vas zahtev je odbijen !")
      break;

      case 1000:
        if(PureChance >= 40)
       {
        alert("Vas zahtev je prihvacen !")
        
        this.store.dispatch(MyTeamActions.AddSponzor({id:id,token:this.cookieservice.get("token")}))
        this.MyTeamMoney = +this.MyTeamMoney+ + Money
        this.store.dispatch(UserActions.SaveChanges({token:this.cookieservice.get("token"),money:this.MyTeamMoney})) 
        //this.myteamservice.AddSponzor(this.cookieservice.get("token"),id).subscribe((data)=>console.log(data))
       }
        else
        alert("Vas zahtev je odbijen !")
      break;
      default:
        alert("ho")
      break;

    }
  }
  
  PrekiniSaradanju(money:number)
  {
    
    if(money <= this.MyTeamMoney)
    {
      this.store.dispatch(MyTeamActions.RemoveSponzor({token:this.cookieservice.get("token")}))
      this.store.dispatch(UserActions.SaveChanges({token:this.cookieservice.get("token"),money:+this.MyTeamMoney- +money})) 
    }
    else
    alert("Pre prekida saradnje morate vratiti novac sponzoru !!!")


  }
}

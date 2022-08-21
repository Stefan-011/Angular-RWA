import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { player } from '../models/player';
import { Sponzor } from '../models/Sponzor';
import { CookieService } from 'ngx-cookie-service';
import * as UserActions from '../store/user.action';
import { TeamNamesEnum } from '../Enums/TeamNamesEnum';
import { Component, Input, OnInit } from '@angular/core';
import * as MyTeamActions from 'src/app/store/myteam.action'
import { selectMyTeam } from 'src/app/store/myteam.selector';
import { SponzorService } from '../services/sponzor.service';
import * as UserSelectors from 'src/app/store/user.selector';
import * as MyTeamSelector from 'src/app/store/myteam.selector';
import * as OtherTeamAction from "src/app/store/Otherteam.action";
import * as OtherTeamSelect from "src/app/store/Otherteam.selector";


@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css']
})
export class TeamViewComponent implements OnInit {

  @Input() Username:string; // Input za prosledjivanej Username-a

  //----------------Observables----------------//
  $ComponentType:Observable<string>; // Observable koji posmatra komponentu u kojoj smo
  $ActiveTeam:Observable<player[]>; // Observable koji posmatra tim koji je trenutni predstavljen
  $UsersMoney:Observable<number>; // Observable koji posmatra trenutno stanje novca korisnickog tima
  $SponzorObs:Observable<Sponzor>; // Observable koji posmatra trenutnog sponzora korisnickog tima
  //------------------------------------------//

  //---------- Pomocne promenjive -----------//
  compType:string; // Promenjiva koja pokazuje trenutnu aktivnu komponentu
  Shop_mode:boolean; // Promenjiva koja pokazuje u kom modu kupovine se nalazimo (false --> Igraci | true --> Sponzori)
  TeamNames:string[]; // Promenjiva koja sadrzi imena svih default timova
  MyTeamMoney:number; // Promenjiva koja sadrzi kolicinu novca korisnickog tima
  SponzorMyTeam:Sponzor; // Promenjiva koja sadrzi podatke sponzora korisnickog tima
  SponzorArray:Sponzor[]; // Promenjiva koja sadrzi sve postojece sponzore
  //-----------------------------------------//
  
  

  
 

  constructor(
    private store:Store<AppState>,
    private cookieservice:CookieService,
    private SponzorService:SponzorService) 
    { 
    this.compType = "";
    this.Username = "";
    this.TeamNames = [];
    this.MyTeamMoney = 0;
    this.SponzorArray = [];
    this.Shop_mode = false;
    this.SponzorMyTeam = new Sponzor();
    this.$UsersMoney = store.select(UserSelectors.selectUsersMoney);
    this.$ComponentType = store.select(UserSelectors.SelectComponent);
    this.$SponzorObs = this.store.select(MyTeamSelector.selectSponzor);
    this.$ActiveTeam = this.store.select(OtherTeamSelect.selectCurrentOtherTeams);  
  }

  ngOnInit(): void 
  {
    this.GetSponzori();
    this.InitilizeTeamNames();
    this.$ActiveTeam.subscribe();
    this.$ComponentType.subscribe((type)=>{  // Kada usledi promena trenutne komponente izvrsava se jedna od dve moguce sekvence
      if(this.compType != type)
     {
        this.compType = type;
        if(type == "shop") // Aktivira se "Shop" layout
        {
          this.$ActiveTeam = this.store.select(OtherTeamSelect.selectCurrentOtherTeams);
          this.store.dispatch(OtherTeamAction.GetAllPlayers({name:TeamNamesEnum.Astralis}));
          this.store.select(OtherTeamSelect.selectName).subscribe();
        }
        else if (this.compType == "myteam") // Aktivira se "MyTeam" layout
        {
          this.ModeChange(false)
          this.$ActiveTeam = this.store.select(selectMyTeam)
          this.$SponzorObs.subscribe((sponzor)=>this.SponzorMyTeam = sponzor);
        }
     }  
    });

    this.$UsersMoney.subscribe((money)=> this.MyTeamMoney = money);
  }
 

 // Inicijalizacija Combobox-a sa imenima default timova
  InitilizeTeamNames():void 
  {
    let i = 0;
    const values = Object.values(TeamNamesEnum);
    for (let obj in TeamNamesEnum)
    {
      this.TeamNames[i] = values[i];
       i++;
    } 
  }

// Na event promene vrednosti combobox opcija se menja stanje trenutno aktivnog predstavljenog tima
  ChangeOtherTeam():void
  {
    let name = document.getElementById("Team-cmbox") as HTMLSelectElement;
    this.store.dispatch(OtherTeamAction.GetAllPlayers({name:name.value}));
    this.$ActiveTeam = this.store.select(OtherTeamSelect.selectCurrentOtherTeams);
  }


// Na (click) dugmeta da prodavanje igraca se aktiviria i prodaje igraca 
  SellPlayer(id:number ,price:number):void
  {
   // U ovom bloku se selektuje igrac kog treba prodati i u bazi podataka se on uklanja iz tima
    let ID = 0;
    this.store.dispatch(MyTeamActions.SelectPlayer({ID:id}));
    this.store.select(MyTeamSelector.selectPlayer).subscribe((data)=>ID = parseInt(data?.id+""));
    this.store.dispatch(MyTeamActions.SellPlayer({ID:ID,token:this.cookieservice.get("token")}));

    // U ovom bloku se obradjuje povracaj novca korisniku
    this.MyTeamMoney =  +this.MyTeamMoney + +price;
  }


// Na (click) dugmeta da kupovinu igraca se aktiviria i kupuje igraca
  BuyPlayer(nick:string,id:number ,price:number):void
  {
    let Num = 0; 
    this.store.select(MyTeamSelector.selectNumberOfPlayers).subscribe((data)=> Num = data); // Ovde dobijamo broj igraca u korisnickom timu
  
    if(Num <= 4) // Ovde radimo proveru da li postoji slobodno mesto u timu za novog igraca
    {
      if(price <= this.MyTeamMoney ) // Ovde proveravamo da li korisnik ima dovoljno novca za ovu transakciju
      {
      this.store.dispatch(MyTeamActions.BuyPlayer({ID:id,token:this.cookieservice.get("token")}));
      this.store.select(MyTeamSelector.selectNumberOfPlayers).subscribe((data)=> Num = data);  
      Num++;
      alert("("+Num+"/5)")
      }
      else
      alert('Nemate dovljno novca za kupovinu !');
    }
    else
    alert("Vas tim je pun (5/5)")   
  }


  // Promna stanja Shop-a
  ModeChange(mode:boolean):void
  {
    this.Shop_mode = mode;
  }

 // Funkcija za uzimanje sponzora iz baze podataka
  GetSponzori():void
  {
    this.SponzorService.GetAll().subscribe((data)=>this.SponzorArray = data);  
  }


// Funkcija koja se poziva na event (click) koja sluzi za apliciranje  u cilju saradnje korisnickog tima za sponzorom
  Apliciraj(Money:number, id:number)
  {
    
    let PureChance = 0, ExitResult = false; // Promenjiva koja predstavnja sansu koju korisnik ima za ostvarenjem saradnje

    if(this.SponzorMyTeam.id!= -1)
    return alert("Vi vec imate aktivno sponzorstvo !")

    PureChance = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

    switch(parseInt(Money+""))
    {
      case 3000:
       if(PureChance >= 95)
        ExitResult = true;
      break;

      case 2000:
        if(PureChance >= 80)
          ExitResult = true; 
      break;

      case 1000:
        if(PureChance >= 40)
        ExitResult = true; 
      break;

      default:
      break;
    }

    if(ExitResult == true)
    {
        alert("Vas zahtev je prihvacen !")
        this.MyTeamMoney = +this.MyTeamMoney+ + Money
        this.store.dispatch(MyTeamActions.AddSponzor({id:id,token:this.cookieservice.get("token")}))      
        console.log("hm")
    }
    else
    alert("Vas zahtev je odbijen !")
  }
  

 // Funkcija koja se poziva na event (click) koja sluzi za prekid saradnje korisnickog tima za sponzorom
  PrekiniSaradanju(money:number)
  {
    if(money <= this.MyTeamMoney) // Provera da li korisnik ima dovoljno novca za prekid saranje za sponzorom
    {
      this.store.dispatch(MyTeamActions.RemoveSponzor({token:this.cookieservice.get("token")}))
    }
    else
    alert("Pre prekida saradnje morate vratiti novac sponzoru !!!")
  }
}

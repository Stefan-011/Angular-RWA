import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as OtherTeamSelect from "src/app/store/Otherteam.selector"
import * as UserSelect from "src/app/store/user.selector"
import { GameStats } from '../../models/GameStats';
import { MapsEnum } from '../../Enums/MapsEnum';
import { player } from '../../models/player';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { Observable,  } from 'rxjs';



@Component({
  selector: 'app-rezultat',
  templateUrl: './rezultat.component.html',
  styleUrls: ['./rezultat.component.css']
})

export class RezultatComponent implements OnInit {
  
  @Output() ResultListener:EventEmitter<string[]>;
  @Input() $ActiveTeam:Observable<player[]>; 
  @Input() $MyTeam:Observable<player[]>;

  RightTeamName:string; 
  LeftTeamName:string 
  MapsUsed:string[]; 

  LeftTeam:player[]; 
  RightTeam:player[]; 
  
  LeftWinns:number; 
  RightWinns:number; 


  constructor(private store:Store<AppState>) { 
    this.ResultListener = new EventEmitter();
    this.$ActiveTeam = new Observable();
    this.$MyTeam = new Observable();
    this.LeftTeamName = "";
    this.RightTeamName = ""
    this.RightTeam = [];
    this.RightWinns = 0;
    this.LeftTeam = [];
    this.LeftWinns = 0;
    this.MapsUsed = [];
  }

  ngOnInit(): void {
    this.$MyTeam.subscribe((data)=>this.LeftTeam = data);
    this.$ActiveTeam.subscribe((data)=>this.RightTeam = data);
    this.store.select(UserSelect.selectUsersname).subscribe((data)=>this.LeftTeamName = data)
    this.store.select(OtherTeamSelect.selectName).subscribe((data)=>this.RightTeamName = data)
  }

  RacunajEfektivnostTima(Team:player[]):number
  {
    let RetVal = 0;
    Team.forEach((player)=>
    {
      RetVal += (player.impact*40)+(player.kd*60)+(player.rating*10) 
    })

    return RetVal + Math.floor(Math.random() * (20 - 1 + 1)) + 1;  
  }

 
  Simuliraj():void
  {
    if(this.LeftTeam.length < 5)
    return alert("Vas tim ima manje od 5 igraca !!!");

    let Btn = document.getElementById("btn-sim") as HTMLButtonElement;
    let Row = document.getElementById("GameTable") as HTMLTableRowElement;
    this.ResultListener.emit(["",""])
    Btn.disabled = true;
    let GameCounter = 1;
    this.RightWinns = 0;
    this.LeftWinns = 0;
    this.MapsUsed = []
    let winner = "";


    while (Row.firstChild) {
      Row.removeChild(Row.firstChild);
    }

     let display = setInterval(() => {
      this.StartGame(GameCounter)
      GameCounter++;
      if(this.RightWinns == 2 || this.LeftWinns == 2) 
      { 
        clearInterval(display);

        if(this.RightWinns == 2)
        winner = this.RightTeamName
        else
        winner = this.LeftTeamName  

        let Array = [this.LeftWinns+":"+this.RightWinns,"Pobednik: "+winner.toUpperCase()]
        this.ResultListener.emit(Array)
        Btn.disabled = false;
      }
    }, 2500);      
  }


  GetRandomMap():string
  {
    let Index = Math.floor(Math.random() * (7 - 1 + 0)) + 0;

    switch(Index)
    {
      case 0:
        break;
        case 0:
          return MapsEnum.Inferno
        break;
        case 1:
          return MapsEnum.Cache
        break;
        case 2:
          return MapsEnum.Mirage
        break;
        case 3:
          return MapsEnum.Nuke
        break;
        case 4:
          return MapsEnum.Overpass
        break;
        case 5:
          return MapsEnum.Dust2
        break;
        case 6:
          return MapsEnum.Vertigo
        break;
        case 7:
          return MapsEnum.Train
        break;
        default:
          return MapsEnum.Dust2
        break;
    }
    return MapsEnum.Dust2
  }


 
  RoundsAlghoritm(LeftScore:number,rightScore:number,Game:number):string
  {
    let HigherChance, Razlika,HigherRound = 0,LowwerRound = 0;

    if(LeftScore > rightScore)
    HigherChance = false;
    else
    HigherChance = true;

    Razlika =  Math.abs(LeftScore - rightScore);
    switch(Game)
    {
      case 1:
        HigherRound = this.RoundsAlghoritmExtension(Razlika,true);
        LowwerRound = this.RoundsAlghoritmExtension(Razlika,false)
        
        while( HigherRound != 16 && LowwerRound != 16 || HigherRound == 16 && LowwerRound == 16)
        {
          HigherRound = this.RoundsAlghoritmExtension(Razlika,true);
          LowwerRound = this.RoundsAlghoritmExtension(Razlika,false);
        }  
      break;
      case 2: 
      HigherRound = this.RoundsAlghoritmExtension(Razlika,true);
      LowwerRound = this.RoundsAlghoritmExtension(Razlika,false)
      while( HigherRound != 16 && LowwerRound != 16 || HigherRound == 16 && LowwerRound == 16)
      {
        HigherRound = this.RoundsAlghoritmExtension(Razlika,true);
        LowwerRound = this.RoundsAlghoritmExtension(Razlika,false);
      } 
      break;
      case 3:
       if(Razlika > 30)
       {
        HigherRound = 16
        LowwerRound = 404;
        while(LowwerRound > 16)
        {
          LowwerRound = this.RoundsAlghoritmExtension(Razlika,false);
        }  
       }  
       else{
        HigherRound = this.RoundsAlghoritmExtension(Razlika,true);
        LowwerRound = this.RoundsAlghoritmExtension(Razlika,false)
        while( HigherRound != 16 && LowwerRound != 16)
        {
          HigherRound = this.RoundsAlghoritmExtension(Razlika,true);
          LowwerRound = this.RoundsAlghoritmExtension(Razlika,false);
        } 
       }
      break;
    }
    if(HigherChance == false)
    {
      if(HigherRound > LowwerRound)
      this.LeftWinns++;
      else
      this.RightWinns++;
      
      return HigherRound + " : " +LowwerRound;
    }
    else
    {
      if(HigherRound > LowwerRound)
      this.RightWinns++;
      else  
      this.LeftWinns++;

      return LowwerRound + " : " +HigherRound;
    }
   
  } 


  RoundsAlghoritmExtension(Difference:number,Type:boolean):number 
  {
   if(Type == true)
   {
    if(Difference <= 30)
    return  Math.floor(Math.random() * (16 - 6 + 1)) + 6 
    else if(Difference <= 60)
    return  Math.floor(Math.random() * (16 - 15 + 1)) + 15 
    else
    return  16
   }
   else 
   {
    if(Difference <= 30)
    return  Math.floor(Math.random() * (16 - 12 + 1)) + 12 
    else if(Difference <= 60)
    return  Math.floor(Math.random() * (16 - 3 + 1)) + 3 
    else
    return  Math.floor(Math.random() * (10 - 1 + 1)) + 1
   }
  }


DrawResult(element:GameStats):void
 {
    let Table = document.getElementById("GameTable") as HTMLTableElement;
    let Row = document.createElement("TR");
    Table.appendChild(Row);
  for(let i = 0 ; i < 3; i++)
  {
    let NewData = document.createElement("TD")
    NewData.style.width="30%";
    switch(i)
    {
      case 0:
        NewData.innerHTML = this.LeftTeamName;
      break;

      case 1:
        NewData.innerHTML = element.Map+"<br>"+element.Rounds;
      break;

      case 2:
        NewData.innerHTML = this.RightTeamName;
      break;
    }
    Row.appendChild(NewData);
  }
}


CheckMapAppearance(map:string):boolean
{
  let DuplicateCounter = 0;
  this.MapsUsed.forEach(element => {

    if(map == element)
    {
      DuplicateCounter++;
    }   
  }); 
  if(DuplicateCounter != 0 )
    return false;
  else
    return true;
}


StartGame(GameCounter:number):void
{
  let v:GameStats = {
    Map:"0",
    Rounds:"0"
  }

  do{
    v.Map = this.GetRandomMap();
   }
   while(this.CheckMapAppearance(v.Map) != true)

      v.Rounds = this.RoundsAlghoritm(
        this.RacunajEfektivnostTima(this.LeftTeam),
        this.RacunajEfektivnostTima(this.RightTeam),
        GameCounter
        );
      this.MapsUsed[GameCounter-1] = v.Map;   
      this.DrawResult(v);
      GameCounter++;
}

}


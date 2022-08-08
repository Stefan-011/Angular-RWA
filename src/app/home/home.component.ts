import { Component, HostListener, OnInit, Output } from '@angular/core';
import { IgraciService } from '../services/igraci.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Output() ruta:number;
  @Output() MenuState:boolean;// Promenjiva koja aktivira collapse menu

  constructor(private test:IgraciService)
  {
    this.ruta = -1;
    this.MenuState = false;
  }

  ngOnInit()
  {
   // this.test.Test().subscribe();
    this.test.TestGet().subscribe((data)=>{console.log(data.money)});
    this.test.GetAllTeams().subscribe((data)=>{console.log(data)})
  }

  switchR(text:string)
  {
    
    switch(text)
    {
      case "sim":
        this.ruta = 0;
        break;
        case "myteam":
        this.ruta = 1;
        break;
        case "shop":
        this.ruta = 2;
        break;
        default :
        this.ruta = -1;
        break;
    }
  }

// Listener koji gleda promenu sirine ekrana
@HostListener('window:resize', ['$event'])
onWindowResize(): void 
{
  let  getScreenWidth = window.innerWidth;
  if(getScreenWidth >= 991 && this.MenuState == true)
  this.MenuState = false;
}
OpenCollapse()
{
  let  getScreenWidth = window.innerWidth;
  getScreenWidth = window.innerWidth;
  if(getScreenWidth <= 991 && this.MenuState == false)
  this.MenuState = true;
  else
    this.MenuState = false;
}


}

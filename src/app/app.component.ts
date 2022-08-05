import { Component, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MajorSim';

  @Output() ruta:number;
  @Output() MenuState:boolean;// Promenjiva koja aktivira collapse menu

  constructor()
  {
    this.ruta = 2;
    this.MenuState = false;
  }

  ngInit()
  {

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

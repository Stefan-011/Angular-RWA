import { Component, HostListener, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { IgraciService } from './services/igraci.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MajorSim';

 
  constructor(private router:Router)
  {
   
  }

  ngOnInit()
  {
    this.router.navigate(["login"]);
  }

  


}

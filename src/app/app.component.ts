import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin-app';

  constructor(private router: Router){
  }

  onTabChange(event: any): void{
    const selectedTabIndex = event.index;
    let url = "";
    switch(selectedTabIndex){
      case 0:
        url = "/personas";
        break;
      case 1:
        url = "/colectivos";
        break;
      case 2:
        url = "/viajes";
        break; 
      default:
        break;
    }

    this.router.navigateByUrl(url);
  }

  
  
}

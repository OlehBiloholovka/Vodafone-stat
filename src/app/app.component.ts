import { Component } from '@angular/core';
import {AutoLogoutService} from './authentication/shared/auto-logout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Vodafone-stat';
  constructor(private autoLogoutService: AutoLogoutService) {
    this.autoLogoutService.start();
  }
}

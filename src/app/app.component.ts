import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { IndexComponent } from "./components/pages/index/index.component";
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fordenter-sprint07-angular';

  

}

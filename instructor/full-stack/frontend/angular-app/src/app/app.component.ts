import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BankAccountComponent } from './components/bank-account.component';
import { HeadingComponent } from './components/heading/heading.component';
import { NavigationComponent } from "./components/navigation/navigation.component";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule,
    RouterOutlet,
    BankAccountComponent,
    HeadingComponent, NavigationComponent]
})
export class AppComponent {

}

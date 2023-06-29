import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankAccount } from 'src/app/services/bank-account.service';

@Component({
  selector: 'app-heading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent {


  balance = inject(BankAccount).getBalance();

}

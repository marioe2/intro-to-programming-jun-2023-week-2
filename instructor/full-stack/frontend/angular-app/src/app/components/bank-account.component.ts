import { CurrencyPipe } from "@angular/common";
import { Component, signal } from "@angular/core";

@Component({
    selector: 'app-account',
    template: `
    <section>
        <span>Your balance is {{balance() | currency}}</span>
    </section>
    <section>
        <label>Amount: <input type="number" #amount /></label>
    </section>
    <section>
        <button class="btn btn-primary" (click)="deposit(amount)">Deposit</button>
        <button (click)="withdraw(amount)">Withdraw</button>
    </section>
  
    `,
    imports: [CurrencyPipe],
    standalone: true
})
export class BankAccountComponent {

    balance = signal(5000);


    deposit(amount: HTMLInputElement) {
        this.balance.set(this.balance() + amount.valueAsNumber);
        amount.value = '';
        amount.focus();
    }

    withdraw(amount: HTMLInputElement) {
        this.balance.set(this.balance() - amount.valueAsNumber);
        amount.value = '';
        amount.focus();
    }
}
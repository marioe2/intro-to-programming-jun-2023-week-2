import { CurrencyPipe, NgIf } from "@angular/common";
import { Component, Signal, signal } from "@angular/core";
import { BankAccount } from "../services/bank-account.service";



@Component({
    selector: 'app-account',
    template: `
<section>
<span>Your balance is {{balance() | currency}}</span>
</section>
<section>
<label>Amount: <input type="number" #amount (keyup)="checkForOverdraft(amount.valueAsNumber)" /></label>
</section>

<section>
<button class="btn btn-primary" (click)="deposit(amount)">Deposit</button>
<button (click)="withdraw(amount)">Withdraw</button>
</section>
    `,
    imports: [CurrencyPipe, NgIf],
    standalone: true
})
export class BankAccountComponent {

    balance: Signal<number>;
    overdraftWarning = signal(false);

    constructor(private account: BankAccount) {
        this.balance = account.getBalance();
    }

    checkForOverdraft(amount: number) {
        if (amount > this.balance()) {
            this.overdraftWarning.set(true);
        } else {
            this.overdraftWarning.set(false);
        }
    }

    deposit(amount: HTMLInputElement) {
        this.account.makeDeposit(amount.valueAsNumber);
        amount.value = '';
        amount.focus();
    }



    withdraw(amount: HTMLInputElement) {
        this.account.makeWithdrawal(amount.valueAsNumber);
        amount.value = '';
        amount.focus();
    }
}
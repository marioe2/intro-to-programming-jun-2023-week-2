import { Injectable, effect, signal } from '@angular/core';
import { BonusCalculator } from './bonus-calculator.service';

@Injectable({ providedIn: 'root' })
export class BankAccount {
  private balance = signal(0);

  constructor(private bonusCalculator: BonusCalculator) {
    const savedBalance = localStorage.getItem('balance');
    if (savedBalance != null) {
      this.balance.set(parseFloat(savedBalance));
    }
    effect(() => {
      // simulated API call
      localStorage.setItem('balance', this.balance().toString());
    });
  }
  getBalance() {
    return this.balance.asReadonly();
  }

  makeDeposit(amount: number) {
    // send it to an API,
    // calculate a bonus
    const bonus = this.bonusCalculator.calculateBonusForDepositOn(
      this.balance(),
      amount
    );
    this.balance.set(this.balance() + amount + bonus);
  }

  makeWithdrawal(amount: number) {
    if (amount > this.balance()) {
      throw new Error('Overdraft!');
    }
    this.balance.set(this.balance() - amount);
  }
}

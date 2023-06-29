import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class BonusCalculator {
    calculateBonusForDepositOn(balance: number, amount: number): number {
        return balance >= 5000 ? amount * .10 : 0;
    }
}
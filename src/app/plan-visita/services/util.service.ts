import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export class UtilService {

    public formatAmounts(amount: string): string {
        let amountFormated: string;
        const amountFixed = Number(Number.parseFloat(amount).toFixed(2));
        amountFormated = amountFixed.toLocaleString('es-CL');
        return amountFormated;
    }

    public calculatePercentage(goal: number, volSelled: number ): string {
      let percentageAmount: string;
      const firstCalc = volSelled * 100;
      const secondCalc = firstCalc / goal;
      percentageAmount = this.formatAmounts(secondCalc.toString());
      return percentageAmount;
    }

    public calculatePercentageNumber(goal: number, volSelled: number ): number {
      let percentageAmount: number;
      const firstCalc = volSelled * 100;
      const secondCalc = firstCalc / goal;
      const amountFixed = Number(secondCalc.toFixed(2));
      percentageAmount = amountFixed;
      return percentageAmount;

    }

    public fixNumber(value: number): number {
      const numberReturn = Number(value.toFixed(2));
      return numberReturn;
    }

    public calculateParcialized(goal: number, selled: number, totalDays: number, currDay: number): number {
      let value = 0;
      value = selled / (goal * (currDay / totalDays));
      return this.fixNumber(value);
    }
}

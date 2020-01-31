import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'remainingDays'
})
export class RemainingDaysPipe implements PipeTransform {
  transform(value: any, ...args: any[]): string {
    const currentDate: Date = new Date();
    const expirationDate: Date = new Date(value);
    const diffInDays = Math.floor(
      (Date.UTC(
        expirationDate.getFullYear(),
        expirationDate.getMonth(),
        expirationDate.getDate()
      ) -
        Date.UTC(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        )) /
        (1000 * 60 * 60 * 24)
    );
    return diffInDays > 0
      ? `Mancano ${diffInDays} giorni`
      : diffInDays === 0
      ? `Il task è scaduto`
      : `Il task è scaduto ${Math.abs(diffInDays)} giorni fa`;
  }
}

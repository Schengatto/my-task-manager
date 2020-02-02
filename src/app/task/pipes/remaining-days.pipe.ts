import { Pipe, PipeTransform } from '@angular/core';
import { DateUtils } from './../../utils/date-utils';

@Pipe({
  name: 'remainingDays'
})
export class RemainingDaysPipe implements PipeTransform {
  transform(value: any, ...args: any[]): string {
    const currentDate: Date = new Date();
    const expirationDate: Date = new Date(value);
    const diffInDays = DateUtils.daysBetweenDates(currentDate, expirationDate);
    return diffInDays > 0
      ? `This Task will expire in ${diffInDays} days`
      : diffInDays === 0
      ? `This Task expires today`
      : `This Task expired ${Math.abs(diffInDays)} days ago`;
  }
}

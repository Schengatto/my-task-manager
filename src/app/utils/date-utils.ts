/**
 * Utility class for managing dates
 *
 * @author enrico.schintu
 * @version Feb 02, 2020
 *
 */
export class DateUtils {
  /**
   * Return the difference in days between the two dates provided as input.
   * @param startingDate
   * @param endingDate
   */
  static daysBetweenDates(startingDate: Date, endingDate: Date): number {
    return Math.floor(
      (Date.UTC(
        endingDate.getFullYear(),
        endingDate.getMonth(),
        endingDate.getDate()
      ) -
        Date.UTC(
          startingDate.getFullYear(),
          startingDate.getMonth(),
          startingDate.getDate()
        )) /
        (1000 * 60 * 60 * 24)
    );
  }
}

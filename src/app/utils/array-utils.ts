/**
 * Utility class for managing array sorts
 *
 * @author enrico.schintu
 * @version Sep 20, 2018
 *
 */
export class ArrayUtils {
  /** Sort the array in ascending order  */
  static orderAsc(array: Array<any>): Array<any> {
    return this.simpleSort(array, true);
  }

  /** Sort the array in descending order */
  static orderDesc(array: Array<any>): Array<any> {
    return this.simpleSort(array, false);
  }

  /** Sort the array in ascending order by the value of the object property passed in input  */
  static orderAscByProperty(
    array: Array<any>,
    propertyName: string
  ): Array<any> {
    return this.sortByProperty(array, true, propertyName);
  }

  /** Sort the array in descending order by the value of the object property passed in input  */
  static orderDescByProperty(
    array: Array<any>,
    propertyName: string
  ): Array<any> {
    return this.sortByProperty(array, false, propertyName);
  }

  private static simpleSort(array: Array<any>, isASC: boolean): Array<any> {
    return array.sort((a: any, b: any) => {
      if (a > b) {
        return isASC ? 1 : -1;
      }
      if (a < b) {
        return isASC ? -1 : 1;
      }
      return 0;
    });
  }

  private static sortByProperty(
    array: Array<any>,
    isASC: boolean,
    propertyName: string
  ) {
    return array.sort((a: any, b: any) => {
      let valA = a[propertyName];
      let valB = b[propertyName];

      // Ignore case for string
      if (
        typeof a[propertyName] === 'string' &&
        typeof b[propertyName] === 'string'
      ) {
        valA = String(a[propertyName]).toLowerCase();
        valB = String(b[propertyName]).toLowerCase();
      }

      if (valA > valB) {
        return isASC ? 1 : -1;
      }
      if (valA < valB) {
        return isASC ? -1 : 1;
      }
      return 0;
    });
  }
}

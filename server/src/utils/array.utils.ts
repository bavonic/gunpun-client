export class ArrayUtils {
  static removeDuplicate(array: any[]) {
    let output: any[] = [];

    array.forEach((element: any) => {
      if (!output.find(v => typeof v === typeof element && v.toString() === element.toString())) {
        output.push(element);
      }
    });

    return output;
  }
}
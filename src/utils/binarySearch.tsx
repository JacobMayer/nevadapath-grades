import type { Grade } from "~/data/gradeType";

export function binarySearch(arr: Grade[], n: string) {
  n = n.replaceAll(" ", "");
  let min = 0;
  let max = arr.length - 1;

  const indicies = [];
  //let mid
  // while (min <= max) {
  //   mid = (min + max) >>> 1;

  //   console.log(`${arr[mid].Subject}${arr[mid].Number}${arr[mid].Ext}`, n);
  //   if (`${arr[mid].Subject}${arr[mid].Number}${arr[mid].Ext}` === n) {
  //     for (let i = mid; i < arr.length; i++) {
  //       if (`${arr[i].Subject}${arr[i].Number}${arr[i].Ext}` !== n) {
  //         break;
  //       }
  //       indicies.push(i);
  //     }
  //     for (let i = mid; i >= 0; i--) {
  //       if (`${arr[i].Subject}${arr[i].Number}${arr[i].Ext}` !== n) {
  //         break;
  //       }
  //       indicies.push(i);
  //     }
  //     return indicies;
  //   } else if (`${arr[mid].Subject}${arr[mid].Number}${arr[mid].Ext}` < n) {
  //     min = mid + 1;
  //   } else {
  //     max = mid - 1;
  //   }
  // }

  while (min <= max) {
    const mid = Math.floor((min + max) / 2);
    console.log(
      `${arr[mid]?.Subject ?? ""}${arr[mid]?.Number ?? ""}${
        arr[mid]?.Ext ?? ""
      }`,
      n
    );
    if (
      `${arr[mid]?.Subject ?? ""}${arr[mid]?.Number ?? ""}${
        arr[mid]?.Ext ?? ""
      }` === n
    ) {
      for (let i = mid; i < arr.length; i++) {
        if (
          `${arr[i]?.Subject ?? ""}${arr[i]?.Number ?? ""}${
            arr[i]?.Ext ?? ""
          }` !== n
        ) {
          break;
        }
        indicies.push(i);
      }
      for (let i = mid; i >= 0; i--) {
        if (
          `${arr[i]?.Subject ?? ""}${arr[i]?.Number ?? ""}${
            arr[i]?.Ext ?? ""
          }` !== n
        ) {
          break;
        }
        indicies.push(i);
      }
      return indicies;
    } else if (
      `${arr[mid]?.Subject ?? ""}${arr[mid]?.Number ?? ""}${
        arr[mid]?.Ext ?? ""
      }` < n
    ) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }

  return [-1];
}

export function linearSearch(arr: Grade[], n: string) {
  n = n.replaceAll(" ", "");
  const indicies = [];
  for (let i = 0; i < arr.length; i++) {
    if (
      `${arr[i]?.Subject ?? ""}${arr[i]?.Number ?? ""}${arr[i]?.Ext ?? ""}` ===
      n
    ) {
      indicies.push(i);
    }
  }
  return indicies;
}

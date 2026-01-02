import type { SortEvent } from "../types/SortEvent";

export function radixSort(input: number[]): SortEvent[] {
  const events: SortEvent[] = [];
  const arr = [...input];

  if (arr.length <= 1) {
    if (arr.length === 1) {
      events.push({ type: "markSorted", index: 0 });
    }
    return events;
  }
  const max = Math.max(...arr);

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(arr, exp, events);
  }

  for (let i = 0; i < arr.length; i++) {
    events.push({ type: "markSorted", index: i });
  }

  return events;
}

function countingSortByDigit(arr: number[], exp: number, events: SortEvent[]) {
  const output = new Array(arr.length);
  const count = new Array(10).fill(0);

  for (let i = 0; i < arr.length; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }

  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[--count[digit]] = arr[i];
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];

    events.push({
      type: "overwrite",
      index: i,
      value: arr[i],
    });
  }
}

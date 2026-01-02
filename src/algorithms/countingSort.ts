import type { SortEvent } from "../types/SortEvent";

export function countingSort(input: number[]): SortEvent[] {
  const events: SortEvent[] = [];
  const arr = [...input];
  const n = arr.length;

  if (n <= 1) {
    if (n === 1) {
      events.push({ type: "markSorted", index: 0 });
    }
    return events;
  }

  let min = arr[0];
  let max = arr[0];

  for (let i = 1; i < n; i++) {
    if (arr[i] < min) min = arr[i];
    if (arr[i] > max) max = arr[i];
  }

  if (min < 0) return events;

  const range = max - min + 1;
  const count = new Array(range).fill(0);

  for (let i = 0; i < n; i++) {
    count[arr[i] - min]++;
  }

  let index = 0;

  for (let value = 0; value < range; value++) {
    while (count[value] > 0) {
      events.push({ type: "overwrite", index, value: value + min });

      arr[index] = value + min;
      index++;
      count[value]--;
    }
  }

  for (let i = 0; i < n; i++) {
    events.push({ type: "markSorted", index: i });
  }

  return events;
}

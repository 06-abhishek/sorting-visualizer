import type { SortEvent } from "../types/SortEvent";

export function insertionSort(input: number[]): SortEvent[] {
  const events: SortEvent[] = [];
  const arr = [...input];

  for (let i = 1; i < arr.length; i++) {
    let j = i;

    while (j > 0) {
      events.push({ type: "compare", i: j - 1, j });

      if (arr[j - 1] > arr[j]) {
        [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
        events.push({ type: "swap", i: j - 1, j });
      } else {
        break;
      }

      j--;
    }
  }

  for (let i = 0; i < arr.length; i++) {
    events.push({ type: "markSorted", index: i });
  }

  return events;
}

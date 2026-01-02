import type { SortEvent } from "../types/SortEvent";

export function bubbleSort(arr: number[]): SortEvent[] {
  const events: SortEvent[] = [];
  const a = [...arr];

  let swapped: boolean = false;
  let sortedCount: number = 0;

  do {
    swapped = false;

    for (let i = 0; i < a.length - 1 - sortedCount; i++) {
      events.push({ type: "compare", i: i, j: i + 1 });

      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];

        events.push({ type: "swap", i: i, j: i + 1 });

        swapped = true;
      }
    }

    sortedCount++;

    events.push({ type: "markSorted", index: a.length - sortedCount });
  } while (swapped);

  return events;
}

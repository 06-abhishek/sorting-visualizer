import type { SortEvent } from "../types/SortEvent";

export function selectionSort(input: number[]): SortEvent[] {
  const events: SortEvent[] = [];

  const arr = [...input];
  const n = arr.length;

  if (n <= 1) {
    if (n === 1) {
      events.push({ type: "markSorted", index: 0 });
    }
    return events;
  }

  for (let selected = 0; selected < n - 1; selected++) {
    let minIndex = selected;

    for (let i = selected + 1; i < n; i++) {
      events.push({ type: "compare", i, j: minIndex });
      if (arr[i] < arr[minIndex]) minIndex = i;
    }

    if (minIndex !== selected) {
      events.push({ type: "swap", i: minIndex, j: selected });
      [arr[minIndex], arr[selected]] = [arr[selected], arr[minIndex]];
    }

    events.push({ type: "markSorted", index: selected });
  }

  events.push({ type: "markSorted", index: n - 1 });

  return events;
}

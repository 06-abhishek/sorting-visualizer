import type { SortEvent } from "../types/SortEvent";

export function heapSort(input: number[]): SortEvent[] {
  const events: SortEvent[] = [];
  const arr = [...input];
  const n = arr.length;

  if (n <= 1) {
    if (n === 1) {
      events.push({ type: "markSorted", index: 0 });
    }
    return events;
  }

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, events);
  }

  for (let end = n - 1; end > 0; end--) {
    events.push({ type: "swap", i: 0, j: end });
    [arr[0], arr[end]] = [arr[end], arr[0]];

    events.push({ type: "markSorted", index: end });

    heapify(arr, end, 0, events);
  }

  events.push({ type: "markSorted", index: 0 });

  return events;
}

function heapify(
  arr: number[],
  heapSize: number,
  root: number,
  events: SortEvent[]
): void {
  let largest = root;

  while (true) {
    const left = 2 * largest + 1;
    const right = 2 * largest + 2;
    let candidate = largest;

    if (left < heapSize) {
      events.push({ type: "compare", i: left, j: candidate });
      if (arr[left] > arr[candidate]) {
        candidate = left;
      }
    }

    if (right < heapSize) {
      events.push({ type: "compare", i: right, j: candidate });
      if (arr[right] > arr[candidate]) {
        candidate = right;
      }
    }

    if (candidate === largest) return;

    events.push({ type: "swap", i: largest, j: candidate });
    [arr[largest], arr[candidate]] = [arr[candidate], arr[largest]];

    largest = candidate;
  }
}

import type { SortEvent } from "../types/SortEvent";

export function mergeSort(input: number[]): SortEvent[] {
  const events: SortEvent[] = [];
  const arr = [...input];
  const aux = [...arr];

  if (arr.length <= 1) {
    if (arr.length === 1) {
      events.push({ type: "markSorted", index: 0 });
    }
    return events;
  }

  mergeSortHelper(arr, aux, 0, arr.length - 1, events);

  // Mark all as sorted at the end
  for (let i = 0; i < arr.length; i++) {
    events.push({ type: "markSorted", index: i });
  }

  return events;
}

function mergeSortHelper(
  arr: number[],
  aux: number[],
  start: number,
  end: number,
  events: SortEvent[]
): void {
  if (start >= end) return;

  const mid = Math.floor((start + end) / 2);

  mergeSortHelper(arr, aux, start, mid, events);
  mergeSortHelper(arr, aux, mid + 1, end, events);
  merge(arr, aux, start, mid, end, events);
}

function merge(
  arr: number[],
  aux: number[],
  start: number,
  mid: number,
  end: number,
  events: SortEvent[]
): void {
  // Copy current range into auxiliary array
  for (let i = start; i <= end; i++) {
    aux[i] = arr[i];
  }

  let i = start;
  let j = mid + 1;
  let k = start;

  while (i <= mid && j <= end) {
    events.push({ type: "compare", i, j });

    if (aux[i] <= aux[j]) {
      events.push({ type: "overwrite", index: k, value: aux[i] });
      arr[k++] = aux[i++];
    } else {
      events.push({ type: "overwrite", index: k, value: aux[j] });
      arr[k++] = aux[j++];
    }
  }

  while (i <= mid) {
    events.push({ type: "overwrite", index: k, value: aux[i] });
    arr[k++] = aux[i++];
  }
}

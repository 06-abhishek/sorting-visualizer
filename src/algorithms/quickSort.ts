import type { SortEvent } from "../types/SortEvent";

export function quickSort(input: number[]): SortEvent[] {
  const events: SortEvent[] = [];
  const arr = [...input];
  const n = arr.length;

  if (n <= 1) {
    if (n === 1) {
      events.push({ type: "markSorted", index: 0 });
    }
    return events;
  }

  quickSortHelper(arr, 0, n - 1, events);

  // for (let i = 0; i < n; i++) {
  //   events.push({ type: "markSorted", index: i });
  // }

  return events;
}

function quickSortHelper(
  arr: number[],
  low: number,
  high: number,
  events: SortEvent[]
): void {
  if (low > high) return;

  if (low === high) {
    events.push({ type: "markSorted", index: low });
    return;
  }

  const pivotIndex = partition(arr, low, high, events);

  events.push({ type: "markSorted", index: pivotIndex });

  quickSortHelper(arr, low, pivotIndex - 1, events);
  quickSortHelper(arr, pivotIndex + 1, high, events);
}

function partition(
  arr: number[],
  low: number,
  high: number,
  events: SortEvent[]
): number {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    events.push({ type: "compare", i: j, j: high });

    if (arr[j] < pivot) {
      i++;

      if (i !== j) {
        events.push({ type: "swap", i, j });
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }

  if (i + 1 !== high) {
    events.push({ type: "swap", i: i + 1, j: high });
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  }

  return i + 1;
}

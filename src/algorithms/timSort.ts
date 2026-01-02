import type { SortEvent } from "../types/SortEvent";

const MIN_RUN = 32;

export function timSort(input: number[]): SortEvent[] {
  const events: SortEvent[] = [];
  const arr = [...input];
  const n = arr.length;

  if (n <= 1) {
    if (n === 1) events.push({ type: "markSorted", index: 0 });
    return events;
  }

  // Sort individual runs using insertion sort
  for (let start = 0; start < n; start += MIN_RUN) {
    const end = Math.min(start + MIN_RUN - 1, n - 1);
    insertionSort(arr, start, end, events);
  }

  // Merge runs
  for (let size = MIN_RUN; size < n; size *= 2) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = Math.min(left + size - 1, n - 1);
      const right = Math.min(left + 2 * size - 1, n - 1);

      if (mid < right) {
        merge(arr, left, mid, right, events);
      }
    }
  }

  // Final sorted state
  for (let i = 0; i < n; i++) {
    events.push({ type: "markSorted", index: i });
  }

  return events;
}

function insertionSort(
  arr: number[],
  left: number,
  right: number,
  events: SortEvent[]
) {
  for (let i = left + 1; i <= right; i++) {
    let j = i;

    while (j > left) {
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

  // for (let i = left + 1; i <= right; i++) {
  //   const value = arr[i];
  //   let j = i - 1;

  //   events.push({ type: "active", index: i });

  //   while (j >= left) {
  //     events.push({ type: "compare", i: j, j: i });

  //     if (arr[j] <= value) break;

  //     events.push({ type: "overwrite", index: j + 1, value: arr[j] });
  //     arr[j + 1] = arr[j];
  //     j--;
  //   }

  //   events.push({ type: "overwrite", index: j + 1, value });
  //   arr[j + 1] = value;
  // }
}

function merge(
  arr: number[],
  left: number,
  mid: number,
  right: number,
  events: SortEvent[]
) {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);

  let i = 0;
  let j = 0;
  let k = left;

  while (i < leftArr.length && j < rightArr.length) {
    events.push({ type: "compare", i: left + i, j: mid + 1 + j });
    events.push({ type: "active", index: k });

    if (leftArr[i] <= rightArr[j]) {
      events.push({ type: "overwrite", index: k, value: leftArr[i] });
      arr[k++] = leftArr[i++];
    } else {
      events.push({ type: "overwrite", index: k, value: rightArr[j] });
      arr[k++] = rightArr[j++];
    }
  }

  while (i < leftArr.length) {
    events.push({ type: "active", index: k });
    events.push({ type: "overwrite", index: k, value: leftArr[i] });
    arr[k++] = leftArr[i++];
  }

  while (j < rightArr.length) {
    events.push({ type: "active", index: k });
    events.push({ type: "overwrite", index: k, value: rightArr[j] });
    arr[k++] = rightArr[j++];
  }
}

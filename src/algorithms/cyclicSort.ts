import type { SortEvent } from "../types/SortEvent";

export function cyclicSort(input: number[]): SortEvent[] {
  const events: SortEvent[] = [];
  const nums = [...input];
  const n = nums.length;

  if (n <= 1) {
    if (n === 1) {
      events.push({ type: "markSorted", index: 0 });
    }
    return events;
  }

  let i = 0;

  while (i < n) {
    const value = nums[i];
    const correctIndex = value - 1;

    if (value < 1 || value > n) {
      i++;
      continue;
    }

    events.push({ type: "compare", i, j: correctIndex });
    if (nums[i] !== nums[correctIndex]) {
      events.push({ type: "swap", i, j: correctIndex });
      [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
      events.push({ type: "markSorted", index: correctIndex });
    } else {
      events.push({ type: "markSorted", index: i });
      i++;
    }
  }

  //   for (let idx = 0; idx < n; idx++) {
  //     events.push({ type: "markSorted", index: idx });
  //   }

  return events;
}

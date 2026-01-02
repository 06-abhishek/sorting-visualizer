import type { AlgorithmInfo } from "../types/AlgorithmInfo";
import type { SortEvent } from "../types/SortEvent";

// Comparision-Based Algorithms
import { bubbleSort } from "./bubbleSort";
import { insertionSort } from "./insertionSort";
import { selectionSort } from "./selectionSort";
import { mergeSort } from "./mergeSort";
import { quickSort } from "./quickSort";
import { cyclicSort } from "./cyclicSort";
import { heapSort } from "./heapSort";

// Non-Comparision-Based Algorithms
import { countingSort } from "./countingSort";
import { radixSort } from "./radixSort";

// Hybrid Algorithms
import { timSort } from "./timSort";

export type Algorithm = {
  info: AlgorithmInfo;
  run: (arr: number[]) => SortEvent[];
};

export const algorithms: Algorithm[] = [
  /* ========================================================= Bubble Sort ========================================================= */
  {
    info: {
      id: "bubble",
      name: "Bubble Sort",
      description:
        "Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Larger elements gradually 'bubble' to the end.",
      complexity: {
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
        space: "O(1)",
      },
      implementations: {
        typescript: `
function bubbleSort(arr: number[]): number[] {
  let swapped = false;

  do {
    swapped = false;

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];

        swapped = true;
      }
    }
  } while (swapped);

  return arr;
}
        `,
      },
    },
    run: bubbleSort,
  },

  /* ========================================================= Insertion Sort ========================================================= */
  {
    info: {
      id: "insertion",
      name: "Insertion Sort",
      description:
        "Insertion Sort builds the sorted list one element at a time by placing each new element into its correct position. It works the same way we sort playing cards in our hands.",
      complexity: {
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
        space: "O(1)",
      },
      implementations: {
        typescript: `
function insertionSort(arr: number[]): number[] {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = current;
  }

  return arr;
}
        `,
      },
    },
    run: insertionSort,
  },

  /* ========================================================= Selection Sort ========================================================= */
  {
    info: {
      id: "selection",
      name: "Selection Sort",
      description:
        "Selection Sort repeatedly finds the smallest element from the unsorted part and places it at the beginning. The sorted portion grows one element at a time.",
      complexity: {
        best: "O(n²)",
        average: "O(n²)",
        worst: "O(n²)",
        space: "O(1)",
      },
      implementations: {
        typescript: `
function selectionSort(arr: number[]): number[] {
  for (let selected = 0; selected < arr.length - 1; selected++) {
    let min = selected;

    for (let i = selected + 1; i < arr.length; i++) {
      if (arr[i] < arr[min]) min = i;
    }

    if (arr[selected] > arr[min]) {
      [arr[selected], arr[min]] = [arr[min], arr[selected]];
    }
  }

  return arr;
}
        `,
      },
    },
    run: selectionSort,
  },

  /* ========================================================= Merge Sort ========================================================= */
  {
    info: {
      id: "merge",
      name: "Merge Sort",
      description:
        "Merge Sort divides the array into smaller parts, sorts them, and then merges them back together in order. It follows a divide-and-conquer approach for efficient sorting.",
      complexity: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",
        space: "O(n)",
      },
      implementations: {
        typescript: `
function merge(left: number[], right: number[]): number[] {
  const sorted: number[] = new Array();

  let i: number = 0,
    j: number = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) sorted.push(left[i++]);
    else sorted.push(right[j++]);
  }

  return [...sorted, ...left.slice(i), ...right.slice(j)];
}

function mergeSort(nums: number[]): number[] {
  if (nums.length <= 1) return nums;

  const mid: number = Math.floor(nums.length / 2);

  const left: number[] = mergeSort(nums.slice(0, mid));
  const right: number[] = mergeSort(nums.slice(mid));

  return merge(left, right);
}
        `,
      },
    },
    run: mergeSort,
  },

  /* ========================================================= Quick Sort ========================================================= */
  {
    info: {
      id: "quick",
      name: "Quick Sort",
      description:
        "Quick Sort selects a pivot element and rearranges the array so smaller elements go to one side and larger ones to the other. It then recursively sorts the subarrays.",
      complexity: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n²)",
        space: "O(log n)", //Recursion stack consumes space
      },
      implementations: {
        typescript: `
function partition(arr: number[], low: number, high: number): number {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

  return i + 1;
}

function quickSort(
  arr: number[],
  low: number = 0,
  high: number = arr.length - 1
) {
  if (low < high) {
    const pivotIndex: number = partition(arr, low, high);

    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }

  return arr;
}
        `,
      },
    },
    run: quickSort,
  },

  /* ========================================================= Cyclic Sort ========================================================= */
  {
    info: {
      id: "cyclic",
      name: "Cyclic Sort",
      description:
        "Cyclic Sort places each element directly into its correct position based on its value. It is especially useful when numbers are in a known and continuous range.",
      complexity: {
        best: "O(n)",
        average: "O(n)",
        worst: "O(n)",
        space: "O(1)",
      },
      implementations: {
        typescript: `
function cyclicSort(nums: number[], start: number): number[] {
  const n = nums.length;

  if (n <= 1) return nums;

  let i = 0;

  while (i < n) {
    const value = nums[i];
    const correctIndex = value - start;

    if (value < 1 || value > n) {
      i++;
      continue;
    }

    if (nums[i] !== nums[correctIndex]) {
      [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];
    } else {
      i++;
    }
  }

  return nums;
}
        `,
      },
    },
    run: cyclicSort,
  },

  /* ========================================================= Heap Sort ========================================================= */
  {
    info: {
      id: "heap",
      name: "Heap Sort",
      description:
        "Heap Sort converts the array into a heap structure and repeatedly removes the largest element. Each removal places the element in its correct sorted position.",
      complexity: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",
        space: "O(1)",
      },
      implementations: {
        typescript: `
function heapSort(nums: number[]): number[] {
  let n: number = nums.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(nums, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [nums[0], nums[i]] = [nums[i], nums[0]];

    heapify(nums, i, 0);
  }

  return nums;
}

function heapify(nums: number[], heapSize: number, rootIdx: number): void {
  let largest = rootIdx;
  const left = rootIdx * 2 + 1;
  const right = rootIdx * 2 + 2;

  if (left < heapSize && nums[left] > nums[largest]) {
    largest = left;
  }
  if (right < heapSize && nums[right] > nums[largest]) {
    largest = right;
  }

  if (nums[largest] !== nums[rootIdx]) {
    [nums[largest], nums[rootIdx]] = [nums[rootIdx], nums[largest]];

    heapify(nums, heapSize, largest);
  }
}
        `,
      },
    },
    run: heapSort,
  },

  /* ========================================================= Counting Sort ========================================================= */
  {
    info: {
      id: "counting",
      name: "Counting Sort",
      description:
        "Counting Sort counts how many times each value appears and uses this information to rebuild the sorted array. It works best when the range of values is small.",
      complexity: {
        best: "O(n + k)",
        average: "O(n + k)",
        worst: "O(n + k)",
        space: "O(k)",
      },
      implementations: {
        typescript: `
function countingSort(arr: number[]): number[] {
  const n = arr.length;

  if (n <= 1) return arr;

  let min = arr[0];
  let max = arr[0];

  for (let i = 1; i < n; i++) {
    if (arr[i] < min) min = arr[i];
    if (arr[i] > max) max = arr[i];
  }

  if (min < 0) return [-1, -1];

  const range = max - min + 1;
  const count = new Array(range).fill(0);

  for (let i = 0; i < n; i++) {
    count[arr[i] - min]++;
  }

  let index = 0;

  for (let value = 0; value < range; value++) {
    while (count[value] > 0) {
      arr[index] = value + min;
      index++;
      count[value]--;
    }
  }

  return arr;
}
        `,
      },
    },
    run: countingSort,
  },

  /* ========================================================= Radix Sort ========================================================= */
  {
    info: {
      id: "radix",
      name: "Radix Sort",
      description:
        "Radix Sort sorts numbers digit by digit, starting from the least significant digit. It uses a stable sub-sorting method to arrange numbers step by step.",
      complexity: {
        best: "O(d * n)",
        average: "O(d * n)",
        worst: "O(d * n)",
        space: "O(n + k)",
      },
      implementations: {
        typescript: `
function radixSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const max = Math.max(...arr);

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(arr, exp);
  }

  return arr;
}

function countingSortByDigit(arr: number[], exp: number) {
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
  }
}
        `,
      },
    },
    run: radixSort,
  },

  /* ========================================================= Tim Sort ========================================================= */
  {
    info: {
      id: "tim",
      name: "Tim Sort",
      description:
        "Tim Sort combines insertion sort and merge sort to take advantage of existing order in data. It is fast, stable, and used in real-world programming languages.",
      complexity: {
        best: "O(n)",
        average: "O(n log n)",
        worst: "O(n log n)",
        space: "O(n)", // Uses slicing during merge
      },
      implementations: {
        typescript: `
function countRun(arr: number[], start: number): number {
  let end = start + 1;

  // If only one element
  if (end === arr.length) return 1;

  // Determine direction
  const ascending = arr[start] <= arr[end];

  // Continue while order matches
  while (end < arr.length - 1) {
    if (ascending && arr[end] <= arr[end + 1]) {
      end++;
    } else if (!ascending && arr[end] > arr[end + 1]) {
      end++;
    } else {
      break;
    }
  }

  // If descending → reverse
  if (!ascending) {
    reverse(arr, start, end);
  }

  return end - start + 1;
}

function reverse(arr: number[], left: number, right: number) {
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
}

function insertionSort(arr: number[], left: number, right: number) {
  for (let i = left + 1; i <= right; i++) {
    const temp = arr[i];
    let j = i - 1;

    while (j >= left && arr[j] > temp) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = temp;
  }
}

function merge(arr: number[], l: number, m: number, r: number) {
  const left = arr.slice(l, m + 1);
  const right = arr.slice(m + 1, r + 1);

  let i = 0,
    j = 0,
    k = l;

  while (i < left.length && j < right.length) {
    arr[k++] = left[i] <= right[j] ? left[i++] : right[j++];
  }

  while (i < left.length) arr[k++] = left[i++];
  while (j < right.length) arr[k++] = right[j++];
}

function timSort(arr: number[]): number[] {
  const n = arr.length;
  const minRun = 32;

  // Step 1: Find runs and sort small ones
  for (let i = 0; i < n; ) {
    let runLen = countRun(arr, i);

    // Extend run to minRun
    if (runLen < minRun) {
      const end = Math.min(i + minRun - 1, n - 1);
      insertionSort(arr, i, end);
      runLen = end - i + 1;
    }

    i += runLen;
  }

  // Step 2: Merge runs
  for (let size = minRun; size < n; size *= 2) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = Math.min(left + size - 1, n - 1);
      const right = Math.min(left + 2 * size - 1, n - 1);

      if (mid < right) {
        merge(arr, left, mid, right);
      }
    }
  }

  return arr;
}
        `,
      },
    },
    run: timSort,
  },
];

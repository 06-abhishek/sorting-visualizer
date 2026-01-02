export type SortEvent =
  | { type: "compare"; i: number; j: number }
  | { type: "swap"; i: number; j: number }
  | { type: "overwrite"; index: number; value: number }
  | { type: "active"; index: number }
  | { type: "markSorted"; index: number };

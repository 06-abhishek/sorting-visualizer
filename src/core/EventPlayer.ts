import type { MutableRefObject } from "react";

import type { SortEvent } from "../types/SortEvent";
import { sleep } from "../utils/sleep";
import { sounds } from "../audio/soundEngine";

export async function playEvents(
  events: SortEvent[],
  array: number[],
  setArray: (a: number[]) => void,
  speed: number,
  cancelRef: MutableRefObject<boolean>,
  setComparing: (v: number[]) => void,
  setSwapping: (v: number[]) => void,
  setSorted: (v: Set<number>) => void,
  setActive: (v: number[]) => void,
  setOverwrite: (v: number[]) => void,
  soundEnabled: boolean
) {
  const a = [...array];
  const sortedSet = new Set<number>();

  for (const event of events) {
    if (cancelRef.current) break;

    setComparing([]);
    setSwapping([]);
    setActive([]);
    setOverwrite([]);

    switch (event.type) {
      case "compare":
        setComparing([event.i, event.j]);
        soundEnabled && sounds.compare();
        break;

      case "swap":
        setSwapping([event.i, event.j]);
        [a[event.i], a[event.j]] = [a[event.j], a[event.i]];
        setArray([...a]);
        soundEnabled && sounds.swap();
        break;

      case "overwrite":
        setOverwrite([event.index]);
        a[event.index] = event.value;
        setArray([...a]);
        soundEnabled && sounds.overwrite();
        break;

      case "active":
        setActive([event.index]);
        soundEnabled && sounds.active();
        break;

      case "markSorted":
        sortedSet.add(event.index);
        setSorted(new Set(sortedSet));
        soundEnabled && sounds.markSorted();
        break;
    }

    await sleep(speed);
  }

  // Final state
  setComparing([]);
  setSwapping([]);
  setActive([]);
  setOverwrite([]);

  cancelRef.current
    ? setSorted(new Set())
    : setSorted(new Set(Array.from({ length: a.length }, (_, i) => i)));
}

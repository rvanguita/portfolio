"use client";

import { useCallback, useState } from "react";

/** Padrão da skill: hook de estado booleano. */
export function useToggle(
  initialValue = false,
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue((v) => !v), []);
  const set = useCallback((next: boolean) => setValue(next), []);
  return [value, toggle, set];
}

"use client";

import { useMemo, useState } from "react";

export const ALL_CATEGORY = "all";

/**
 * Filtro por categoria client-side (projetos e certificados). Substitui o
 * `wireCategoryFilter` de assets/js/main.js: o estado é a categoria ativa, a
 * lista filtrada é derivada e memoizada (nada de toggle de `style`/classe).
 */
export function useCategoryFilter<T>(
  items: readonly T[],
  getCategory: (item: T) => string,
) {
  const [active, setActive] = useState<string>(ALL_CATEGORY);

  const filtered = useMemo(
    () =>
      active === ALL_CATEGORY
        ? [...items]
        : items.filter((item) => getCategory(item) === active),
    [items, active, getCategory],
  );

  return { active, setActive, filtered };
}

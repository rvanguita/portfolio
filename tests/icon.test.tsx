import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Icon, type IconName } from "@/components/ui/Icon";
import { NAV_ITEMS } from "@/lib/nav";
import { skills } from "@/lib/data/skills";
import { projects } from "@/lib/data/projects";
import { certificates } from "@/lib/data/certificates";

// O path de fallback do <Icon> (ponto de interrogação) — nenhum ícone real deve cair nele.
const FALLBACK_SNIPPET = "M12 9a.75.75 0 1 0 0-1.5";

const referenced: IconName[] = [
  ...NAV_ITEMS.map((n) => n.icon),
  ...skills.map((s) => s.icon),
  ...projects.map((p) => p.badgeIcon),
  ...certificates.map((c) => c.icon),
];

describe("Icon", () => {
  it.each([...new Set(referenced)])(
    "resolve um path real para o ícone %s",
    (name) => {
      const { container } = render(<Icon name={name} />);
      const svg = container.querySelector("svg");
      expect(svg).not.toBeNull();
      expect(svg?.innerHTML).not.toContain(FALLBACK_SNIPPET);
      expect(svg?.querySelector("path")).not.toBeNull();
    },
  );
});

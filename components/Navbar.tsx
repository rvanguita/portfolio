"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, type MouseEvent } from "react";
import { NAV_ITEMS } from "@/lib/nav";
import { Icon } from "@/components/ui/Icon";
import { useToggle } from "@/hooks/useToggle";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { homePath, isOnHome, scrollToId, scrollToTop } from "@/lib/scroll";
import { cx } from "@/lib/cx";

const NAV_IDS = NAV_ITEMS.map((item) => item.id);

export function Navbar() {
  const [menuOpen, toggleMenu, setMenuOpen] = useToggle(false);
  const activeId = useScrollSpy(NAV_IDS);
  const reducedMotion = usePrefersReducedMotion();
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), [setMenuOpen]);

  // Menu aberto: Esc fecha e devolve o foco ao hambúrguer; clique fora fecha.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      closeMenu();
      toggleRef.current?.focus();
    };
    const onClick = (event: globalThis.MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
    };
  }, [menuOpen, closeMenu]);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    closeMenu();
    if (!isOnHome()) return;
    if (!document.getElementById(id)) return;
    event.preventDefault();
    scrollToId(id, reducedMotion);
    history.pushState(null, "", `#${id}`);
  };

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    closeMenu();
    if (!isOnHome()) return;
    event.preventDefault();
    scrollToTop(reducedMotion);
    history.pushState(null, "", homePath());
  };

  return (
    <nav className="navbar" aria-label="Navegação principal" ref={navRef}>
      <div className="nav-container">
        <Link href="/" className="nav-logo" onClick={handleLogoClick}>
          Rene Anguita Jr.
        </Link>

        <ul className={cx("nav-menu", menuOpen && "open")} id="navMenu">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <Link
                href={`/#${item.id}`}
                className={cx("nav-link", activeId === item.id && "active")}
                onClick={(event) => handleNavClick(event, item.id)}
              >
                <Icon name={item.icon} className="nav-link-icon" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <a href="mailto:renevajr@gmail.com" className="btn-nav-contact">
            Contato
          </a>

          <button
            type="button"
            ref={toggleRef}
            className="nav-toggle"
            aria-label="Abrir menu de navegação"
            aria-expanded={menuOpen}
            aria-controls="navMenu"
            onClick={toggleMenu}
          >
            <span aria-hidden="true">☰</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

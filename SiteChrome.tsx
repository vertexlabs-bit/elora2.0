"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isVisibleContent, site } from "@/content/site";
import { HeaderBrand, BrandLockup } from "@/components/Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${scrolled ? " site-header--scrolled" : ""}${menuOpen ? " site-header--open" : ""}`}>
      <div className="site-header__inner">
        <Link href="/" className="site-header__brand" aria-label="ÉLORA — início" onClick={closeMenu}>
          <HeaderBrand />
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? site.common.close : site.common.openMenu}
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
        <nav id="primary-navigation" className="site-navigation" aria-label="Navegação principal">
          <ul>
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={closeMenu}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <Link className="button button--outline site-navigation__cta" href="/#lista-de-espera" onClick={closeMenu}>{site.common.waitlist}</Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <Link href="/" className="site-footer__lockup" aria-label="ÉLORA — início">
          <BrandLockup />
        </Link>
        <div className="site-footer__links">
          <span className="eyebrow">{site.footer.note}</span>
          {site.nav.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          <Link href="/privacidade">{site.footer.privacy}</Link>
        </div>
      </div>
      <div className="site-footer__bottom">
        <span>{site.footer.copyright}</span>
        {isVisibleContent(site.footer.social) && <span>{site.footer.social}</span>}
      </div>
    </footer>
  );
}

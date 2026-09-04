#!/usr/bin/env python3
"""Verificação do site estático — sem dependências.

- as 3 páginas existem, têm tags balanceadas, um <h1>, lang=pt-BR e <title>;
- todo href local (não http/mailto) aponta para um arquivo real;
- os alvos que o deploy copia existem.
Sai com código != 0 se algo falhar.
"""
from __future__ import annotations

import os
import re
import sys
import urllib.parse
from html.parser import HTMLParser

ROOT = "src"
PAGES = [
    f"{ROOT}/index.html",
    f"{ROOT}/projects/wind-farm/index.html",
    f"{ROOT}/projects/lake-fastf1/index.html",
]
DEPLOY_TARGETS = [
    f"{ROOT}/index.html", f"{ROOT}/style.css", f"{ROOT}/icon.png", f"{ROOT}/.nojekyll",
    f"{ROOT}/projects", f"{ROOT}/certificates", f"{ROOT}/assets",
]
VOID = {
    "meta", "link", "br", "hr", "img", "input", "area", "base",
    "col", "embed", "source", "track", "wbr",
}

errors: list[str] = []


class Balance(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.stack: list[str] = []
        self.stray: list[str] = []

    def handle_starttag(self, tag, attrs):
        if tag not in VOID:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        if tag in self.stack:
            while self.stack and self.stack.pop() != tag:
                pass
        else:
            self.stray.append(tag)


HREF_RE = re.compile(r'href="([^"]+)"')

for page in PAGES:
    if not os.path.isfile(page):
        errors.append(f"{page}: não existe")
        continue
    html = open(page, encoding="utf-8").read()

    b = Balance()
    b.feed(html)
    if b.stack or b.stray:
        errors.append(f"{page}: tags desbalanceadas (abertas={b.stack}, sobra={b.stray})")
    if html.count("<h1") != 1:
        errors.append(f"{page}: esperado exatamente um <h1>")
    if 'lang="pt-BR"' not in html:
        errors.append(f"{page}: falta lang=\"pt-BR\"")
    if "<title>" not in html:
        errors.append(f"{page}: falta <title>")

    page_dir = os.path.dirname(page)
    for href in HREF_RE.findall(html):
        if href.startswith(("http://", "https://", "mailto:", "#")):
            continue
        rel = urllib.parse.unquote(href.split("#", 1)[0])
        if not rel:
            continue
        target = os.path.normpath(os.path.join(page_dir, rel))
        if not os.path.exists(target):
            errors.append(f"{page}: link quebrado {href!r} -> {target}")

for t in DEPLOY_TARGETS:
    if not os.path.exists(t):
        errors.append(f"alvo de deploy ausente: {t}")

if errors:
    print("\n".join(errors))
    sys.exit(1)
print(f"ok — {len(PAGES)} páginas, links e alvos de deploy verificados")

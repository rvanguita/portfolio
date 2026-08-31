#!/usr/bin/env python3
"""
Test Suite: Validação e Integridade do Portfólio Estático
Garante que arquivos, layouts, links locais, certificados e folhas de estilo
não quebrem antes de cada deploy no GitHub Pages.
"""

import os
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

# Raiz do repositório
REPO_ROOT = Path(__file__).resolve().parent.parent


class LinkExtractor(HTMLParser):
    """Extrai links <a>, imagens <img> e folhas de estilo <link> do HTML."""

    def __init__(self):
        super().__init__()
        self.local_links = []
        self.element_ids = set()

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)

        # Coleta IDs para teste de âncoras (#sobre, etc.)
        if "id" in attr_dict:
            self.element_ids.add(attr_dict["id"])

        # Extrai links href
        if tag in ("a", "link") and "href" in attr_dict:
            href = attr_dict["href"].strip()
            self.local_links.append(href)

        # Extrai imagens src
        if tag == "img" and "src" in attr_dict:
            src = attr_dict["src"].strip()
            self.local_links.append(src)


def log_pass(msg):
    print(f"  \033[92m✔ PASS:\033[0m {msg}")


def log_fail(msg):
    print(f"  \033[91m✖ FAIL:\033[0m {msg}")


def test_config():
    """Testa a integridade do _config.yml."""
    print("\n🔍 1. Testando _config.yml...")
    config_file = REPO_ROOT / "_config.yml"
    assert config_file.exists(), "_config.yml não foi encontrado!"

    content = config_file.read_text(encoding="utf-8")
    assert "title:" in content, "Falta a chave 'title:' no _config.yml"
    assert "url:" in content, "Falta a chave 'url:' no _config.yml"
    assert "baseurl:" in content, "Falta a chave 'baseurl:' no _config.yml"

    # Garante que não haja tema legado em conflito
    assert "theme: jekyll-theme-cayman" not in content, (
        "O tema legado 'cayman' ainda está ativo!"
    )
    log_pass("_config.yml é válido e sem conflitos de tema.")


def test_layout():
    """Testa a integridade do _layouts/default.html."""
    print("\n🔍 2. Testando _layouts/default.html...")
    layout_file = REPO_ROOT / "_layouts" / "default.html"
    assert layout_file.exists(), "_layouts/default.html não foi encontrado!"

    content = layout_file.read_text(encoding="utf-8")
    assert "<!DOCTYPE html>" in content, "Declaração DOCTYPE ausente"
    assert "<html" in content and "</html>" in content, "Tags <html> não balanceadas"
    assert "{{ content }}" in content, "Variável Liquid {{ content }} ausente no layout"
    assert "portfolio_theme" in content, "Script de persistência do tema ausente"
    assert "custom.css" in content, "Inclusão do custom.css ausente"
    log_pass("_layouts/default.html íntegro e estruturado corretamente.")


def test_css_integrity():
    """Testa a sintaxe e variáveis do custom.css."""
    print("\n🔍 3. Testando assets/css/custom.css...")
    css_file = REPO_ROOT / "assets" / "css" / "custom.css"
    assert css_file.exists(), "assets/css/custom.css não foi encontrado!"

    content = css_file.read_text(encoding="utf-8")

    # Verifica balanceamento de chaves {}
    open_braces = content.count("{")
    close_braces = content.count("}")
    assert open_braces == close_braces, (
        f"Chaves desbalanceadas no CSS: {open_braces} abertas vs {close_braces} fechadas"
    )

    # Verifica variáveis principais
    assert ":root" in content, "Bloco :root ausente no CSS"
    assert '[data-theme="dark"]' in content, (
        "Bloco de modo escuro [data-theme='dark'] ausente no CSS"
    )
    assert "--bg-page" in content, "Variável --bg-page ausente"
    assert "--accent" in content, "Variável --accent ausente"

    log_pass(
        f"custom.css válido com {open_braces} blocos de estilo balanceados e modo escuro configurado."
    )


def test_index_html_and_local_assets():
    """Testa se todas as imagens, certificados e links locais em index.html existem no disco."""
    print(
        "\n🔍 4. Testando index.html e integridade dos arquivos locais referenciados..."
    )
    index_file = REPO_ROOT / "index.html"
    assert index_file.exists(), "index.html não foi encontrado!"

    content = index_file.read_text(encoding="utf-8")

    parser = LinkExtractor()
    parser.feed(content)

    # Valida âncoras essenciais
    required_anchors = ["sobre", "habilidades", "projetos", "formacao", "certificados"]
    for anchor in required_anchors:
        assert anchor in parser.element_ids, f"Âncora #{anchor} ausente em index.html!"
    log_pass(f"Todas as âncoras de navegação {required_anchors} estão presentes.")

    # Valida links locais e certificados
    checked_files = 0
    for link in parser.local_links:
        # Limpa Liquid tags se presentes ex: {{ '/certificates/...' | relative_url }}
        clean_link = re.sub(r"\{\{.*?['\"](.*?)['\"].*?\}\}", r"\1", link)
        clean_link = clean_link.split("?")[0]  # remove ?v=...

        # Verifica apenas caminhos locais
        if clean_link.startswith(("/certificates/", "/assets/")):
            rel_path = clean_link.lstrip("/")
            # Remove baseurl '/portfolio/' se presente
            if rel_path.startswith("portfolio/"):
                rel_path = rel_path[len("portfolio/") :]

            # Tratamento de espaços decodificados
            import urllib.parse

            decoded_path = urllib.parse.unquote(rel_path)
            target_path = REPO_ROOT / decoded_path

            assert target_path.exists(), (
                f"Arquivo referenciado não existe no disco: {target_path}"
            )
            checked_files += 1

    log_pass(
        f"Todos os {checked_files} arquivos locais (imagens, CSS e PDFs de certificados) foram validados com sucesso!"
    )


def test_readme_certificates():
    """Testa se todos os links de certificados em README.md apontam para PDFs existentes."""
    print("\n🔍 5. Testando integridade dos certificados no README.md...")
    readme_file = REPO_ROOT / "README.md"
    assert readme_file.exists(), "README.md não encontrado!"

    content = readme_file.read_text(encoding="utf-8")
    cert_links = re.findall(r"\((certificates/[^\)]+\.pdf)\)", content)

    import urllib.parse

    for link in cert_links:
        decoded_link = urllib.parse.unquote(link)
        target = REPO_ROOT / decoded_link
        assert target.exists(), (
            f"Certificado listado no README.md não existe: {decoded_link}"
        )

    log_pass(
        f"Todos os {len(cert_links)} links de certificados no README.md foram verificados e existem no disco."
    )


def main():
    print("=" * 65)
    print("🧪 EXECUTANDO SUITE DE TESTES DO PORTFÓLIO ESTÁTICO")
    print("=" * 65)

    tests = [
        test_config,
        test_layout,
        test_css_integrity,
        test_index_html_and_local_assets,
        test_readme_certificates,
    ]

    failed = 0
    for test in tests:
        try:
            test()
        except AssertionError as e:
            log_fail(str(e))
            failed += 1
        except Exception as e:
            log_fail(f"Erro inesperado: {e}")
            failed += 1

    print("\n" + "=" * 65)
    if failed == 0:
        print(
            "\033[92m🎉 SUCESSO: Todos os testes passaram! O site está seguro para deploy.\033[0m"
        )
        print("=" * 65)
        sys.exit(0)
    else:
        print(
            f"\033[91m💥 FALHA: {failed} teste(s) falharam! Corrija os erros antes do deploy.\033[0m"
        )
        print("=" * 65)
        sys.exit(1)


if __name__ == "__main__":
    main()

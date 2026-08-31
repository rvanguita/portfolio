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


VOID_ELEMENTS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr",
}


class TagBalanceChecker(HTMLParser):
    """Verifica se toda tag HTML aberta tem um fechamento correspondente, na ordem certa."""

    def __init__(self):
        super().__init__()
        self.stack = []
        self.errors = []

    def handle_starttag(self, tag, attrs):
        if tag not in VOID_ELEMENTS:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        if tag in VOID_ELEMENTS:
            return
        if not self.stack:
            self.errors.append(f"</{tag}> de fechamento sem abertura correspondente")
            return
        if self.stack[-1] == tag:
            self.stack.pop()
        elif tag in self.stack:
            while self.stack and self.stack[-1] != tag:
                self.errors.append(f"<{self.stack[-1]}> não foi fechada antes de </{tag}>")
                self.stack.pop()
            if self.stack:
                self.stack.pop()
        else:
            self.errors.append(f"</{tag}> não corresponde a nenhuma tag aberta")


class AttributeExtractor(HTMLParser):
    """Extrai o atributo `attr_name` de toda tag cuja classe contém `class_marker`."""

    def __init__(self, class_marker, attr_name):
        super().__init__()
        self.class_marker = class_marker
        self.attr_name = attr_name
        self.values = []

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        classes = attr_dict.get("class", "")
        if self.class_marker in classes.split() and self.attr_name in attr_dict:
            self.values.append(attr_dict[self.attr_name])


class IdCollector(HTMLParser):
    """Coleta todos os valores de atributo id (mantendo duplicatas) para checagem de unicidade."""

    def __init__(self):
        super().__init__()
        self.ids = []

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        if "id" in attr_dict:
            self.ids.append(attr_dict["id"])


class HashLinkExtractor(HTMLParser):
    """Extrai todos os href='#...' (links de âncora interna) de um documento."""

    def __init__(self):
        super().__init__()
        self.anchors = []

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        href = attr_dict.get("href", "")
        if href.startswith("#") and len(href) > 1:
            self.anchors.append(href[1:])


class ExternalLinkChecker(HTMLParser):
    """Verifica se todo <a target='_blank'> tem rel='noopener' (proteção contra tabnabbing)."""

    def __init__(self):
        super().__init__()
        self.violations = []

    def handle_starttag(self, tag, attrs):
        if tag != "a":
            return
        attr_dict = dict(attrs)
        if attr_dict.get("target") == "_blank":
            rel = attr_dict.get("rel", "")
            if "noopener" not in rel.split():
                self.violations.append(attr_dict.get("href", "(sem href)"))


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
    required_anchors = [
        "sobre",
        "habilidades",
        "projetos",
        "experiencia",
        "formacao",
        "certificados",
    ]
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


def test_readme_project_documentation():
    """Testa se o README documenta a plataforma e mantém seus links principais."""
    print("\n🔍 5. Testando documentação do projeto no README.md...")
    readme_file = REPO_ROOT / "README.md"
    assert readme_file.exists(), "README.md não encontrado!"

    content = readme_file.read_text(encoding="utf-8")
    required_sections = [
        "# FastF1 Data Platform",
        "## O que este projeto faz",
        "## Arquitetura",
        "## Principais funcionalidades",
        "## Tecnologias",
    ]
    for section in required_sections:
        assert section in content, f"Seção obrigatória ausente no README.md: {section}"

    assert "https://github.com/rvanguita/lake-fastf1" in content, (
        "Link do repositório FastF1 não encontrado no README.md"
    )
    assert "https://rvanguita.github.io/portfolio/projects/lake-fastf1.html" in content, (
        "Link do case study não encontrado no README.md"
    )
    assert "FastF1 API" in content and "MLflow" in content, (
        "README.md não descreve o fluxo principal da plataforma"
    )
    log_pass("README.md documenta a plataforma e seus links principais.")


def test_project_pages():
    """Testa se todas as páginas em projects/ existem, possuem layout e links válidos."""
    print("\n🔍 6. Testando páginas dedicadas de projetos em projects/...")
    projects_dir = REPO_ROOT / "projects"
    if projects_dir.exists():
        html_files = list(projects_dir.glob("*.html"))
        for pfile in html_files:
            content = pfile.read_text(encoding="utf-8")
            assert "layout: default" in content or "<html" in content, (
                f"Página de projeto {pfile.name} sem layout padrão"
            )
            assert "FastF1 Data Platform" in content or "Projeto" in content, (
                f"Página {pfile.name} sem conteúdo"
            )
        log_pass(
            f"Todas as {len(html_files)} páginas de projetos em projects/ foram validadas com sucesso."
        )
    else:
        log_pass("Nenhum diretório projects/ extra para validar.")


def test_html_tag_balance():
    """Garante que as tags HTML de cada página estão corretamente balanceadas."""
    print("\n🔍 7. Testando balanceamento de tags HTML...")
    files_to_check = [REPO_ROOT / "index.html", REPO_ROOT / "_layouts" / "default.html"]
    projects_dir = REPO_ROOT / "projects"
    if projects_dir.exists():
        files_to_check += sorted(projects_dir.glob("*.html"))

    for file_path in files_to_check:
        content = file_path.read_text(encoding="utf-8")
        checker = TagBalanceChecker()
        checker.feed(content)
        checker.close()
        rel_path = file_path.relative_to(REPO_ROOT)
        assert not checker.errors, f"{rel_path}: {checker.errors[0]}"
        assert not checker.stack, f"{rel_path}: tag(s) não fechada(s): {checker.stack}"

    log_pass(f"Tags HTML balanceadas em {len(files_to_check)} arquivo(s).")


def test_category_filters_consistency():
    """Garante que os data-category dos cards de projeto batem com os botões de filtro."""
    print("\n🔍 8. Testando consistência dos filtros de categoria de projetos...")
    content = (REPO_ROOT / "index.html").read_text(encoding="utf-8")

    filter_parser = AttributeExtractor("filter-btn", "data-category")
    filter_parser.feed(content)
    filter_categories = {c for c in filter_parser.values if c != "all"}

    card_parser = AttributeExtractor("project-card-item", "data-category")
    card_parser.feed(content)
    card_categories = set(card_parser.values)

    assert card_categories, "Nenhum project-card-item com data-category encontrado!"
    unknown = card_categories - filter_categories
    assert not unknown, f"Card(s) com data-category sem filtro correspondente: {unknown}"
    orphan_filters = filter_categories - card_categories
    assert not orphan_filters, f"Filtro(s) sem nenhum project-card-item correspondente: {orphan_filters}"

    log_pass(f"Todas as {len(card_categories)} categorias de projeto têm filtro e card correspondentes.")


def test_cert_filters_consistency():
    """Garante que os data-cert-category dos grupos batem com os filtros de certificados."""
    print("\n🔍 9. Testando consistência dos filtros de categoria de certificados...")
    content = (REPO_ROOT / "index.html").read_text(encoding="utf-8")

    filter_parser = AttributeExtractor("cert-filter-btn", "data-cert-category")
    filter_parser.feed(content)
    filter_categories = {c for c in filter_parser.values if c != "all"}

    group_parser = AttributeExtractor("cert-category-group", "data-cert-category")
    group_parser.feed(content)
    group_categories = set(group_parser.values)

    assert group_categories, "Nenhum cert-category-group com data-cert-category encontrado!"
    unknown = group_categories - filter_categories
    assert not unknown, f"Grupo(s) de certificado sem filtro correspondente: {unknown}"
    orphan_filters = filter_categories - group_categories
    assert not orphan_filters, f"Filtro(s) de certificado sem nenhum grupo correspondente: {orphan_filters}"

    log_pass(f"Todas as {len(group_categories)} categorias de certificado têm filtro e grupo correspondentes.")


def test_unique_ids():
    """Garante que não há id duplicado em index.html."""
    print("\n🔍 10. Testando unicidade de atributos id em index.html...")
    content = (REPO_ROOT / "index.html").read_text(encoding="utf-8")

    parser = IdCollector()
    parser.feed(content)

    seen = set()
    duplicates = set()
    for element_id in parser.ids:
        if element_id in seen:
            duplicates.add(element_id)
        seen.add(element_id)

    assert not duplicates, f"id(s) duplicado(s) em index.html: {duplicates}"
    log_pass(f"Todos os {len(seen)} ids em index.html são únicos.")


def test_nav_sections_consistency():
    """Garante que todo link do menu de navegação aponta para uma âncora existente em index.html."""
    print("\n🔍 11. Testando consistência entre menu de navegação e seções...")
    layout_file = REPO_ROOT / "_layouts" / "default.html"
    index_file = REPO_ROOT / "index.html"

    nav_parser = HashLinkExtractor()
    nav_parser.feed(layout_file.read_text(encoding="utf-8"))
    nav_anchors = set(nav_parser.anchors)
    assert nav_anchors, "Nenhum link de âncora (#...) encontrado no menu de navegação!"

    index_parser = LinkExtractor()
    index_parser.feed(index_file.read_text(encoding="utf-8"))

    missing = nav_anchors - index_parser.element_ids
    assert not missing, (
        f"Link(s) do menu de navegação sem seção/id correspondente em index.html: {missing}"
    )
    log_pass(f"Todos os {len(nav_anchors)} links do menu de navegação apontam para âncoras existentes.")


def test_external_links_security_attrs():
    """Garante que todo link externo (target='_blank') usa rel='noopener'."""
    print("\n🔍 12. Testando atributos de segurança em links externos...")
    content = (REPO_ROOT / "index.html").read_text(encoding="utf-8")

    checker = ExternalLinkChecker()
    checker.feed(content)

    assert not checker.violations, f"Link(s) target='_blank' sem rel='noopener': {checker.violations}"
    log_pass("Todos os links externos usam rel=\"noopener\" corretamente.")


def main():
    print("=" * 65)
    print("🧪 EXECUTANDO SUITE DE TESTES DO PORTFÓLIO ESTÁTICO")
    print("=" * 65)

    tests = [
        test_config,
        test_layout,
        test_css_integrity,
        test_index_html_and_local_assets,
        test_readme_project_documentation,
        test_project_pages,
        test_html_tag_balance,
        test_category_filters_consistency,
        test_cert_filters_consistency,
        test_unique_ids,
        test_nav_sections_consistency,
        test_external_links_security_attrs,
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

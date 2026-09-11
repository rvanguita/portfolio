#!/usr/bin/env python3
"""Generate the recruiter-facing PDF dossier from the curated JSON manifest."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen.canvas import Canvas
from reportlab.platypus import Paragraph

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "scripts" / "dossier-content.json"
OUTPUT = ROOT / "public" / "assets" / "dossie-rene-anguita.pdf"
PAGE_W, PAGE_H = A4
MARGIN = 17 * mm
CONTENT_W = PAGE_W - (2 * MARGIN)

NAVY = colors.HexColor("#14263D")
BLUE = colors.HexColor("#1F4DCD")
BLUE_DARK = colors.HexColor("#153BA6")
PAPER = colors.HexColor("#F5F7FB")
WHITE = colors.white
MUTED = colors.HexColor("#526277")
RULE = colors.HexColor("#D5DFEC")
GREEN = colors.HexColor("#286443")
COPPER = colors.HexColor("#A46A38")
PALE_BLUE = colors.HexColor("#EAF0FF")
PALE_GREEN = colors.HexColor("#EAF5EF")
PALE_COPPER = colors.HexColor("#FAF0E8")


def load_content() -> dict[str, Any]:
    return json.loads(CONTENT.read_text(encoding="utf-8"))


def make_styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()["Normal"]
    return {
        "body": ParagraphStyle("body", parent=base, fontName="Helvetica", fontSize=9.3, leading=12.2, textColor=NAVY, spaceAfter=0),
        "body_muted": ParagraphStyle("body_muted", parent=base, fontName="Helvetica", fontSize=8.5, leading=11, textColor=MUTED, spaceAfter=0),
        "small": ParagraphStyle("small", parent=base, fontName="Helvetica", fontSize=7.6, leading=9.7, textColor=MUTED, spaceAfter=0),
        "small_white": ParagraphStyle("small_white", parent=base, fontName="Helvetica", fontSize=7.7, leading=10, textColor=WHITE, spaceAfter=0),
        "label": ParagraphStyle("label", parent=base, fontName="Helvetica-Bold", fontSize=7.1, leading=9, textColor=BLUE, spaceAfter=0),
        "label_white": ParagraphStyle("label_white", parent=base, fontName="Helvetica-Bold", fontSize=7.1, leading=9, textColor=colors.HexColor("#CFE0FF"), spaceAfter=0),
        "title": ParagraphStyle("title", parent=base, fontName="Helvetica-Bold", fontSize=24, leading=27, textColor=NAVY, spaceAfter=0),
        "section": ParagraphStyle("section", parent=base, fontName="Helvetica-Bold", fontSize=15, leading=18, textColor=NAVY, spaceAfter=0),
        "card_title": ParagraphStyle("card_title", parent=base, fontName="Helvetica-Bold", fontSize=12.4, leading=15, textColor=NAVY, spaceAfter=0),
        "card_body": ParagraphStyle("card_body", parent=base, fontName="Helvetica", fontSize=8.6, leading=11, textColor=NAVY, spaceAfter=0),
        "card_note": ParagraphStyle("card_note", parent=base, fontName="Helvetica", fontSize=7.6, leading=9.4, textColor=MUTED, spaceAfter=0),
        "metric": ParagraphStyle("metric", parent=base, fontName="Helvetica-Bold", fontSize=13.5, leading=15, textColor=NAVY, spaceAfter=0),
        "timeline_title": ParagraphStyle("timeline_title", parent=base, fontName="Helvetica-Bold", fontSize=9.3, leading=11.3, textColor=NAVY, spaceAfter=0),
    }


def para(canvas: Canvas, text: str, style: ParagraphStyle, x: float, top: float, width: float) -> float:
    paragraph = Paragraph(text, style)
    _, height = paragraph.wrap(width, PAGE_H)
    paragraph.drawOn(canvas, x, top - height)
    return top - height


def link_text(text: str, url: str) -> str:
    safe = text.replace("&", "&amp;")
    return f'<link href="{url}" color="#1F4DCD"><u>{safe}</u></link>'


def footer(canvas: Canvas, page_number: int, content: dict[str, Any], styles: dict[str, ParagraphStyle]) -> None:
    y = 12 * mm
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.6)
    canvas.line(MARGIN, y + 5 * mm, PAGE_W - MARGIN, y + 5 * mm)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(MARGIN, y, "Rene Anguita - Dossiê profissional")
    canvas.drawRightString(PAGE_W - MARGIN, y, f"{page_number} / 3")


def header(canvas: Canvas, content: dict[str, Any], styles: dict[str, ParagraphStyle]) -> float:
    profile = content["profile"]
    height = 34 * mm
    y = PAGE_H - MARGIN
    canvas.setFillColor(NAVY)
    canvas.roundRect(MARGIN, y - height, CONTENT_W, height, 5 * mm, fill=1, stroke=0)
    canvas.setFillColor(BLUE)
    canvas.roundRect(MARGIN, y - height, 5 * mm, height, 3 * mm, fill=1, stroke=0)
    para(canvas, profile["name"], ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=22, leading=24, textColor=WHITE), MARGIN + 11 * mm, y - 8 * mm, CONTENT_W - 18 * mm)
    para(canvas, f'{profile["role"]}  |  {profile["credential"]}', styles["small_white"], MARGIN + 11 * mm, y - 19 * mm, CONTENT_W - 18 * mm)
    para(canvas, f'{profile["location"]}  |  {profile["availability"]}', styles["small_white"], MARGIN + 11 * mm, y - 27 * mm, CONTENT_W - 18 * mm)
    return y - height - 10 * mm


def draw_pipeline(canvas: Canvas, x: float, top: float, width: float, styles: dict[str, ParagraphStyle]) -> float:
    height = 50 * mm
    canvas.setFillColor(WHITE)
    canvas.setStrokeColor(RULE)
    canvas.roundRect(x, top - height, width, height, 3 * mm, fill=1, stroke=1)
    para(canvas, "Arquitetura em prática", styles["label"], x + 5 * mm, top - 6 * mm, width - 10 * mm)
    para(canvas, "FastF1: ingestão, lakehouse e consumo analítico", styles["body_muted"], x + 5 * mm, top - 12 * mm, width - 10 * mm)
    nodes = [("Ingestão", "FastF1", BLUE), ("Raw", "Parquet", colors.HexColor("#7A899E")), ("Bronze", "Delta Lake", COPPER), ("Silver", "PySpark", colors.HexColor("#527CAC"))]
    node_y = top - 23 * mm
    gap = 3 * mm
    node_w = (width - 10 * mm - 3 * gap) / 4
    for i, (name, tech, accent) in enumerate(nodes):
        node_x = x + 5 * mm + i * (node_w + gap)
        canvas.setFillColor(PAPER)
        canvas.setStrokeColor(RULE)
        canvas.roundRect(node_x, node_y - 12 * mm, node_w, 12 * mm, 1.5 * mm, fill=1, stroke=1)
        canvas.setFillColor(accent)
        canvas.rect(node_x, node_y - 12 * mm, 1.2 * mm, 12 * mm, fill=1, stroke=0)
        para(canvas, f"<b>{name}</b><br/><font size=7 color='#526277'>{tech}</font>", styles["small"], node_x + 3 * mm, node_y - 2.5 * mm, node_w - 5 * mm)
        if i < len(nodes) - 1:
            canvas.setStrokeColor(MUTED)
            canvas.setLineWidth(0.7)
            ax = node_x + node_w + 0.8 * mm
            canvas.line(ax, node_y - 6 * mm, ax + gap - 1.6 * mm, node_y - 6 * mm)
            canvas.line(ax + gap - 2.5 * mm, node_y - 7.2 * mm, ax + gap - 1.6 * mm, node_y - 6 * mm)
            canvas.line(ax + gap - 2.5 * mm, node_y - 4.8 * mm, ax + gap - 1.6 * mm, node_y - 6 * mm)
    output_y = top - height + 10 * mm
    para(canvas, "Orquestração semanal: Apache Airflow  |  Consumo: FastAPI + Streamlit", styles["small"], x + 5 * mm, output_y, width - 10 * mm)
    return top - height


def draw_page_one(canvas: Canvas, content: dict[str, Any], styles: dict[str, ParagraphStyle]) -> None:
    profile = content["profile"]
    top = header(canvas, content, styles)
    left_w = 0.56 * CONTENT_W
    right_x = MARGIN + left_w + 9 * mm
    right_w = CONTENT_W - left_w - 9 * mm
    y = top
    y = para(canvas, "Engenharia de Dados aplicada", styles["label"], MARGIN, y, left_w)
    y -= 3 * mm
    y = para(canvas, profile["lead"], styles["title"], MARGIN, y, left_w)
    y -= 5 * mm
    y = para(canvas, "Transformo dados de diferentes fontes em processos reproduzíveis, camadas confiáveis e interfaces para análise. Minha formação em Engenharia Elétrica sustenta uma abordagem quantitativa para modelar problemas e avaliar soluções.", styles["body"], MARGIN, y, left_w)
    y -= 5 * mm
    para(canvas, "  ".join(profile["highlights"]), ParagraphStyle("highlights", parent=styles["body_muted"], fontName="Courier", textColor=BLUE), MARGIN, y, left_w)

    card_top = top
    card_h = 65 * mm
    canvas.setFillColor(WHITE)
    canvas.setStrokeColor(RULE)
    canvas.roundRect(right_x, card_top - card_h, right_w, card_h, 3 * mm, fill=1, stroke=1)
    para(canvas, "O que entrego", styles["label"], right_x + 6 * mm, card_top - 7 * mm, right_w - 12 * mm)
    items = [
        ("Pipelines e lakehouses", "Raw, Bronze e Silver com contratos, curadoria e rastreabilidade."),
        ("Orquestração e serving", "Fluxos agendados, APIs e painéis para colocar dados em uso."),
        ("Análise e ML", "Modelos avaliados com validação adequada e explicação dos fatores."),
    ]
    item_y = card_top - 16 * mm
    for title, detail in items:
        canvas.setFillColor(BLUE)
        canvas.circle(right_x + 7 * mm, item_y - 1.2 * mm, 1.1 * mm, fill=1, stroke=0)
        item_y = para(canvas, f"<b>{title}</b><br/><font color='#526277'>{detail}</font>", styles["small"], right_x + 11 * mm, item_y + 2 * mm, right_w - 17 * mm) - 5 * mm

    pipeline_top = min(y, card_top - card_h) - 12 * mm
    draw_pipeline(canvas, MARGIN, pipeline_top, CONTENT_W, styles)
    contact_y = pipeline_top - 53 * mm
    canvas.setFillColor(PALE_BLUE)
    canvas.roundRect(MARGIN, contact_y - 18 * mm, CONTENT_W, 18 * mm, 2.5 * mm, fill=1, stroke=0)
    contact = f'{link_text(profile["email"], "mailto:" + profile["email"])}  |  {link_text("GitHub", profile["github"])}  |  {link_text("LinkedIn", profile["linkedin"])}'
    para(canvas, contact, styles["body"], MARGIN + 6 * mm, contact_y - 6 * mm, CONTENT_W - 12 * mm)
    para(canvas, "O código e os estudos de caso estão disponíveis no portfólio.", styles["small"], MARGIN + 6 * mm, contact_y - 13 * mm, CONTENT_W - 12 * mm)
    footer(canvas, 1, content, styles)


def draw_project_card(canvas: Canvas, project: dict[str, Any], x: float, top: float, width: float, height: float, styles: dict[str, ParagraphStyle]) -> None:
    canvas.setFillColor(WHITE)
    canvas.setStrokeColor(RULE)
    canvas.roundRect(x, top - height, width, height, 3 * mm, fill=1, stroke=1)
    canvas.setFillColor(BLUE)
    canvas.rect(x, top - height, 1.5 * mm, height, fill=1, stroke=0)
    inner_x = x + 6 * mm
    inner_w = width - 12 * mm
    y = top - 7 * mm
    y = para(canvas, project["category"].upper(), styles["label"], inner_x, y, inner_w)
    y -= 1.8 * mm
    y = para(canvas, project["title"], styles["card_title"], inner_x, y, inner_w)
    y -= 2.5 * mm
    y = para(canvas, project["summary"], styles["card_body"], inner_x, y, inner_w)
    y -= 3 * mm
    metric_color = GREEN if project["evidence_label"] == "Resultado em teste" else BLUE
    canvas.setFillColor(PALE_GREEN if metric_color == GREEN else PALE_BLUE)
    canvas.roundRect(inner_x, y - 15 * mm, inner_w, 15 * mm, 1.8 * mm, fill=1, stroke=0)
    para(canvas, project["evidence_label"], ParagraphStyle("metric_label", parent=styles["label"], textColor=metric_color), inner_x + 4 * mm, y - 4 * mm, inner_w - 8 * mm)
    para(canvas, project["evidence"], styles["metric"], inner_x + 4 * mm, y - 9 * mm, inner_w - 8 * mm)
    y -= 19 * mm
    y = para(canvas, project["note"], styles["card_note"], inner_x, y, inner_w)
    y -= 2 * mm
    para(canvas, project["stack"], ParagraphStyle("stack", parent=styles["small"], fontName="Courier", textColor=MUTED), inner_x, y, inner_w)
    para(canvas, link_text("Ver projeto no GitHub", project["url"]) , styles["small"], inner_x, top - height + 5 * mm, inner_w)


def draw_page_two(canvas: Canvas, content: dict[str, Any], styles: dict[str, ParagraphStyle]) -> None:
    y = PAGE_H - MARGIN
    y = para(canvas, "Projetos que demonstram a prática", styles["section"], MARGIN, y, CONTENT_W)
    y = para(canvas, "Uma seleção de problemas, decisões técnicas e resultados que mostram como trabalho com dados no ciclo completo.", styles["body_muted"], MARGIN, y - 5 * mm, CONTENT_W)
    y -= 9 * mm
    card_h = 58 * mm
    for project in content["projects"]:
        draw_project_card(canvas, project, MARGIN, y, CONTENT_W, card_h, styles)
        y -= card_h + 5 * mm
    y -= 2 * mm
    canvas.setFillColor(PALE_COPPER)
    canvas.roundRect(MARGIN, y - 22 * mm, CONTENT_W, 22 * mm, 2.5 * mm, fill=1, stroke=0)
    para(canvas, "Outras evidências", ParagraphStyle("evidence_label", parent=styles["label"], textColor=COPPER), MARGIN + 6 * mm, y - 6 * mm, CONTENT_W - 12 * mm)
    para(canvas, "  |  ".join(content["additional_evidence"]), styles["small"], MARGIN + 6 * mm, y - 12 * mm, CONTENT_W - 12 * mm)
    footer(canvas, 2, content, styles)


def draw_page_three(canvas: Canvas, content: dict[str, Any], styles: dict[str, ParagraphStyle]) -> None:
    y = PAGE_H - MARGIN
    y = para(canvas, "Trajetória e competências", styles["section"], MARGIN, y, CONTENT_W)
    y = para(canvas, "Formação em Engenharia Elétrica e pesquisa aplicada como base para modelar problemas, avaliar soluções e construir processos reproduzíveis.", styles["body_muted"], MARGIN, y - 5 * mm, CONTENT_W)
    y -= 10 * mm
    left_w = 0.53 * CONTENT_W
    right_x = MARGIN + left_w + 10 * mm
    right_w = CONTENT_W - left_w - 10 * mm
    para(canvas, "FORMAÇÃO", styles["label"], MARGIN, y, left_w)
    ty = y - 8 * mm
    for years, title, detail in content["trajectory"]:
        canvas.setStrokeColor(BLUE)
        canvas.setLineWidth(1.2)
        canvas.circle(MARGIN + 1.5 * mm, ty - 1.5 * mm, 1.5 * mm, fill=0, stroke=1)
        ty = para(canvas, years, ParagraphStyle("years", parent=styles["label"], fontName="Courier", textColor=BLUE), MARGIN + 7 * mm, ty, left_w - 7 * mm)
        ty = para(canvas, title, styles["timeline_title"], MARGIN + 7 * mm, ty - 1.5 * mm, left_w - 7 * mm)
        ty = para(canvas, detail, styles["small"], MARGIN + 7 * mm, ty - 1.5 * mm, left_w - 7 * mm) - 8 * mm
    para(canvas, "COMPETÊNCIAS ESSENCIAIS", styles["label"], right_x, y, right_w)
    sy = y - 8 * mm
    for title, tools in content["skills"]:
        sy = para(canvas, title, styles["timeline_title"], right_x, sy, right_w)
        sy = para(canvas, tools, styles["small"], right_x, sy - 1.5 * mm, right_w) - 5 * mm
    lower = min(ty, sy) - 8 * mm
    canvas.setFillColor(PALE_BLUE)
    canvas.roundRect(MARGIN, lower - 33 * mm, CONTENT_W, 33 * mm, 2.5 * mm, fill=1, stroke=0)
    para(canvas, "EVIDÊNCIAS COMPLEMENTARES", styles["label"], MARGIN + 6 * mm, lower - 7 * mm, CONTENT_W - 12 * mm)
    para(canvas, content["credentials"], styles["body"], MARGIN + 6 * mm, lower - 14 * mm, CONTENT_W - 12 * mm)
    para(canvas, "Portfólio completo: " + link_text("rvanguita.github.io/portfolio", content["meta"]["site"]), styles["small"], MARGIN + 6 * mm, lower - 25 * mm, CONTENT_W - 12 * mm)
    footer(canvas, 3, content, styles)


def generate() -> None:
    content = load_content()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    styles = make_styles()
    canvas = Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
    canvas.setTitle(content["meta"]["title"])
    canvas.setAuthor(content["meta"]["author"])
    canvas.setSubject(content["meta"]["subject"])
    canvas.setCreator("scripts/generate_dossier.py")
    canvas.setKeywords("Engenharia de Dados, Python, SQL, PySpark, lakehouse")
    canvas.setFillColor(PAPER)
    for page in range(1, 4):
        canvas.setFillColor(PAPER)
        canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
        if page == 1:
            draw_page_one(canvas, content, styles)
        elif page == 2:
            draw_page_two(canvas, content, styles)
        else:
            draw_page_three(canvas, content, styles)
        canvas.showPage()
    canvas.save()
    print(f"Generated {OUTPUT}")


if __name__ == "__main__":
    argparse.ArgumentParser(description=__doc__).parse_args()
    generate()

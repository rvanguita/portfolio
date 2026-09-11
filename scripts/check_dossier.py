#!/usr/bin/env python3
"""Structural checks for the committed recruiter dossier."""

from pathlib import Path
import re

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
PDF = ROOT / "public" / "assets" / "dossie-rene-anguita.pdf"

reader = PdfReader(str(PDF))
assert len(reader.pages) == 3, f"expected 3 pages, got {len(reader.pages)}"
for index, page in enumerate(reader.pages, 1):
    width = float(page.mediabox.width)
    height = float(page.mediabox.height)
    assert abs(width - 595.276) < 1, f"page {index} is not A4 wide"
    assert abs(height - 841.89) < 1, f"page {index} is not A4 tall"

text = "\n".join(page.extract_text() or "" for page in reader.pages)
for required in ["Engenheiro de Dados", "FastF1 Data Platform", "Rota do Perfume", "Bank Customer Churn Prediction", "ROC AUC 0,936", "24 certificados"]:
    assert required in text, f"missing required text: {required}"
for forbidden in ["Cientista de Dados", "camadas do lakehouse", "[06]", "[04]", "[24]"]:
    assert forbidden not in text, f"stale text remains: {forbidden}"

annotations = [annotation for page in reader.pages for annotation in (page.get("/Annots") or [])]
links = [annotation.get_object().get("/A") for annotation in annotations if annotation.get_object().get("/A")]
assert len(links) >= 7, f"expected clickable links, got {len(links)}"
assert all(link.get("/S") == "/URI" for link in links), "unexpected non-URI annotation"
uris = {str(link.get("/URI")) for link in links}
assert "https://github.com/rvanguita/lake-fastf1" in uris, "FastF1 project URL missing from annotations"
assert "https://rvanguita.github.io/portfolio/" in uris, "portfolio URL missing from annotations"
print(f"Validated {PDF}: 3 A4 pages, {len(links)} clickable links")

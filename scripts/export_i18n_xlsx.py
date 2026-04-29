from pathlib import Path
import re

from openpyxl import Workbook
from openpyxl.styles import Alignment, Font


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    html = root / "index.html"
    out = root / "translations.xlsx"

    text = html.read_text(encoding="utf-8")
    match = re.search(r"const I18N_TABLE = `([\s\S]*?)`;", text)
    if not match:
        raise RuntimeError("I18N_TABLE not found in index.html")

    rows = [row.split("\t") for row in match.group(1).strip().splitlines() if row.strip()]

    wb = Workbook()
    ws = wb.active
    ws.title = "translations"

    for row in rows:
        ws.append(row)

    ws.freeze_panes = "A2"
    for col in range(1, 4):
        ws.cell(1, col).font = Font(bold=True)

    ws.column_dimensions["A"].width = 30
    ws.column_dimensions["B"].width = 72
    ws.column_dimensions["C"].width = 72

    for row in range(1, ws.max_row + 1):
        for col in range(1, 4):
            ws.cell(row, col).alignment = Alignment(vertical="top", wrap_text=True)

    wb.save(out)
    print(f"Created {out} with {ws.max_row - 1} translation rows.")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
建置最終的單檔 HTML

將 template.html, styles.css, app.js 和 game_data.json 合併成單一 HTML 檔案
"""

import json
from pathlib import Path


def build_html():
    """建置最終 HTML 檔案"""
    print("開始建置 HTML...")

    # 讀取所有資源
    template_path = Path('src/template.html')
    css_path = Path('src/styles.css')
    js_path = Path('src/app.js')
    data_path = Path('data/game_data.json')

    # 檢查檔案存在
    for path in [template_path, css_path, js_path, data_path]:
        if not path.exists():
            print(f"❌ 找不到檔案: {path}")
            return

    # 讀取內容
    with open(template_path, 'r', encoding='utf-8') as f:
        html_template = f.read()

    with open(css_path, 'r', encoding='utf-8') as f:
        css_content = f.read()

    with open(js_path, 'r', encoding='utf-8') as f:
        js_content = f.read()

    with open(data_path, 'r', encoding='utf-8') as f:
        game_data = json.load(f)

    print(f"✓ 已載入所有資源")

    # 壓縮 JSON 資料（單行）
    game_data_json = json.dumps(game_data, ensure_ascii=False, separators=(',', ':'))

    # 準備完整的 JavaScript（包含資料）
    full_js = f"const gameData={game_data_json};\n\n{js_content}"

    # 替換佔位符
    final_html = html_template.replace('{{STYLE_PLACEHOLDER}}', f'<style>\n{css_content}\n</style>')
    final_html = final_html.replace('{{SCRIPT_PLACEHOLDER}}', f'<script>\n{full_js}\n</script>')

    # 輸出最終檔案
    output_path = Path('dist/牧場物語物品查詢工具.html')
    output_path.parent.mkdir(exist_ok=True)

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(final_html)

    # 顯示統計資訊
    file_size = output_path.stat().st_size
    print(f"\n✓ 建置完成！")
    print(f"  輸出檔案: {output_path}")
    print(f"  檔案大小: {file_size:,} bytes ({file_size / 1024:.1f} KB)")
    print(f"  資料項目: {len(game_data.get('crops', []))} 農作物 + {len(game_data.get('processed', []))} 加工品 + {len(game_data.get('cooking', []))} 料理")


if __name__ == '__main__':
    build_html()

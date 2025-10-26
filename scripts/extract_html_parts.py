#!/usr/bin/env python3
"""
從原始 HTML 檔案中提取各個部分並保存到對應檔案
"""
import re
import json

def extract_parts(html_file):
    """提取 HTML, CSS, JS 和資料"""
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 提取 gameData JSON
    game_data_match = re.search(r'const gameData=({.*?});', content, re.DOTALL)
    if game_data_match:
        game_data_str = game_data_match.group(1)
        # 將資料保存為格式化的 JSON
        game_data = json.loads(game_data_str)
        with open('data/game_data.json', 'w', encoding='utf-8') as f:
            json.dump(game_data, f, ensure_ascii=False, indent=2)
        print(f"✓ 已提取遊戲資料到 data/game_data.json")
        print(f"  - 農作物: {len(game_data['crops'])} 項")
        print(f"  - 加工品: {len(game_data['processed'])} 項")
        print(f"  - 料理: {len(game_data['cooking'])} 項")

    # 提取 JavaScript 程式碼 (不含 gameData)
    script_match = re.search(r'<script>(.*?)</script>', content, re.DOTALL)
    if script_match:
        script_content = script_match.group(1)
        # 移除 gameData 宣告
        js_code = re.sub(r'const gameData=\{.*?\};', '// gameData 將由建置腳本注入', script_content, flags=re.DOTALL)
        with open('src/app.js', 'w', encoding='utf-8') as f:
            f.write(js_code.strip())
        print(f"✓ 已提取 JavaScript 到 src/app.js")

    # 提取 HTML 結構 (移除 style 和 script)
    # 先移除 script
    html_no_script = re.sub(r'<script>.*?</script>', '{{SCRIPT_PLACEHOLDER}}', content, flags=re.DOTALL)
    # 再移除 style
    html_no_style = re.sub(r'<style>.*?</style>', '{{STYLE_PLACEHOLDER}}', html_no_script, flags=re.DOTALL)

    with open('src/template.html', 'w', encoding='utf-8') as f:
        f.write(html_no_style)
    print(f"✓ 已提取 HTML 模板到 src/template.html")

    print("\n提取完成！")

if __name__ == '__main__':
    extract_parts('牧場物語物品查詢工具.html')

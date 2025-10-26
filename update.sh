#!/bin/bash
# 一鍵更新腳本：從 Excel 到最終 HTML

set -e  # 遇到錯誤立即退出

echo "======================================"
echo " 牧場物語物品查詢工具 - 更新腳本"
echo "======================================"
echo

# 檢查虛擬環境
if [ ! -d "venv" ]; then
    echo "❌ 找不到虛擬環境，請先執行："
    echo "   python3 -m venv venv"
    echo "   source venv/bin/activate"
    echo "   pip install -r requirements.txt"
    exit 1
fi

# 啟用虛擬環境
echo "🔧 啟用虛擬環境..."
source venv/bin/activate

# 步驟 1：Excel → JSON
echo
echo "📊 步驟 1/2: 從 Excel 生成 JSON..."
echo "-----------------------------------"
python scripts/excel_to_json.py

# 步驟 2：建置 HTML
echo
echo "🏗️  步驟 2/2: 建置最終 HTML..."
echo "-----------------------------------"
python scripts/build.py

# 完成
echo
echo "======================================"
echo "✅ 更新完成！"
echo "======================================"
echo
echo "📄 輸出檔案: dist/牧場物語物品查詢工具.html"
echo "💡 提示: 直接開啟該檔案即可使用"
echo

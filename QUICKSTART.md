# 快速開始指南

## 🚀 立即使用

```bash
# 直接開啟工具
open dist/牧場物語物品查詢工具.html
```

## 📝 更新資料

```bash
# 1. 編輯 Excel
open data/道具資料表.xlsx

# 2. 一鍵更新
./update.sh

# 3. 查看結果
open dist/牧場物語物品查詢工具.html
```

## 🎨 修改樣式

```bash
# 1. 編輯 CSS
code src/styles.css      # 或用任何編輯器

# 2. 重新建置
source venv/bin/activate
python scripts/build.py

# 3. 查看結果
open dist/牧場物語物品查詢工具.html
```

## 📂 專案結構一覽

```
Story of Seasons/
├── data/道具資料表.xlsx        👈 編輯這個
├── src/styles.css             👈 或這個
├── src/app.js                 👈 或這個
├── update.sh                  👈 執行這個
└── dist/牧場物語物品查詢工具.html 👈 使用這個
```

## ⚡ 常用指令

```bash
# 更新資料
./update.sh

# 僅轉換 Excel
python scripts/excel_to_json.py

# 僅建置 HTML
python scripts/build.py

# 查看幫助
cat USAGE.md
```

## 💡 提示

- ✅ **只需編輯** Excel 或 src/ 下的檔案
- ❌ **不要編輯** dist/ 和 data/game_data.json
- 📁 **原始檔案** 已備份為 `.original`

---

就這麼簡單！🎉

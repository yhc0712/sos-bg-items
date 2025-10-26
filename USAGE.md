# 使用說明

## 📖 查看工具

直接開啟以下檔案即可使用：
```
dist/牧場物語物品查詢工具.html
```

無需安裝任何軟體，雙擊開啟即可在瀏覽器中使用。

---

## 🔄 更新資料流程

### 情境 1：Excel 資料更新

當你更新了 `data/道具資料表.xlsx` 後：

```bash
# 方法一：一鍵更新（推薦）
./update.sh

# 方法二：手動執行
source venv/bin/activate
python scripts/excel_to_json.py
python scripts/build.py
```

更新後的檔案位於 `dist/牧場物語物品查詢工具.html`

### 情境 2：修改網頁樣式或功能

如果只想修改網頁的外觀或功能（不涉及資料）：

1. **修改樣式**：編輯 `src/styles.css`
2. **修改功能**：編輯 `src/app.js`
3. **修改結構**：編輯 `src/template.html`

修改完成後重新建置：
```bash
source venv/bin/activate
python scripts/build.py
```

---

## 🛠️ 腳本說明

### `scripts/excel_to_json.py`
從 Excel 檔案解析遊戲資料並生成 JSON。

**功能**：
- ✅ 解析 109 個農作物（含變異種繼承）
- ✅ 解析 271 個風車加工品
- ✅ 解析 266 個料理（分離材料與巧思）
- ✅ 自動處理季節、材料等欄位

**輸出**：`data/game_data.json`

### `scripts/build.py`
合併所有資源（HTML、CSS、JS、JSON）生成最終單檔。

**輸入**：
- `src/template.html` - HTML 模板
- `src/styles.css` - CSS 樣式
- `src/app.js` - JavaScript 程式碼
- `data/game_data.json` - 遊戲資料

**輸出**：`dist/牧場物語物品查詢工具.html`

### `update.sh`
一鍵執行完整更新流程（Excel → JSON → HTML）

---

## 📁 檔案結構說明

```
.
├── data/                          # 資料目錄
│   ├── 道具資料表.xlsx             # 原始資料（唯一真實來源）
│   └── game_data.json             # 自動生成，請勿手動編輯
│
├── src/                           # 原始碼目錄
│   ├── template.html              # HTML 模板
│   ├── styles.css                 # CSS 樣式（可編輯）
│   └── app.js                     # JavaScript 程式碼（可編輯）
│
├── scripts/                       # 建置腳本
│   ├── excel_to_json.py           # Excel 轉 JSON
│   ├── build.py                   # 建置最終 HTML
│   └── extract_html_parts.py      # 提取工具（僅開發用）
│
├── dist/                          # 輸出目錄
│   └── 牧場物語物品查詢工具.html    # 最終產出（可直接使用）
│
├── update.sh                      # 一鍵更新腳本
├── README.md                      # 專案說明
├── USAGE.md                       # 本檔案
└── requirements.txt               # Python 依賴
```

---

## ⚠️ 注意事項

### 不要手動編輯的檔案
- ❌ `data/game_data.json` - 自動生成
- ❌ `dist/牧場物語物品查詢工具.html` - 自動生成

這些檔案會在每次建置時被覆寫。

### 可以編輯的檔案
- ✅ `data/道具資料表.xlsx` - 遊戲資料來源
- ✅ `src/styles.css` - 網頁樣式
- ✅ `src/app.js` - 網頁功能
- ✅ `src/template.html` - 網頁結構

### 資料來源
Excel 檔案中的工作表：
- **農作物**：包含所有作物資訊（含變異種）
- **風車加工品**：包含所有加工品和材料
- **料理**：包含所有料理配方

---

## 🐛 常見問題

### Q: 更新 Excel 後資料沒有更新？
A: 確認有執行建置流程：
```bash
./update.sh
```

### Q: 網頁顯示不正常？
A: 檢查瀏覽器控制台是否有錯誤訊息，確認檔案完整性。

### Q: 如何復原到原始版本？
A: 原始檔案已備份為 `牧場物語物品查詢工具.html.original`

### Q: 可以修改變異種的繼承邏輯嗎？
A: 可以，編輯 `scripts/excel_to_json.py` 中的：
- `VARIANT_PREFIXES` - 變異種前綴列表
- `VARIANT_MAPPING` - 特殊命名對應表

---

## 📊 資料統計

- **總項目數**：646 個
  - 農作物：109 個（含 44 個變異種）
  - 加工品：271 個
  - 料理：266 個

- **檔案大小**：約 150 KB
- **支援瀏覽器**：所有現代瀏覽器

---

## 🎯 下次更新時記得

1. 編輯 `data/道具資料表.xlsx`
2. 執行 `./update.sh`
3. 測試 `dist/牧場物語物品查詢工具.html`
4. 完成！

就是這麼簡單 🎉

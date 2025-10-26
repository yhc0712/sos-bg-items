# 牧場物語 來吧！風之繁華市集 物品查詢工具

這是一個互動式網頁工具，用於查詢《牧場物語：來吧！風之繁華市集》遊戲中的物品資訊，包括農作物、風車加工品和料理。

## 專案特色

### 🌾 功能完整
- **農作物查詢**：109 種農作物（含 44 個變異種）
- **加工品查詢**：271 種風車加工品
- **料理查詢**：266 種料理配方

### 🔍 搜尋功能
- 全域搜尋支援
- OR/AND 搜尋模式切換
- 材料點擊快速搜尋
- 季節、類別、效果等多重篩選

### 📱 使用體驗
- 單檔 HTML，無需安裝
- 響應式設計，支援手機瀏覽
- 所有欄位支援排序
- 即時搜尋結果顯示

## 專案結構

```
Story of Seasons/
├── data/
│   ├── 道具資料表.xlsx          # 原始 Excel 資料（唯一真實來源）
│   └── game_data.json           # 自動生成的 JSON
├── scripts/
│   ├── excel_to_json.py         # Excel → JSON 轉換腳本
│   ├── build.py                 # HTML 建置腳本
│   └── extract_html_parts.py    # 提取工具（開發用）
├── src/
│   ├── template.html            # HTML 模板
│   ├── styles.css               # CSS 樣式
│   └── app.js                   # JavaScript 程式碼
├── dist/
│   └── 牧場物語物品查詢工具.html  # 最終產出（可直接開啟）
├── requirements.txt             # Python 依賴
├── .gitignore
└── README.md
```

## 快速開始

### 環境需求
- Python 3.7+
- openpyxl 套件

### 安裝步驟

1. 建立並啟用虛擬環境：
```bash
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

2. 安裝依賴：
```bash
pip install -r requirements.txt
```

## 使用方式

### 📖 查看工具
直接開啟 `dist/牧場物語物品查詢工具.html` 即可使用。

### 🔄 更新資料

當 Excel 資料更新後，執行以下步驟：

**方法一：一鍵建置（推薦）**
```bash
# 從 Excel 生成 JSON 並建置 HTML
source venv/bin/activate
python scripts/excel_to_json.py && python scripts/build.py
```

**方法二：分步執行**
```bash
source venv/bin/activate

# 1. 從 Excel 生成 JSON
python scripts/excel_to_json.py

# 2. 建置最終 HTML
python scripts/build.py
```

生成的檔案位於 `dist/牧場物語物品查詢工具.html`

### 📝 直接修改程式碼

如果要修改樣式或功能：

1. 編輯對應檔案：
   - 樣式：`src/styles.css`
   - 功能：`src/app.js`
   - 結構：`src/template.html`

2. 重新建置：
```bash
python scripts/build.py
```

## 技術細節

### 資料處理邏輯

#### 變異種自動繼承
腳本會自動處理 44 種變異種農作物：

- **自動前綴識別**：巨大、扭曲、結實、黃金等
- **特殊命名對應**：星形馬鈴薯 → 馬鈴薯
- **資料繼承**：變異種自動繼承基礎作物的季節、天數、連作等屬性

#### 材料解析
- 自動分離料理的「材料」和「巧思材料」
- 移除季節後綴：`小黃瓜(夏秋)` → `小黃瓜`
- 支援 "or" 分隔的材料選項

### 檔案大小
最終生成的 HTML 約 150 KB，包含：
- 完整遊戲資料（646 個項目）
- 所有 CSS 樣式
- 所有 JavaScript 功能

## 資料來源

原始資料來自：[巴哈姆特 牧場物語 來吧！風之繁華市集 哈啦板](https://forum.gamer.com.tw/C.php?bsn=1405&snA=26965)

感謝玩家們的資料整理與分享 ❤️

## 授權

本專案為粉絲自製工具，遊戲相關內容版權歸原廠商所有。

## 更新紀錄

### 2025-10-26
- ✅ 完成模組化重構
- ✅ 實現 Excel 自動轉換流程
- ✅ 支援變異種資料繼承
- ✅ 建立完整建置系統

---

**總項目數**：646 個（農作物 109 + 加工品 271 + 料理 266）

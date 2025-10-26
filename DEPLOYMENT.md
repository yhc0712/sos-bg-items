# 部署指南

## 🚀 使用 GitHub Pages 部署（推薦）

### 步驟 1：初始化 Git 倉庫

```bash
# 初始化 Git（如果還沒有）
git init

# 添加所有檔案
git add .

# 建立第一次提交
git commit -m "Initial commit: 牧場物語物品查詢工具"
```

### 步驟 2：在 GitHub 建立倉庫

1. 前往 [GitHub](https://github.com)
2. 點擊右上角 `+` → `New repository`
3. 輸入倉庫名稱，例如：`harvest-moon-item-lookup`
4. 選擇 `Public`（必須是公開才能使用免費的 GitHub Pages）
5. **不要**勾選 "Add a README file"
6. 點擊 `Create repository`

### 步驟 3：推送到 GitHub

```bash
# 連結到你的 GitHub 倉庫（替換成你的 GitHub 帳號和倉庫名稱）
git remote add origin https://github.com/你的帳號/harvest-moon-item-lookup.git

# 推送程式碼
git branch -M main
git push -u origin main
```

### 步驟 4：啟用 GitHub Pages

1. 在 GitHub 倉庫頁面，點擊 `Settings`
2. 左側選單找到 `Pages`
3. 在 `Source` 下：
   - Branch: 選擇 `main`
   - Folder: 選擇 `/ (root)`
4. 點擊 `Save`

### 步驟 5：訪問你的網站

大約 1-2 分鐘後，你的網站就會上線：

```
https://你的帳號.github.io/harvest-moon-item-lookup/dist/牧場物語物品查詢工具.html
```

**簡化網址方式：**

將 `dist/牧場物語物品查詢工具.html` 複製一份到根目錄並重新命名為 `index.html`：

```bash
cp dist/牧場物語物品查詢工具.html index.html
git add index.html
git commit -m "Add index.html for easier access"
git push
```

然後訪問：
```
https://你的帳號.github.io/harvest-moon-item-lookup/
```

---

## 🌐 使用 Netlify 部署（次選）

### 方法 1：拖放部署（最簡單）

1. 前往 [Netlify](https://www.netlify.com/)
2. 註冊/登入
3. 點擊 `Add new site` → `Deploy manually`
4. 直接拖放 `dist` 資料夾
5. 完成！

你的網站會立即上線，網址類似：
```
https://隨機名稱.netlify.app
```

### 方法 2：CLI 部署

```bash
# 安裝 Netlify CLI
npm install -g netlify-cli

# 登入
netlify login

# 部署
cd "/Users/yhc0712/Downloads/Story of Seasons"
netlify deploy --dir=dist --prod
```

### 方法 3：連結 GitHub（自動部署）

1. 在 Netlify 選擇 `Add new site` → `Import from Git`
2. 連結你的 GitHub 倉庫
3. 設定：
   - Build command: `./update.sh`
   - Publish directory: `dist`
4. 每次推送到 GitHub，Netlify 會自動更新

---

## 🎨 自訂網域（可選）

### GitHub Pages

1. 在 GitHub Pages 設定中，輸入你的網域
2. 在你的網域 DNS 設定中加入：
   ```
   CNAME 記錄: www → 你的帳號.github.io
   ```

### Netlify

1. 在 Netlify 專案設定中選擇 `Domain management`
2. 點擊 `Add custom domain`
3. 依照指示設定 DNS

---

## 📝 更新網站

### 更新流程

```bash
# 1. 編輯 Excel 資料
open data/道具資料表.xlsx

# 2. 重新建置
./update.sh

# 3. 提交更改
git add .
git commit -m "更新遊戲資料"
git push

# 完成！GitHub Pages / Netlify 會自動更新
```

---

## 🔒 私有部署（如果需要）

如果你想要私有部署（僅自己或特定人可訪問）：

### 選項 1：本地伺服器

```bash
# 使用 Python 內建伺服器
cd dist
python3 -m http.server 8000

# 訪問 http://localhost:8000/牧場物語物品查詢工具.html
```

### 選項 2：Vercel（支援私有專案）

Vercel 的免費方案也支援私有 GitHub 倉庫。

---

## 💡 推薦配置

### 最簡單：GitHub Pages + 簡化網址

```bash
# 1. 複製到根目錄
cp dist/牧場物語物品查詢工具.html index.html

# 2. 提交並推送
git add index.html
git commit -m "Add index.html"
git push

# 3. 訪問
# https://你的帳號.github.io/harvest-moon-item-lookup/
```

### 最專業：GitHub + Netlify 自動部署

- 在 GitHub 管理程式碼
- 用 Netlify 自動部署
- 享受最快的 CDN 速度

---

## 📊 流量追蹤（可選）

如果想了解使用情況，可加入免費分析工具：

### Google Analytics

在 `src/template.html` 的 `<head>` 中加入：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=你的ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '你的ID');
</script>
```

然後重新建置：`python scripts/build.py`

---

## ❓ 常見問題

### Q: 需要付費嗎？
A: 完全免費！GitHub Pages 和 Netlify 的免費方案足夠使用。

### Q: 流量限制？
A: GitHub Pages 無限流量，Netlify 每月 100GB（對你的專案綽綽有餘）。

### Q: 可以自訂網域嗎？
A: 可以！所有推薦的服務都支援免費自訂網域。

### Q: 需要維護嗎？
A: 不需要！服務商會自動處理伺服器維護。

### Q: 速度快嗎？
A: 都有 CDN，台灣訪問速度都很快。Netlify 和 Cloudflare Pages 最快。

---

## 🎉 完成！

選擇一個方案，幾分鐘內就能讓你的工具上線供大家使用！

推薦順序：
1. **GitHub Pages**（最簡單、最穩定）
2. **Netlify**（速度最快、功能最多）
3. **Vercel**（適合後續擴展）

# 系統捷徑集 (KT Menu)

一個基於 PWA (Progressive Web App) 技術開發的系統捷徑管理工具，可以方便地將常用的網頁系統整合到一個介面中，並支援安裝到各種裝置上使用。

## 功能特點

- 🚀 支援 PWA，可安裝到桌面使用
- 📱 響應式設計，支援各種螢幕尺寸
- 🎨 可自訂捷徑顏色
- 💾 本地儲存，無需後端服務
- 🔄 離線支援
- 🌙 深色模式設計

## 技術架構

- HTML5
- CSS3 (使用 CSS Variables 實現主題)
- JavaScript (原生，無框架)
- PWA (Progressive Web App)
- Service Worker
- LocalStorage

## 安裝說明

### 開發環境設置

1. 克隆專案：

bash
git clone https://github.com/marmotkit/KT_menu.git
cd KT_menu
bash
npm install
bash
npx http-server


### PWA 安裝方式

1. 使用 Chrome 瀏覽器訪問：https://marmotkit.github.io/KT_menu/
2. 點擊網址列右側的安裝圖示
3. 或等待瀏覽器提示安裝

## 專案結構
text
KT_menu/
├── index.html # 主要 HTML 檔案
├── manifest.json # PWA 配置檔
├── sw.js # Service Worker
├── css/
│ └── style.css # 樣式表
├── js/
│ └── app.js # 主要 JavaScript 邏輯
└── images/
├── icon.svg # 原始圖示
├── icon-192x192.png
└── icon-512x512.png


## 使用說明

1. 新增捷徑：
   - 點擊右下角的 + 按鈕
   - 輸入捷徑名稱和網址
   - 選擇顏色（可選）
   - 點擊儲存

2. 開啟捷徑：
   - 點擊捷徑卡片即可在新分頁開啟對應網站

## 維護指南

### 更新圖示

1. 修改 `images/icon.svg`
2. 運行轉換腳本：
3. bash
node convert-icons.js


### 修改樣式

- 主要顏色變數在 `css/style.css` 的 `:root` 中定義
- 可以修改以下變數：
  - `--primary-color`
  - `--background-color`
  - `--card-color`
  - `--text-color`

### Service Worker 更新

1. 修改 `sw.js` 中的 `CACHE_NAME` 版本
2. 更新 `ASSETS` 陣列中的檔案清單

## 版本歷史

- v1.0.0 (2024-03-14)
  - 初始版本發布
  - 基本捷徑管理功能
  - PWA 支援

## 授權協議

此專案採用 MIT 授權

## 聯絡方式

Project Link: https://github.com/marmotkit/KT_menu
# 添加 README.md
git add README.md

# 提交更改
git commit -m "Add README.md"

# 推送到 GitHub
git push origin main

### emsDemo

結合 Modbus TCP Server 與 RESTful API 架構，支援資料即時讀寫與跨技術整合，並可模擬 Modbus Slave，符合現代化能源系統管理需求。

---

### Node & NPM 目前版本

* node：v22.16.0
* npm：10.9.2

### 通訊協定整合

* Modbus TCP (pymodbus client 模式，由 Node.js 控制介面觸發讀寫)

### API 設計與測試工具

* Swagger (API 文件自動產出與操作)
* pymodbus（作為模擬或實際 TCP slave/client）

### 安全性與穩定性機制
* dotenv (環境變數管理與讀取)
* .env(儲存環境變數)

<!-- ### Docker 容器化 -->
<!-- * 各模組具獨立 Dockerfile 並透過 docker-compose 整合，模擬器與 API 自動連接 -->

### VS Code 環境建議
* ESLint + Prettier 插件，維持團隊程式碼品質與格式一致性

### git 分支說明

<!-- * develop：測試環境(開發人員)
* staging：測試環境(user) -->
* master：正式環境

### git 前置作業

```
git init
.gitignore(設定node_modules資料夾省略\)
git remote add origin https://github.com/zixuanhugo/emsDemo.git

```

### git commit 規則

```
feat: 新增/修改功能 (feature)
fix: 修補 bug
docs: 文件變更
style: 程式碼格式（不影響邏輯）
refactor: 程式碼重構 
test: 測試相關變更
chore: 雜項維護
```

### 專案目錄整合（新增串接 Modbus API 的範例結構）

```
├── modbus-server // 如需模擬 server.py 可選用，或由外部模擬器代替
│   └── server.py
├── api_server // Node.js 實作 API 串接 Modbus TCP
│   ├── index.js
│   ├── jwt.js
│   ├── logger.js
│   ├── .env
│   └── Dockerfile
├── tests // 
│   ├── api.test.js
│   ├── modbusRtuClienTest.py
│   └── modbusTcpClienTest.py
├── docker-compose.yml
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

### 其他開發規則（命名規則、測試規範、元件拆分等）

* 所有與 Modbus 串接的 API 呼叫應集中於 `api/` 模組中之 `modbus.js`

### 測試模擬設置

* Modbus Slave 模擬工具請設定：

  * 協議：Modbus TCP
  * IP：127.0.0.1
  * Port：502（或另行設定並更新 .env）
  * Unit ID：1
  * Register 範圍：0\~9 Holding Register\


### Swagger 文件
* 啟動後可透過以下路徑開啟 API 文件：
* http://localhost:3000/api-docs


### 聯絡方式

```
作者：黃子軒（Zixuan Hugo）
GitHub: @zixuanhugo

```
---

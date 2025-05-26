### emsDemo

結合 Modbus TCP Server 與 RESTful API 架構，
示範一個基本的資料串接後端與功能。

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

### Docker 容器化 -->
 * 各模組具獨立 Dockerfile 並透過 docker-compose 整合。
 

### git 分支說明

<!-- * develop：測試環境(開發人員)
* staging：測試環境(user) -->
* master：正式環境

### git 前置作業

```
git init
echo "node_modules/" >> .gitignore
git remote add origin https://github.com/zixuanhugo/emsDemo.git
git push -u origin master
```

### git commit 規則

```
feat: 新增功能
fix: 修正錯誤
docs: 文件變更
style: 格式修正（無邏輯變更）
refactor: 程式重構
test: 測試腳本與案例
chore: 其他維護性修改
```

### 專案目錄整合（新增串接 Modbus API 的範例結構）

```
emsDemo/
├── api_server/ // Node.js Express RESTful API
│ ├── index.js // 主要 API 定義與啟動邏輯
│ ├── jwt.js // JWT 驗證機制
│ ├── logger.js // 請求日誌紀錄
│ ├── .env // 環境變數設定
│ └── Dockerfile // API 容器建置檔
│
├── modbus_server/ // Python 實作 Modbus Server
│ ├── ModbusTCP.py // TCP Server 模擬
│ ├── ModbusRTU.py // RTU 模式模擬腳本
│ └── Dockerfile // Modbus Server 容器建置檔
│
├── tests/ // 測試與驗證腳本
│ ├── api.test.js // API 端點測試
│ ├── modbusTcpClientTest.py
│ └── modbusRtuClientTest.py
│
├── docker-compose.yml // 整合啟動設定
├── .gitignore
├── .editorconfig
├── package.json
├── README.md
└── NAMING.md
```

### 其他開發規則（命名規則、測試規範、元件拆分等）
* 採用ESLint
* 套用Prettier套件自動強制格式排版
* 命名規則與開發慣例請參考：[NAMING.md](./NAMING.md)


### 測試模擬設置

* Modbus Slave 模擬工具請設定：
  * 協議：Modbus TCP
  * IP：127.0.0.1
  * Port：502（或另行設定並更新 .env）
  * Unit ID：1
  * Register 範圍：0~9 Holding Register


### Swagger 文件
* 啟動後可透過以下路徑開啟 API 文件：
* http://localhost:3000/api-docs


### 聯絡方式
```
作者：黃子軒（Zixuan Hugo）
GitHub: @zixuanhugo

```
---

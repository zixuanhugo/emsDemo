# 命名規則（Naming Conventions）

此文件說明 emsDemo 專案中所採用的命名風格與一致性規範，
適用於 Node.js、Python、API 路徑、Docker、Git 與測試資料夾。
請所有貢獻者遵守以下命名規則，以維持可讀性與維護性。

---

## 一、專案資料夾與檔案命名

| 類型 | 命名風格 | 範例 |
|------|-----------|------|
| Node.js 模組資料夾 | snake_case | api_server/, modbus_server/ |
| 測試資料夾 | tests | tests/ |
| JS 檔案 | kebab-case.js | logger.js, jwt-helper.js |
| Python 檔案 | snake_case.py | modbus_tcp.py, modbus_rtu.py |
| Dockerfile | 標準命名或後綴變化 | Dockerfile, Dockerfile.api |
| 環境設定 | .env, config.js | api_server/.env |

---

## 二、JavaScript（Node.js）命名

| 類型 | 命名風格 | 範例 |
|------|----------|------|
| 變數 / 函式名稱 | camelCase | getData(), readModbus() |
| 類別 / 建構函式 | PascalCase | ModbusClient, ApiService |
| 常數 | UPPER_SNAKE_CASE | DEFAULT_PORT, JWT_SECRET |
| JSON Key | camelCase | { "registerAddress": 0 } |

---

## 三、Python 命名（PEP8 標準）

| 類型 | 命名風格 | 範例 |
|------|----------|------|
| 變數 / 函式 | snake_case | read_registers(), start_tcp_server() |
| 類別 | PascalCase | ModbusServer, TcpHandler |
| 常數 | UPPER_SNAKE_CASE | DEFAULT_UNIT_ID = 1 |

---

## 四、RESTful API 命名

| 類型 | 命名風格 | 範例 |
|------|----------|------|
| API 路徑 | kebab-case + 名詞 | /modbus/:address, /modbus/:id/write |
| 查詢參數 | camelCase | ?unitId=1&range=0-9 |
| Swagger tags | PascalCase | ModbusAPI, DeviceControl |

---

## 五、Docker 與 Git 命名

| 類型 | 命名風格 | 範例 |
|------|----------|------|
| Docker 服務名稱 | kebab-case | api-server, modbus-server |
| Git 分支名稱 | type/內容 | feature/add-api, fix/docker-error |
| Git commit 類型 | Conventional Commits | feat: 新增功能, fix: 修復錯誤 |

---

## 六、測試與元件命名

| 類型 | 命名風格 | 範例 |
|------|----------|------|
| Python 測試 | test_*.py 或 *_test.py | modbus_client_test.py |
| JS 測試 | *.test.js | api.test.js |
| 測試功能命名 | 與原功能一致，加上 Test 後綴 | ModbusClientTest |

---

## 補充原則

1. 禁用縮寫（除非為廣為人知的如 API、JWT）。
2. 禁用中文命名（除 README.md 內文）。
3. 保持語義清楚，避免模糊命名如 data1、temp 等。
4. 為每個模組建立獨立資料夾，保持結構清晰。

---

如需更改命名風格，請先提出 PR 並附上變更說明。

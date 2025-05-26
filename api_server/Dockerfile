# 使用 Node.js 18 版本作為基礎映像
FROM node:18

# 建立並切換到 app 目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json（如果有的話）
COPY package*.json ./

# 安裝 dependencies（這一步會安裝 modbus-serial）
RUN npm install

# 複製其餘程式碼到容器中
COPY . .

# 指定啟動指令
CMD ["npm", "start"]

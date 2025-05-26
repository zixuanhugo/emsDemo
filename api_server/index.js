const express = require('express');
const ModbusRTU = require('modbus-serial');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

require('dotenv').config();

const app = express();
const client = new ModbusRTU();


// 初始化 Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'EMS DEMO',
    version: '1.0.0',
    description: '透過 Node.js 與 pymodbus 建立的 Modbus TCP 資料讀寫 API'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: '本地測試伺服器'
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./index.js'], // 將會讀取下方用註解寫的 API 描述
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



app.use(bodyParser.json());

// 連接到 Python 的 Modbus TCP Server
client.connectTCP(process.env.MODBUS_HOST || "127.0.0.1", {
  port: process.env.MODBUS_PORT ? parseInt(process.env.MODBUS_PORT) : 5020
})
  .then(() => {
    console.log("✅ 已連接到 Modbus TCP Server");
    client.setID(1); // 若單一 Slave 可設定為 1 或 0
  })
  .catch(err => {
    console.error("❌ 無法連接 Modbus TCP Server:", err.message);
  });

/** GET /modbus/:address 讀取指定位址 */
app.get('/modbus/:address', async (req, res) => {
  const address = parseInt(req.params.address);
  try {
    const data = await client.readHoldingRegisters(address, 1);
    res.json({ address, value: data.data[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/**
 * @swagger
 * /modbus/{address}:
 *   get:
 *     summary: 讀取指定 Holding Register 位址的值
 *     parameters:
 *       - in: path
 *         name: address
 *         schema:
 *           type: integer
 *         required: true
 *         description: 要讀取的 Register 位址
 *     responses:
 *       200:
 *         description: 成功取得值
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 address:
 *                   type: integer
 *                 value:
 *                   type: integer
 */


/** POST /modbus/:address 寫入數值 { value: 整數 } */
app.post('/modbus/:address', async (req, res) => {
  const address = parseInt(req.params.address);
  const value = req.body.value;
  try {
    await client.writeRegister(address, value);
    res.json({ address, written: value });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /modbus/{address}:
 *   post:
 *     summary: 寫入指定 Holding Register 位址的值
 *     parameters:
 *       - in: path
 *         name: address
 *         schema:
 *           type: integer
 *         required: true
 *         description: 要寫入的 Register 位址
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: integer
 * 
 * 
 * 
 *     responses:
 *       200:
 *         description: 寫入成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 address:
 *                   type: integer
 *                 written:
 *                   type: integer
 */

const rtuClient = new ModbusRTU();

rtuClient.connectRTUBuffered("COM6", { baudRate: 9600, parity: 'none' })
  .then(() => {
    console.log("✅ 已連接到 Modbus RTU (COM6)");
    rtuClient.setID(1); // 設定 Slave ID
  })
  .catch(err => {
    console.error("❌ 無法連接 Modbus RTU (COM6):", err.message);
  });

/** GET /modbus-rtu/:address 讀取 RTU 裝置的資料 */
app.get('/modbus-rtu/:address', async (req, res) => {
  const address = parseInt(req.params.address);
  try {
    if (!rtuClient.isOpen) {
      throw new Error('RTU client not connected');
    }

    const data = await rtuClient.readHoldingRegisters(address, 1);
    console.log("RTU 讀取資料:", data);
    if (!data || !data.data || data.data.length === 0) {
      throw new Error('No data returned from RTU device');
    }

    res.json({ address, value: data.data[0] });
  } catch (err) {
    console.error("❌ RTU 讀取失敗:", err.message);
    res.status(500).json({ error: err.message });
  }
});


/**
 * @swagger
 * /modbus-rtu/{address}:
 *   get:
 *     summary: 從 RTU 裝置讀取指定 Holding Register 位址的值
 *     parameters:
 *       - in: path
 *         name: address
 *         schema:
 *           type: integer
 *         required: true
 *         description: 要讀取的 Register 位址
 *     responses:
 *       200:
 *         description: 成功取得值
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 address:
 *                   type: integer
 *                 value:
 *                   type: integer
 *       500:
 *         description: 通訊或錯誤發生
 */


/** POST /modbus-rtu/:address 寫入 RTU 裝置的資料 */
app.post('/modbus-rtu/:address', async (req, res) => {
  const address = parseInt(req.params.address);
  const value = req.body.value;
  try {
    await rtuClient.writeRegister(address, value);
    res.json({ address, written: value });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/**
 * @swagger
 * /modbus-rtu/{address}:
 *   post:
 *     summary: 寫入指定 RTU 裝置的 Holding Register 位址的值
 *     parameters:
 *       - in: path
 *         name: address
 *         schema:
 *           type: integer
 *         required: true
 *         description: 要寫入的 Register 位址
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: integer
 *                 example: 12345
 *     responses:
 *       200:
 *         description: 寫入成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 address:
 *                   type: integer
 *                 written:
 *                   type: integer
 *       500:
 *         description: 通訊或錯誤發生
 */


app.listen(3000, () => {
  console.log('🚀 RESTful API 伺服器運行中：http://localhost:3000');
});
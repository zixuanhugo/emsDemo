const express = require('express');
const ModbusRTU = require('modbus-serial');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
const client = new ModbusRTU();


// 初始化 Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Modbus TCP API',
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
client.connectTCP("modbus_server", { port: 5020 })
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


app.listen(3000, () => {
  console.log('🚀 RESTful API 伺服器運行中：http://localhost:3000');
});
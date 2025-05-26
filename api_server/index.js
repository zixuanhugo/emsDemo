const express = require('express');
const ModbusRTU = require('modbus-serial');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
const client = new ModbusRTU();

const options = {
  swaggerDefinition,
  apis: ['./index.js'], // 將會讀取下方用註解寫的 API 描述
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(bodyParser.json());

// 連接到 Python 的 Modbus TCP Server
client.connectTCP("127.0.0.1", { port: 5020 })
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

app.listen(3000, () => {
  console.log('🚀 RESTful API 伺服器運行中：http://localhost:3000');
});

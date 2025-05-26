#modbusRtuClienTest.py
from pymodbus.client import ModbusSerialClient
import logging
import time

logging.basicConfig(level=logging.INFO)

client = ModbusSerialClient(
    port='COM2',
    baudrate=9600,
    bytesize=8,
    parity='N',
    stopbits=1,
    timeout=1
)

if client.connect():
    print("✅ 成功連線到 COM2 的 Modbus Slave")

    result = client.read_holding_registers(address=0, count=5, unit=1)

    if result.isError():
        print("❌ 讀取失敗：", result)
    else:
        print("📥 讀取結果：", result.registers)

    write_result = client.write_register(address=1, value=12345, unit=1)
    if write_result.isError():
        print("❌ 寫入失敗：", write_result)
    else:
        print("✅ 寫入成功：位址 1 設為 12345")

    time.sleep(1)
    confirm = client.read_holding_registers(address=1, count=1, unit=1)
    print("🔁 確認讀取位址 1：", confirm.registers[0] if not confirm.isError() else confirm)

    client.close()
else:
    print("❌ 無法連線到 COM2，請檢查設定")

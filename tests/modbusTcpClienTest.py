#modbusTcpClienTest.py
from pymodbus.client import ModbusTcpClient

client = ModbusTcpClient("127.0.0.1", port=5020)
client.connect()

# 正確使用 slave_id（代替 unit）
rr = client.read_holding_registers(0, 10, slave=0)

if rr.isError():
    print("Error reading:", rr)
else:
    print("Read result:", rr.registers)

client.close()

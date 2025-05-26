from pymodbus.server import StartTcpServer
from pymodbus.datastore import ModbusSlaveContext, ModbusServerContext
from pymodbus.datastore.store import ModbusSequentialDataBlock
import logging
import os
from dotenv import load_dotenv

load_dotenv()

# 允許你在 .env 中設定對外 IP，預設為 0.0.0.0（允許任何來源連入）
MODBUS_HOST = os.getenv("MODBUS_HOST", "0.0.0.0")
MODBUS_PORT = int(os.getenv("MODBUS_PORT", 5020))

initial_data = [1000, 1011, 1022, 1033, 1044, 1055, 1066, 1077, 1088, 1099]
print("Server initialized with:", initial_data)

store = ModbusSlaveContext(
    hr=ModbusSequentialDataBlock(0, initial_data)
)
context = ModbusServerContext(slaves=store, single=True)

logging.basicConfig(level=logging.INFO)

def run_server():
    logging.info(f"🚀 Modbus TCP Server listening on {MODBUS_HOST}:{MODBUS_PORT}")
    StartTcpServer(
        context=context,
        address=(MODBUS_HOST, MODBUS_PORT)
    )

if __name__ == '__main__':
    run_server()

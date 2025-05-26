#ModbusRTU.py
from pymodbus.server import StartSerialServer
from pymodbus.datastore import ModbusSlaveContext, ModbusServerContext
from pymodbus.datastore.store import ModbusSequentialDataBlock
from pymodbus.framer.rtu_framer import ModbusRtuFramer  # ✅ 正確的新版匯入方式
import logging

# 建立資料儲存區（Holding Registers）
store = ModbusSlaveContext(
    hr=ModbusSequentialDataBlock(0, [0] * 10)
)
context = ModbusServerContext(slaves=store, single=True)

# 記錄 log
logging.basicConfig(level=logging.INFO)

def run_rtu_server():
    StartSerialServer(
        context=context,
        framer=ModbusRtuFramer,
        port='COM1',
        baudrate=9600,
        bytesize=8,
        parity='N',
        stopbits=1,
        timeout=1
    )
    logging.info("Modbus RTU Server is running on COM1 at 9600 baudrate...")
    logging.basicConfig(level=logging.DEBUG)

if __name__ == "__main__":
    run_rtu_server()

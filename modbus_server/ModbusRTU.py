from pymodbus.server import StartSerialServer
from pymodbus.datastore import ModbusSlaveContext, ModbusServerContext
from pymodbus.datastore.store import ModbusSequentialDataBlock
from dotenv import load_dotenv
import logging
import os

load_dotenv()
# 允許你在 .env 中設定模擬 RTU 模式
os.environ.setdefault("MOCK_RTU", "false")  # 預設為 false，若要模擬請在 .env 中設定 MOCK_RTU=true
# 印出目前 MOCK_RTU 的值
print("MOCK_RTU =", os.getenv("MOCK_RTU"))


# 初始化資料
initial_data = [40011, 40022, 40033, 40044, 40055, 40066, 40077, 40088, 40099, 400100]
store = ModbusSlaveContext(
    hr=ModbusSequentialDataBlock(0, initial_data)
)
context = ModbusServerContext(slaves=store, single=True)

# 記錄 log
logging.basicConfig(level=logging.INFO)

def run_rtu_server():
    # 印出目前 HR 的值
    hr_values = context[0].getValues(3, 0, count=10)
    print("✅ 初始 Holding Registers 數值：", hr_values)

    # 判斷是否為模擬模式
    if os.getenv("MOCK_RTU", "false").lower() == "true":
        print("🔧 模擬 RTU 模式已啟用，略過 RTU Server 啟動")
        return

    # 啟動 RTU Server（實際啟動）
    StartSerialServer(
        context=context,
        # port='COM5',  # 正常環境請改這裡（或是用 '/dev/ttyS10' 等）
        port='loop://',  # 若要測試可改用 loop://，但需配合 pyserial 支援
        baudrate=9600,
        bytesize=8,
        parity='N',
        stopbits=1,
        timeout=1
    )
    logging.info("Modbus RTU Server is running on COM5 at 9600 baudrate...")

if __name__ == "__main__":
    run_rtu_server()

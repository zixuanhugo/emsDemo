from pymodbus.server import StartTcpServer
from pymodbus.datastore import ModbusSlaveContext, ModbusServerContext
from pymodbus.datastore.store import ModbusSequentialDataBlock
import logging

initial_data = [11, 22, 33, 44, 55, 66, 77, 88, 99, 100]
print("Server initialized with:", initial_data)

store = ModbusSlaveContext(
    hr=ModbusSequentialDataBlock(0, initial_data)
)
context = ModbusServerContext(slaves=store, single=True)

logging.basicConfig(level=logging.INFO)

def run_server():
    StartTcpServer(
        context=context,
        address=("127.0.0.1", 5020)
    )

if __name__ == '__main__':
    run_server()

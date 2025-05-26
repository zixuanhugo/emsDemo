#!/bin/bash
echo "啟動 ModbusTCP.py..."
python ModbusTCP.py &

sleep 3

echo "啟動 ModbusRTU.py..."
python ModbusRTU.py

wait

FROM python:3.10

WORKDIR /app
COPY . .

RUN pip install pymodbus==3.4.1 python-dotenv pyserial

RUN chmod +x start.sh

CMD ["./start.sh"]

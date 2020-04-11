from config import DB_NAME, QUEUE_NAME_HUMIDITY, QUEUE_NAME_TEMPERATURE
from humidity import Humidity
from queue import Queue
from temperature import Temperature
from threading import Thread

controllers = [
    Temperature(QUEUE_NAME_TEMPERATURE, 5),
    Humidity(QUEUE_NAME_HUMIDITY, 3)
]

for controller in controllers:
    Thread(target=Queue, args=(controller, )).start()

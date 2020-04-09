import os

from humidity import Humidity
from queue import Queue
from temperature import Temperature
from threading import Thread

DB_NAME = os.getenv('MONGO_DATABASE_NAME', 'iot')

controllers = [
    Temperature(DB_NAME, 'temperatures', 5),
    Humidity(DB_NAME, 'humidities', 3)
]

for controller in controllers:
    Thread(target=Queue, args=(controller, )).start()

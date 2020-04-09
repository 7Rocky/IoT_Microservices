from dao import Dao
from humidity import Humidity
from queue import Queue
from temperature import Temperature
from threading import Thread

Thread(target=Queue, args=(Temperature('temperature', 'temperatures', 5), '\033[92m')).start()
Thread(target=Queue, args=(Humidity('humidity', 'humidities', 3), '\033[95m')).start()

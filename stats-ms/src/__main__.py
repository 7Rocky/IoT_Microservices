from src.config.config import DB_NAME, QUEUE_NAME_HUMIDITY, QUEUE_NAME_TEMPERATURE
from src.measures.humidity import Humidity
from src.queue.queue import Queue
from src.measures.temperature import Temperature
from threading import Thread

def a():
    return 1

controllers = [
    Temperature(QUEUE_NAME_TEMPERATURE, 60) # ,
    # Humidity(QUEUE_NAME_HUMIDITY, 3)
]

def main():
    print('main')
    for controller in controllers:
        Thread(target=Queue, args=(controller, )).start()

if __name__ == '__main__':
    main()

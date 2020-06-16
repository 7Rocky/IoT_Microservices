from src.config.config import QUEUE_HUMIDITY_NAME, QUEUE_LIGHT_NAME, QUEUE_TEMPERATURE_NAME
from src.measures.humidity import Humidity
from src.measures.light import Light
from src.measures.temperature import Temperature
from src.queue.queue import Queue
from threading import Thread

controllers = [
    Humidity(QUEUE_HUMIDITY_NAME, 60),
    Light(QUEUE_LIGHT_NAME, 60),
    Temperature(QUEUE_TEMPERATURE_NAME, 60)
]

def main():
    print('main')
    for controller in controllers:
        Thread(target=Queue, args=(controller, )).start()

if __name__ == '__main__':
    main()

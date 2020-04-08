import json
import pika
import os

from config import RABBITMQ_HOSTNAME, RABBITMQ_PASSWORD, RABBITMQ_PORT, RABBITMQ_USERNAME
from dao import Dao, milliseconds_now
from datetime import datetime

dao = Dao('temperature', 'temperatures')
QUEUE = 'temperature'

print(os.environ)

credentials = pika.PlainCredentials(RABBITMQ_USERNAME, RABBITMQ_PASSWORD)
connection = pika.BlockingConnection(
    pika.ConnectionParameters(RABBITMQ_HOSTNAME, RABBITMQ_PORT, '/', credentials)
)
channel = connection.channel()
channel.queue_declare(queue=QUEUE, durable=True)

def callback(ch, method, properties, body):
    temperature = json.loads(body.decode())
    print('')
    for attr in temperature:
        print(f'{attr}: {temperature[attr]}')

    dao.insert_document({
        'end_date': datetime.now(),
        'end_timestamp': milliseconds_now(),
        'init_date': datetime.now(),
        'init_timestamp': milliseconds_now() - 3600000,
        'max_value': temperature.get('real_value'),
        'mean_value': temperature.get('real_value'),
        'min_value': temperature.get('real_value'),
        'n_samples': 1,
        'sensor': temperature.get('sensor'),
        'std_deviation': temperature.get('real_value'),
        'time_span': 1000,
        'username': temperature.get('username')
    })

channel.basic_consume(queue=QUEUE, auto_ack=True, on_message_callback=callback)
channel.start_consuming()

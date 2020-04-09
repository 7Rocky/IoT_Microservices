import json
import pika

from config import RABBITMQ_HOST, RABBITMQ_PASSWORD, RABBITMQ_PORT, RABBITMQ_USERNAME

ENDC = '\033[0m'

channel = None

def get_channel():
    global channel

    if channel is None:
        credentials = pika.PlainCredentials(RABBITMQ_USERNAME, RABBITMQ_PASSWORD)
        connection = pika.BlockingConnection(
            pika.ConnectionParameters(RABBITMQ_HOST, RABBITMQ_PORT, '/', credentials))
        channel = connection.channel()

    return channel

class Queue():
    def __init__(self, controller, color):
        channel = get_channel()
        channel.queue_declare(queue=controller.queue, durable=True)

        data = []

        def queue_callback(channel, method, properties, body):
            print(f'{color} {len(data)} {body}{ENDC}')
            if len(data) < controller.max_items:
                d = json.loads(body.decode())
                data.append(d)
            else:
                stats = controller.calculate_stats(data.copy())
                data.clear()
                print(f'{color} {stats}{ENDC}')
                #controller.dao.insert_document(stats)

        channel.basic_consume(queue=controller.queue, auto_ack=True, on_message_callback=queue_callback)
        channel.start_consuming()

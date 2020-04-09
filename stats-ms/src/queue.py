import json

from rabbitmq import get_channel

class Queue():
    def __init__(self, controller):
        channel = get_channel()
        channel.queue_declare(queue=controller.queue, durable=True)
        data = []

        def queue_callback(channel, method, properties, body):
            print(f'{len(data)} {body}')
            if len(data) < controller.max_items:
                d = json.loads(body.decode())
                data.append(d)
            else:
                stats = controller.calculate_stats(data.copy())
                data.clear()
                print(f'{stats}')
                controller.dao.insert_document(stats)

        channel.basic_consume(queue=controller.queue, auto_ack=True, on_message_callback=queue_callback)
        channel.start_consuming()

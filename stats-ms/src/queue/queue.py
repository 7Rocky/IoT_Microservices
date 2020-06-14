import json

from src.queue.rabbitmq import get_channel

class Queue():
    def __init__(self, controller):
        channel = get_channel()
        channel.queue_declare(queue=controller.queue, durable=True)
        streams = { }

        def queue_callback(channel, method, properties, body):
            data = json.loads(body.decode())
            stream = streams.get(data['ip'])
            print(data, len(stream) if stream is not None else 0)

            if stream is not None:
                stream.append(data)

                if len(stream) == controller.max_items:
                    stats = controller.calculate_stats(stream.copy())
                    stream.clear()
                    print(f'{stats}')
                    print(f'************{stats.get("ip")}************')
                    print(f'------------{streams.keys()}------------')
                    controller.dao.insert_document(stats)
            else:
                streams[data['ip']] = [ data ]

        channel.basic_consume(queue=controller.queue, auto_ack=True, on_message_callback=queue_callback)
        channel.start_consuming()

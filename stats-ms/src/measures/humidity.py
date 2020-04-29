from measures.measure import Measure

class Humidity(Measure):
    def __init__(self, queue_collection, max_items):
        super().__init__(queue_collection, max_items)

    def calculate_stats(self, data):
        values = [ d.get('value') for d in data ]
        measure = data[0].get('measure')
        ip = data[0].get('ip')
        username = data[0].get('username')

        return {
            'sum': sum(values),
            'measure': measure,
            'ip': ip,
            'username': username
        }

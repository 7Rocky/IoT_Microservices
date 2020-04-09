from measure import Measure

class Humidity(Measure):
    def __init__(self, queue_collection, db_name, max_items):
        super().__init__(queue_collection, db_name, max_items)

    def calculate_stats(self, data):
        values = [ d.get('value') for d in data ]
        return { 'sum': sum(values) }

from statistics import fmean
from src.measures.measure import Measure

class Light(Measure):
    def __init__(self, queue_collection, max_items):
        super().__init__(queue_collection, max_items)

    def calculate_stats(self, data):
        dates = [ d.get('date') for d in data ]
        digital_values = [ d.get('digital_value') for d in data ]
        timestamps = [ d.get('timestamp') for d in data ]

        init_date, end_date = min(dates), max(dates)
        init_timestamp, end_timestamp = min(timestamps), max(timestamps)
        time_span = end_timestamp - init_timestamp

        mean_value = fmean(digital_values)

        n_samples = len(data)

        sensor = data[0].get('sensor')
        username = data[0].get('username')
        ip = data[0].get('ip')
        measure = data[0].get('measure')

        return {
            'digital_values': digital_values,
            'end_date': end_date,
            'end_timestamp': end_timestamp,
            'init_date': init_date,
            'init_timestamp': init_timestamp,
            'ip': ip,
            'mean_value': round(mean_value, 1),
            'measure': measure,
            'n_samples': n_samples,
            'sensor': sensor,
            'time_span': time_span,
            'username': username
        }

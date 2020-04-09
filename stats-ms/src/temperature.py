import numpy

from measure import Measure

class Temperature(Measure):
    def __init__(self, queue_collection, db_name, max_items):
        super().__init__(queue_collection, db_name, max_items)

    def calculate_stats(self, data):
        dates = [ d.get('date') for d in data ]
        real_values = [ d.get('real_value') for d in data ]
        timestamps = [ d.get('timestamp') for d in data ]

        init_date, end_date = min(dates), max(dates)
        min_value, max_value = min(real_values), max(real_values)
        init_timestamp, end_timestamp = min(timestamps), max(timestamps)
        time_span = end_timestamp - init_timestamp

        mean_value, std_deviation = numpy.mean(real_values), numpy.std(real_values)

        n_samples = len(data)

        sensor = data[0].get('sensor')
        username = data[0].get('username')

        return {
            'end_date': end_date,
            'end_timestamp': end_timestamp,
            'init_date': init_date,
            'init_timestamp': init_timestamp,
            'max_value': max_value,
            'mean_value': round(mean_value, 1),
            'min_value': min_value,
            'n_samples': n_samples,
            'sensor': sensor,
            'std_deviation': round(std_deviation, 1),
            'time_span': time_span,
            'username': username
        }

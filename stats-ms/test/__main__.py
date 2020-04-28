import json
import os
import unittest

from math import sqrt
from src.__main__ import a
from src.measures.operations import mean, std
from src.measures.temperature import Temperature

class TestStatsMS(unittest.TestCase):
    def test_a(self):
        self.assertEqual(a(), 1)

    def test_mean(self):
        self.assertEqual(mean([1, 2, 3, 4]), 2.5)

    def test_std(self):
        self.assertEqual(std([1, 2, 3, 4]), sqrt(5) / 2)

    def test_temperature(self):
        temperature = Temperature('temperatures', 60)
        self.assertEqual(temperature.queue, 'temperatures')
        self.assertEqual(temperature.max_items, 60)

        with open('test/temperatures.json', 'r') as f:
            data = list(json.loads(f.read()))
            self.assertEqual(temperature.calculate_stats(data), {
                    'end_date': 'Sun, 26 Apr 2020 13:21:35 GMT',
                    'end_timestamp': 1587907295530,
                    'init_date': 'Sun, 26 Apr 2020 13:21:34 GMT',
                    'init_timestamp': 1587907294530,
                    'max_value': 25.4,
                    'mean_value': 23.9,
                    'measure': 'temperature',
                    'ip': '192.168.1.50',
                    'min_value': 22.4,
                    'n_samples': 2,
                    'sensor': 'Grove - Temperature',
                    'std_deviation': 1.5,
                    'time_span': 1000,
                    'username': 'Rocky'
                })

if __name__ == '__main__':
    unittest.main()

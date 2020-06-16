import json
import unittest

from src.measures.humidity import Humidity
from src.measures.light import Light
from src.measures.temperature import Temperature

class TestStatsMS(unittest.TestCase):
    def test_humidity(self):
        humidity = Humidity('humidities', 60)
        self.assertEqual(humidity.queue, 'humidities')
        self.assertEqual(humidity.max_items, 60)

        with open('test/humidities.json', 'r') as f:
            data = list(json.loads(f.read()))
            self.assertEqual(
                humidity.calculate_stats(data),
                {
                    'end_date': 'Sun, 26 Apr 2020 13:21:35 GMT',
                    'end_timestamp': 1587907295530,
                    'init_date': 'Sun, 26 Apr 2020 13:21:34 GMT',
                    'init_timestamp': 1587907294530,
                    'max_value': 40,
                    'mean_value': 30.0,
                    'measure': 'humidity',
                    'ip': '192.168.1.50',
                    'min_value': 20,
                    'n_samples': 2,
                    'real_values': [ 40, 20 ],
                    'sensor': 'Grove - Moisture',
                    'std_deviation': 14.1,
                    'time_span': 1000,
                    'username': 'Rocky'
                }
            )

    def test_light(self):
        light = Light('lights', 60)
        self.assertEqual(light.queue, 'lights')
        self.assertEqual(light.max_items, 60)

        with open('test/lights.json', 'r') as f:
            data = list(json.loads(f.read()))
            self.assertEqual(
                light.calculate_stats(data),
                {
                    'digital_values': [ 1, 0 ],
                    'end_date': 'Sun, 26 Apr 2020 13:21:35 GMT',
                    'end_timestamp': 1587907295530,
                    'init_date': 'Sun, 26 Apr 2020 13:21:34 GMT',
                    'init_timestamp': 1587907294530,
                    'mean_value': 0.5,
                    'measure': 'light',
                    'ip': '192.168.1.50',
                    'n_samples': 2,
                    'sensor': 'Smart LED',
                    'time_span': 1000,
                    'username': 'Rocky'
                }
            )

    def test_temperature(self):
        temperature = Temperature('temperatures', 60)
        self.assertEqual(temperature.queue, 'temperatures')
        self.assertEqual(temperature.max_items, 60)

        with open('test/temperatures.json', 'r') as f:
            data = list(json.loads(f.read()))
            self.assertEqual(
                temperature.calculate_stats(data),
                {
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
                    'real_values': [ 25.4, 22.4 ],
                    'sensor': 'Grove - Temperature',
                    'std_deviation': 2.1,
                    'time_span': 1000,
                    'username': 'Rocky'
                }
            )

if __name__ == '__main__':
    unittest.main()

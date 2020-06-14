import os

DB_NAME = os.getenv('MONGO_DATABASE_NAME', 'iot')

MONGO_HOST = os.environ.get('MONGO_HOSTNAME', '192.168.1.222') # '192.168.99.100')
MONGO_USERNAME = os.environ.get('MONGO_DEFAULT_USER', 'root')
MONGO_PASSWORD = os.environ.get('MONGO_DEFAULT_PASS', 'secret')
MONGO_PORT = os.environ.get('MONGO_SERVICE_PORT', 32000)
MONGO = f'{MONGO_HOST}:{MONGO_PORT}'

QUEUE_HUMIDITY_NAME = os.environ.get('QUEUE_HUMIDITY_NAME', 'humidities')
QUEUE_LIGHT_NAME = os.environ.get('QUEUE_LIGHT_NAME', 'lights')
QUEUE_TEMPERATURE_NAME = os.environ.get('QUEUE_TEMPERATURE_NAME', 'temperatures')

RABBITMQ_USERNAME = os.environ.get('RABBITMQ_DEFAULT_USER', 'user')
RABBITMQ_PASSWORD = os.environ.get('RABBITMQ_DEFAULT_PASS', 'password')
RABBITMQ_HOST = os.environ.get('RABBITMQ_HOSTNAME', '192.168.1.222') # '192.168.99.100')
RABBITMQ_PORT = os.environ.get('RABBITMQ_SERVICE_PORT', 31300)

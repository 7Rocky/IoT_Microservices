import time

from config import MONGO_HOSTNAME, MONGO_PASSWORD, MONGO_PORT, MONGO_USERNAME
from pymongo import MongoClient

milliseconds_now = lambda: int(round(time.time() * 1000))

class Dao:
    def __init__(self, db_name, collection):
        mongo = MongoClient(f'mongodb://{MONGO_USERNAME}:{MONGO_PASSWORD}@{MONGO_HOSTNAME}:{MONGO_PORT}/')
        db = mongo[db_name]
        self.temperatures = db[collection]

    def find_document(self, _date, _from):
        return list(self.temperatures.find({
            'timestamp': { '$lte': milliseconds_now() }
        }, {
            '_id': 0
        }))

    def insert_document(self, doc):
        self.temperatures.insert_one(doc)

    def update_document(self, query, update):
        result = self.temperatures.update_one(query, { '$set': update })
        return result.matched_count

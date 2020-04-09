import time

from config import MONGO, MONGO_PASSWORD, MONGO_USERNAME
from pymongo import MongoClient

class Dao:
    def __init__(self, db_name, collection):
        mongo = MongoClient(f'mongodb://{MONGO_USERNAME}:{MONGO_PASSWORD}@{MONGO}/')
        db = mongo[db_name]
        self.temperatures = db[collection]

    def insert_document(self, doc):
        self.temperatures.insert_one(doc)

    def update_document(self, query, update):
        result = self.temperatures.update_one(query, { '$set': update })
        return result.matched_count

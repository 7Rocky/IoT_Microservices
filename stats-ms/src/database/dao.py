from pymongo import MongoClient
from src.config.config import DB_NAME, MONGO, MONGO_PASSWORD, MONGO_USERNAME

class Dao:
    def __init__(self, collection):
        mongo = MongoClient(f'mongodb://{MONGO_USERNAME}:{MONGO_PASSWORD}@{MONGO}/')
        db = mongo[DB_NAME]
        self.collection = db[collection]

    def insert_document(self, doc):
        self.collection.insert_one(doc)

    def update_document(self, query, update):
        result = self.collection.update_one(query, { '$set': update })
        return result.matched_count

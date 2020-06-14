from src.database.dao import Dao

class Measure():
    def __init__(self, queue_collection, max_items):
        self.dao = Dao(queue_collection)
        self.max_items = max_items
        self.queue = queue_collection

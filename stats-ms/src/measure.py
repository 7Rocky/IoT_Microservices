from dao import Dao

class Measure():
    def __init__(self, queue_collection, db_name, max_items):
        self.dao = Dao(queue_collection, db_name)
        self.max_items = max_items
        self.queue = queue_collection

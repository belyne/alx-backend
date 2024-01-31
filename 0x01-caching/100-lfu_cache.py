#!/usr/bin/python3
""" 100-lfu_cache """
from base_caching import BaseCaching

class LFUCache(BaseCaching):
    """ LFU Cache class """

    def __init__(self):
        """ Constructor """
        super().__init__()
        self.freq_counter = {}

    def put(self, key, item):
        """ Add an item to the cache """
        if key is None or item is None:
            return

        if key in self.cache_data:
            # If key already exists, update its value and increase its frequency
            self.cache_data[key] = item
            self.freq_counter[key] += 1
        else:
            # If cache is full, discard LFU or LRU item
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                lfu_items = [k for k, v in self.freq_counter.items() if v == min(self.freq_counter.values())]
                lru_key = min(self.lru_order, key=lambda k: self.lru_order[k])
                if len(lfu_items) > 1:
                    lru_key = min(lfu_items, key=lambda k: self.lru_order[k])
                del self.cache_data[lru_key]
                del self.freq_counter[lru_key]
                del self.lru_order[lru_key]
                print(f"DISCARD: {lru_key}")

            # Add new item to cache with frequency 1
            self.cache_data[key] = item
            self.freq_counter[key] = 1

        # Update LRU order
        self.lru_order[key] = self.current_time
        self.current_time += 1

    def get(self, key):
        """ Get an item from the cache """
        if key is None or key not in self.cache_data:
            return None

        # Update frequency and LRU order for the accessed item
        self.freq_counter[key] += 1
        self.lru_order[key] = self.current_time
        self.current_time += 1

        return self.cache_data[key]

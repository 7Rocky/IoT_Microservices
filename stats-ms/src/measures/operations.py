from math import sqrt

def mean(a):
    return sum(a) / len(a)

def std(a):
    _mean = mean(a)
    return sqrt(sum(map(lambda x: x ** 2, a)) / len(a) - _mean ** 2)

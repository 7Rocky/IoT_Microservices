from math import sqrt

def mean(a):
    return sum(a) / len(a)

def std(a):
    return sqrt(sum(map(lambda x: x ** 2, a)) / len(a) - mean(a) ** 2)

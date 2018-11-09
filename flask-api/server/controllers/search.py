from patternfinder.geometric_helsinki.indexer import csv_notes, intra_vectors
from server.dpwc import search_palestrina

def search(input_type, query_string, music_files):
    indexed_query = csv_notes(query_string, dest="str", window=1)
    return search_palestrina(indexed_query, music_files)

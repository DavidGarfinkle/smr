from patternfinder.geometric_helsinki.indexer import intra_vectors
from patternfinder.geometric_helsinki.dpwc import search_scores

def search_controller(input_type, query_string, music_files):
    indexed_query = intra_vectors(query_string, dest="str", window=1)
    print("searching \n{}\n{}".format(indexed_query, music_files))
    return search_scores(indexed_query, music_files)

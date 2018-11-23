import logging

from smr_search.indexers import legacy_intra_vectors
from smr_search.dpwc import search_scores

logger = logging.getLogger("flask.app")

def search_controller(music_encoding, query_string, dataloc):
    indexed_query = legacy_intra_vectors(query_string, window=1)
    logger.debug("Indexed query to:\n{}".format(str(indexed_query)))
    logger.info("controllers.search::search_controler() --- searching in {1} for \n{0}".format(query_string, dataloc))
    return search_scores(indexed_query, dataloc)

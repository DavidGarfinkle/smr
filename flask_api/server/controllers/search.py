import logging
import music21

from flask import Response, request

from smr_search.indexers import legacy_intra_vectors
from smr_search.dpwc import search_scores, paginate
from server.exceptions import BadQueryError

logger = logging.getLogger("flask.app")

def search_controller(music_encoding, query_string, dataloc):
    query = music21.converter.parse(query_string)

    if len(query.flat.notes) < 3:
        raise BadQueryError("Query must be at least three notes long!")

    indexed_query = legacy_intra_vectors(query, window=1)
    logger.debug("Indexed query to:\n{}".format(str(indexed_query)))
    logger.info("controllers.search::search_controler() --- searching in {1} for \n{0}".format(query_string, dataloc))
    results = search_scores(indexed_query, dataloc)
    #return paginate(results, page_length = 10, threshold = request.args.get('threshold'), window = request.args.get('sourceWindow'))
    return paginate(results, page_length = 10, threshold = 1, window = 3)

import logging
import music21

from flask import Response, request, url_for

from smr_search.indexers import legacy_intra_vectors, NotePointSet
from smr_search.dpwc import search_scores, paginate, filter_results, rank_results
from server.exceptions import BadQueryError

logger = logging.getLogger("flask.app")

def search_controller(music_encoding, query_string, dataloc):
    query = music21.converter.parse(query_string)
    window = int(request.args.get("maxTargetWindow"))
    threshold = int(request.args.get("minOccLength"))
    transposition = int(request.args.get("transposition"))

    if len(query.flat.notes) < 3:
        raise BadQueryError("Query must be at least three notes long!")

    indexed_query = legacy_intra_vectors(query, window=1)
    logger.debug("Indexed query to:\n{}".format(str(indexed_query)))
    logger.info("controllers.search::search_controler() --- searching in {1} for \n{0}".format(query_string, dataloc))
    results = search_scores(indexed_query, dataloc)

    filtered_results = filter_results(results, threshold = threshold, query_length = len(NotePointSet(query)), transposition = transposition)
    ranked_results = rank_results(results)

    for r in results:
        attach_excerpt_url(r)

    return paginate(ranked_results, page_length = 10)
    #return results

def attach_excerpt_url(result):
    result['excerptUrl'] = url_for('get_piece', piece_name = result['piece'], n = ",".join(str(x) for x in result['targetNotes']), c = 'red')

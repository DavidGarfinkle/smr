import sys
import os
import music21

from flask import current_app as app

def piece_excerpt_svg():
    """
    Backend render with verovio
    """
    pass

def highlighted_excerpt_xml(piece_name, note_indices, color):
    """
    Provide an excerpt, highlighted excerpt, or entire piece from the database
    """
    from smr_search.indexers import NotePointSet
    from io import StringIO

    score = music21.converter.parse(os.path.join(app.config["PALESTRINA_XML"], "{}.mid.xml".format(piece_name)))
    pointset = list(NotePointSet(score).flat.notes)

    pointset_indices = [int(i) for i in note_indices]
    score_note_ids = [pointset[i].original_note_id for i in pointset_indices]

    # Get stream excerpt
    _, start_measure = score.beatAndMeasureFromOffset(pointset[pointset_indices[0]].offset)
    _, end_measure = score.beatAndMeasureFromOffset(pointset[pointset_indices[-1]].offset + pointset[-1].duration.quarterLength - 1)
    excerpt = score.measures(numberStart=start_measure.number, numberEnd=end_measure.number)

    # Colour notes
    for note in excerpt.flat.notes:
        if note.id in score_note_ids:
            note.style.color = color

    # Delete part names (midi files have bad data)
    for part in excerpt:
        part.partName = ''

    sx = music21.musicxml.m21ToXml.ScoreExporter(excerpt)
    musicxml = sx.parse()

    bfr = StringIO()
    sys.stdout = bfr
    sx.dump(musicxml)
    output = bfr.getvalue()
    sys.stdout = sys.__stdout__

    return output

import csv
import io
import music21
import pandas as pd
import numpy as np

us = music21.environment.UserSettings()
us.restoreDefaults()

def csv_notes(xml_input_path: str, dest: str = ''):
    stream = music21.converter.parse(xml_input_path)
    ps = NotePointSet(stream)

    if not dest:
        dest = xml_input_path + '.notes'

    with open(dest, 'w', newline='') as f:
        csv_writer = csv.writer(f, delimiter=',')
        csv_writer.writerow([len(ps.flat.notes)])
        for n in ps.flat.notes:

            csv_writer.writerow([n.offset, n.pitch.ps])

    return dest

def note_indexer(note):
    return {
        'offset': note.offset,
        'pitch-chr': note.pitch.ps,
        'pitch-dia': note.pitch.diatonicNoteNum,
        'pitch-b40': music21.musedata.base40.pitchToBase40(note),
        'pitch-hz': note.pitch.frequency
    }


def pandas_intra_vectors(piece):
    score = music21.converter.parse(piece)
    notes = list(NotePointSet(score))
    indexed_notes = (note_indexer(n) for n in notes)

    df = pd.DataFrame(indexed_notes)

    intervals = []
    for window in range(1, 21):
        vectors = df.diff(periods = window)
        vectors['window'] = window

        vectors['x'] = vectors['offset']
        vectors['y'] = vectors['pitch-chr']
        vectors['startIndex'] = vectors.index - window
        vectors['endIndex'] = vectors.index
        vectors['startPitch'] = df['pitch-chr']
        vectors['endPitch'] = df['pitch-chr'].shift(window)

        intervals.append(vectors.dropna())

    return pd.concat(intervals, axis=0).sort_values(by=["offset", "pitch-hz"])


def df_to_csv(df):

    file_obj = io.StringIO()

    csv_writer = csv.writer(file_obj, delimiter=',')
    csv_writer.writerow(['x', 'y', 'startIndex', 'endIndex', 'startPitch', 'endPitch', 'diatonicDiff', 'chromaticDiff'])
    csv_writer.writerow([len(set(df.index))])
    csv_writer.writerow([len(df.index)])
    for v in vectors:
        csv_writer.writerow([v.x, v.y, v.noteStartIndex, v.noteEndIndex,
                             v.noteStart.pitch.ps,
                             v.noteEnd.pitch.ps,
                             v.noteEnd.pitch.diatonicNoteNum - v.noteStart.pitch.diatonicNoteNum,
                             int(v.noteEnd.pitch.ps - v.noteStart.pitch.ps)])

    output = file_obj.getvalue()
    file_obj.close()
    return output


def intra_vectors(xml_input_path: str, dest: str = '', window = 15):

    my_finder = Finder(music21.stream.Stream(), xml_input_path,
            threshold = 'all',
            pattern_window = 1,
            source_window = window,
            scale = 'warped')
            #interval_func = 'generic')

    notes = list(my_finder.sourcePointSet)
    vectors = my_finder.sourcePointSet.intra_vectors

    if dest == 'str':
        file_obj = io.StringIO()
    else:
        file_obj = open(dest or (xml_input_path + '.vectors'))

    csv_writer = csv.writer(file_obj, delimiter=',')
    csv_writer.writerow(['x', 'y', 'startIndex', 'endIndex', 'startPitch', 'endPitch', 'diatonicDiff', 'chromaticDiff'])
    csv_writer.writerow([len(notes)])
    csv_writer.writerow([len(vectors)])
    for v in vectors:
        csv_writer.writerow([v.x, v.y, v.noteStartIndex, v.noteEndIndex,
                             v.noteStart.pitch.ps,
                             v.noteEnd.pitch.ps,
                             v.noteEnd.pitch.diatonicNoteNum - v.noteStart.pitch.diatonicNoteNum,
                             int(v.noteEnd.pitch.ps - v.noteStart.pitch.ps)])

    output = file_obj.getvalue() if dest == "str" else dest
    file_obj.close()
    return output

def music21Chord_to_music21Notes(chord):
    """
    For internal use in NotePointSet()

    CHORD TO LIST OF NOTES FOR USE IN music21.stream.insert()
    For serious flattening of the score into a 2-d plane of horizontal line segments.
    music21.note.Note and music21.chord.Chord subclass the same bases,
    so in theory it shoud look something like this...

    NOTE: this will screw up the coloring since music21 doesn't support coloring just
    one note of a chord (I don't think?), so as a compromise I'll just color the whole chord.
    """
    note_list = []
    for pitch in chord.pitches:
        note = music21.note.Note(pitch)

        # Music21Object.mergeAttributes gets the 'id' and 'group' attributes
        note.mergeAttributes(chord)

        # note essentials
        note.duration = chord.duration
        note.offset = chord.offset

        note_list.append(note)

        note.derivation.origin = chord
        note.derivation.method = 'chord_to_notes'
    return note_list

class NotePointSet(music21.stream.Stream):
    """
    A container for the notes of a music21 parsed score.
    Pre-processes the data by flattening the chords and sorting the notes.

    Expects a stream to process
    Optionally can be flagged to sort by offset (note release) rather than the default onset (note attack)

    music21.stream.Stream does not allow any required arguments in its __init__, so every argument must be optional.
    """
    def __init__(self, score=music21.stream.Stream(), offsetSort=False, *args, **kwargs):
        super(NotePointSet, self).__init__()
        # Set the derivation for this PointSet
        self.derivation.method = 'NotePointSet()'
        self.derivation.origin = score

        # If we have None input, return an empty stream
        if not score:
            return

        # Sorting key for the NotePointSet: sort lexicographicaly by tuples of:
        #    1) either note onset (attack) or note offset (release)
        #    2) note frequency
        #        -- Since this is the most finely-grained pitch information possible,
        #        the list will still be sorted under any subsequent pitch equivalence
        #        (such as pitch class or enharmonic equivalence)
        sort_keyfunc = lambda n: ((n.offset + n.duration.quarterLength, n.pitch.frequency)
                if offsetSort else (n.offset, n.pitch.frequency))

        # Get each note or chord, convert it to a tuple of notes, and sort them by the keyfunc
        new_notes = []
        for note in score.flat.notes:
            to_add = music21Chord_to_music21Notes(note)
            # Use .original_note instead of derivation chains. It has to be consistent:
            # you can't be checking different derivations for notes which came from chords
            # versus notes which were not derived. If for example a source was transposed
            # (like in the test cases), the derivation will be non-empty, which screws up
            # the decision making for occurrences later on.
            for n in to_add:
                n.original_note_id = note.id
            new_notes.extend(to_add)
        new_notes.sort(key=sort_keyfunc)

        # Make sure to turn off stream.autoSort, since streams automatically sort on insert by
        # an internal sortTuple which prioritizes note onset (attack)
        self.autoSort = False
        for n in new_notes:
            self.insert(n)


if __name__ == "__main__":
    df = pandas_intra_vectors("/usr/share/smr-db/palestrina-masses-xml/Ad_fugam_Credo_4.mid.xml")

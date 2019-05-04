import music21
import pandas as pd
from itertools import combinations, product
from smr_search.indexers import note_index

def normalize(basis, window):
    left, right = basis
    normalized_window = window.copy().drop(left)

    if window.loc[left].offset != window.loc[right].offset:
        normalized_window['offset'] = window['offset'].apply(lambda o: o / window.loc[right]['offset'])
    normalized_window['pitch-b40'] = window['pitch-b40'].apply(lambda p: p - window.loc[left]['pitch-b40'])

    return normalized_window

def binify(normalized_windows, w_size):

    bins = {}
    for nm in normalized_windows:
        basis, window = nm
        for index, row in window.iterrows():
            o = row['offset']
            p = row['pitch-b40']
            newbin = bins.get((o, p), []) + [basis]
            bins[(o, p)] = newbin

    return bins

def preprocess(piece):
    score = music21.converter.parse(piece)
    df = note_index(score)
    windows = [df.loc[i:i+w_size, ('offset', 'pitch-b40')] for i in range(len(df))]
    normalized_windows = [(basis, normalize(basis, w)) for w in windows for basis in combinations(w.index, 2)]

    return normalized_windows



def query_hausdorff(pattern, p_window, target_bins):
    p_bins = time_scaled_bins(pattern, p_window)

    m21_pattern = music21.converter.parse(piece)
    df_pattern = note_index(score)

    match_set = {}

    normalized_patterns = [normalize(basis, df) for basis in product(df.index)]
    for (basis, nm_pattern) in normalized_patterns:
        for note in nm_pattern.loc[:, ('offset', 'pitch-b40')]:
            for label in target_bins[(note.offset, note.pitch)]:
                newset = match_set.get(label, []) + [note]
                match_set[label] = newset

    return {key: val for key, val in match_set.items() if len(val) > 2}

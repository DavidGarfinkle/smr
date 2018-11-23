import sys
import os
import io
import json
import logging
import tqdm

from subprocess import Popen, PIPE, call, check_output
from multiprocessing import Pool

flask_logger = logging.getLogger("flask.app")

#w_path = "/app/patternfinder/patternfinder/geometric_helsinki/_w"
w_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), os.path.pardir, "_w")

def w_wrapper(pattern, target):
    #ps = Popen([w_path, '--stream', target], stdin=PIPE, stdout=PIPE, stderr=PIPE, universal_newlines=True)
    #output, _ = ps.communicate(input=pattern)

    #todo capture stdout
    args = "echo '{}' | {} --stream {}".format(pattern, w_path, target)
    output = str(check_output(args, shell=True), encoding='utf-8')

    #print("output " + output)


    return output

def search(pattern_str, mass_path):
    mass_vector_path = mass_path
    #print("Processing " + mass_path)
    result = w_wrapper(
        pattern=pattern_str,
        target='"{}"'.format(mass_vector_path))
    result = json.loads(result)
    #print("RESULT\n" + str(result))
    if result:
        # Result is a JSON list of objects
        for occ in result:
            # mass is a path which ends in the XML file of that mass
            occ['mass'] = mass_path.split('/')[-1].split('.')[0]
            occ['loaded'] = False
    return result

def search_scores(pattern_str, palestrina_path):

    flask_logger.info("Searching in path: {}".format(palestrina_path))
    masses = [os.path.join(palestrina_path, m) for m in os.listdir(palestrina_path)]
    #print(len(masses))

    #with Pool(2) as p:
    #    response = [occ for sublst in p.starmap(search, zip([pattern_path] * len(masses), masses)) for occ in sublst]
    masses = tqdm.tqdm(masses)
    response = [occ for sublst in [search(pattern_str, mass) for mass in masses] for occ in sublst]

    return response or []

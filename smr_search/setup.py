from distutils.core import setup

setup(name='smr_search',
        version='0.1dev',
        description='Python package for indexed music retrieval',
        author='David Garfinkle',
        author_email='david.garfinkle@mail.mcgill.ca',
        url='https://github.com/davidgarfinkle/smr/',
        packages=['smr_search.indexers', 'smr_search.tests']
        )

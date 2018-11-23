from distutils.core import setup

setup(name='smr_flask',
        version='0.1dev',
        description='Flask appliction serving a RESTful API to an indexed music database',
        author='David Garfinkle',
        author_email='david.garfinkle@mail.mcgill.ca',
        url='https://github.com/davidgarfinkle/smr/',
        packages=['server']
        )

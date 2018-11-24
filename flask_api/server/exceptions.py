class SMRError(Exception):
    """
    Base class for smr-flask exceptions
    """

class BadQueryError(SMRError):
    """
    Thrown for bad (e.g. missing, unsupported length / value) query parameters
    """
    def __init__(self, msg):
        self.html_response = msg
        self.error_log = msg
        self.status_code = 400

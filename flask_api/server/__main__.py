import argparse
from server.application import app

def main(host, port):
    app.run(host=host, port=port, debug=True)

if __name__ == "__main__":

    parser = argparse.ArgumentParser("Run the Flask api server")
    parser.add_argument("--port", type=int,
                        default=8000,
                        help="communicate over this port")
    parser.add_argument("--host", type=str,
                        default="132.206.14.238",
                        help="hostname for this server")

    args = parser.parse_args()

    main(args.host, args.port)

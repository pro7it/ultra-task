#!/bin/sh

set -e

/opt/venv/bin/python database.py
/opt/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8080
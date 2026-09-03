#!/bin/sh

apk add --no-cache python3 py3-pip
python3 -m venv /opt/venv
/opt/venv/bin/pip install --no-cache-dir -r requirements.txt
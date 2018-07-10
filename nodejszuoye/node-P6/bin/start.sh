#!/bin/bash
echo "server start"
nohup node server.js >> ./server.log 2>&1 &

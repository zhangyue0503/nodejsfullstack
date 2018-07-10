#!/bin/bash
rm -rf ../blog-backup
cp -r ../node-P6 ../blog-backup
git pull
bin/stop.sh
bin/start.sh
#!/bin/sh
git pull https://github.com/sruthiashvi/blog_frontend.git
git log --since="2 months ago" --pretty=format:'%h,%an,%ar,%s' > testlog.csv


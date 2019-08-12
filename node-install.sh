#!/bin/bash

apt-get update
apt-get install curl

curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
apt install nodejs

node -v
npm -v

npm install -g pm2
pm2 -v

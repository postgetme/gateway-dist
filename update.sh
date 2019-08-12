#!/bin/bash

rm -rf update
git clone https://github.com/postgetme/gateway-dist update
cp -r update/main/* main/
cp -r update/web/* web/
pm2 reload all

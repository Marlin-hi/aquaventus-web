#!/bin/bash
cd /home/aquaventus-web
git pull origin master
npm ci --production
npm run build
pm2 restart aquaventus-web
echo "Deploy done at $(date)"

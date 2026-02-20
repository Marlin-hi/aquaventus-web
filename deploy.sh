#!/bin/bash
cd /home/aquaventus-web
git pull origin master
npm ci
npm run build
npx pm2 restart aquaventus-web
echo "Deploy done at $(date)"

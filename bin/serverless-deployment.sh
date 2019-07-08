#!/bin/bash

APP_STAGE="staging"

if [ "$TRAVIS_BRANCH" == "master" ]; then
  APP_STAGE="production"
fi

if [ "$TRAVIS_BRANCH" == "master" ] || [ "$TRAVIS_BRANCH" == "develop" ]; then
  sed -i "s|local|$APP_STAGE|g" $TRAVIS_BUILD_DIR/serverless.yml

  npm install serverless --global

  serverless deploy --stage $APP_STAGE
fi

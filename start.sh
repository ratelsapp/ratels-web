#!/bin/bash
# vessel install
# staking idlFactory
network=$1

if [ $network = "test" ]
then
cp -R ./env.test ./.env

elif [ $network = "ic" ]
then
cp -R ./env.production ./.env

elif [ $network = "local" ]
then
cp -R ./env.local ./.env

else
cp -R ./env.local ./.env
fi

# locales
yarn i18n:extract


yarn start

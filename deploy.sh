#!/bin/bash

network=$1

deploy_test() {
  echo "Deploying test..."
  cp -R ./env.test ./.env

  dfx identity use icp-dog
  yarn run i18n:extract
  yarn run i18n:compile

  if [ -f "../dog_staking/canister_ids.json" ]
  then
  cp ../dog_staking/canister_ids.json .vessel/staking/master/
  fi

  echo "start deploy"

  dfx deploy --network=test --no-wallet --with-cycles=9999999999999999999
}

deploy_pro() {
  echo "Deploying pro..."
  dfx identity use icp-dog

  yarn run i18n:extract
  yarn run i18n:compile
  dfx deploy --wallet=ek6ku-qiaaa-aaaaj-aadvq-cai --network=ic
}

if [ $network = "test" ]
then
deploy_test

elif [ $network = "pro" ]
then
deploy_pro

else
  dfx deploy --network=local
fi

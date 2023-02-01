#!/bin/bash

network=$1

deploy() {
  dfx identity use ratels

  yarn run i18n:extract
  yarn run i18n:compile
  dfx deploy --network=$network
}

deploy

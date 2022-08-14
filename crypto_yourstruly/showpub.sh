#!/bin/bash

if [ $# -eq 0 ];
    then
        echo "please input public key file name"
        echo "example: showpub.sh pubkey.pem"
        exit 1
fi
PUBKEY=$1
if [[ ! -f "$PUBKEY" ]]
    then
        echo "$PUBKEY doesn't exist."
        exit 1
fi
HEX_MODULUS=$(openssl rsa -pubin -in $PUBKEY -modulus | grep 'Modulus=' |  cut -d'=' -f 2)
openssl rsa -pubin -inform PEM -text -noout < $PUBKEY | grep Exponent
ruby<<EOF
p "$HEX_MODULUS".to_i(16).to_s(10)
EOF
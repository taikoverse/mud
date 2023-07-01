#!/bin/sh

set -eou pipefail

if [ "$FAUCET_DEV_MODE" == "true" ]; then
    /service/faucet \
        -ws-url ${WS_URL} \
        -faucet-private-key ${FAUCET_PK} \
        -dev \
        -metrics-port ${FAUCET_METRICS_PORT}
else
    /service/faucet \
        -ws-url ${WS_URL} \
        -faucet-private-key ${FAUCET_PK} \
        -metrics-port ${FAUCET_METRICS_PORT}

fi

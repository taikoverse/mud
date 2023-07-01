#!/bin/sh

set -eou pipefail

/service/ecs-relay \
    -ws-url ${WS_URL} \
    -metrics-port ${RELAY_METRICS_PORT} \
    -idle-timeout-time ${IDLE_TIMEOUT_TIME} \
    -idle-disconnect-interval ${IDLE_DISCONNECTION_INTERVAL}
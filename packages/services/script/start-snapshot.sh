#!/bin/sh

set -eou pipefail

/service/ecs-snapshot \
    -ws-url ${WS_URL} \
    -block ${SNAPSHOT_START_BLOCK} \
    -worldAddresses ${WORLD_ADDRESS} \
    -metrics-port ${SNAPSHOT_METRICS_PORT}
#!/bin/sh

set -eou pipefail

/service/ecs-stream \
    -ws-url ${WS_URL} \
    -metrics-port ${STREAM_METRICS_PORT}
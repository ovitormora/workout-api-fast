#!/bin/bash

# Run database migrations
alembic upgrade head

# Execute the command passed to the docker container
exec "$@"

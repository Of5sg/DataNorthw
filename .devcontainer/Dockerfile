# Use the latest Ubuntu base image
FROM ubuntu:jammy
# Install PostgreSQL
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install -y --no-install-recommends \
       postgresql postgresql-contrib \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /workspaces/DataNorthw &&\
    chown -R root:root /workspaces/DataNorthw

# Set environment variables
ENV LANG="C.UTF-8"

# Keep the container alive
CMD ["sleep", "infinity"]
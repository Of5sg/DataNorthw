FROM ubuntu:focal

RUN apt-get update

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install -y --no-install-recommends \
    software-properties-common

RUN add-apt-repository universe

ENV lang="C.UTF-8"

RUN apt-get install -y postgresql postgresql-contrib

RUN apt-get clean -y && rm -rf /tmp/scripts

# VOLUME ["/var/lib/docker"] 

CMD ["sleep", "infinity"]

# apt-get install -y postgresql postgresql-contrib

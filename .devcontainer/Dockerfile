RUN apt-get update \
    && apt-get upgrade -y \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recomends\
    make\
    unzip\
    libpq-dev\
    && rm -rf /var/lib/apt/lists/*\
    && apt-get update\
    && apt-get upgrade -y\
    && add-apt-repository universe\
    && rm -rf /var/lib/apt/lists/*

ENV SHELL = /bin/bash\
            DOCKER_BUILDKIT=1

RUN apt-get clean -y && rm -rf /tmp/scripts

VOLUME ["/var/lib/docker"]

CMD ["sleep", "infinity"]
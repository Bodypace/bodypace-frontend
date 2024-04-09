# syntax=docker/dockerfile:1
FROM node:20-bookworm as base
WORKDIR /src
RUN --mount=type=cache,target=/root/.npm/_cacache/ \
    --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    npm ci --loglevel verbose && \
    mv node_modules /tmp/node_modules
RUN --mount=type=cache,target=/root/.npm/_cacache/ \
    --mount=type=bind,target=.,rw \
    mv /tmp/node_modules node_modules && \
    npm run build && \
    mv .next /tmp/.next
RUN --mount=type=cache,target=/root/.npm/_cacache/ \
    --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    npm ci --loglevel verbose --omit dev && \
    mv node_modules /tmp/node_modules

FROM node:20-bookworm AS prod
ARG USER_GID=100
# by default node:20-alpine has user `node` with GID 1000 which does not match the GID of my host user,
# there is AFAIK no command in Alpine Linux / BusyBox that will change the primary GID of an existing user
RUN sed -i -r "s/^(node:x:1000:)(1000)(:.*)/\1$USER_GID\3/" /etc/passwd
USER node
WORKDIR /app
COPY --from=base --chown=node /tmp/node_modules node_modules/
COPY --from=base --chown=node /tmp/.next .next/
COPY --chown=node public public
COPY --chown=node LICENSE LICENSE
COPY --chown=node next.config.js next.config.js
RUN rm public/mockServiceWorker.js
ENTRYPOINT [ "npx", "next", "start" ]

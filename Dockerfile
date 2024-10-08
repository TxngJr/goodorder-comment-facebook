FROM node:18.16.0-alpine3.18 as installer
WORKDIR /app
COPY . .
RUN npm i -g pnpm

ENV NODE_OPTIONS="--max-old-space-size=4096"

# Setup environment before building
ARG REACT_APP_GOOGLE_RECAPTCHA_SITEKEY
ARG REACT_APP_GOOGLE_RECAPTCHA_SECRETKEY
ARG REACT_APP_API_SERVICE
ARG REACT_APP_API_FORMAT_ADDRESS_URL
ARG REACT_APP_API_FORMAT_ADDRESS_TOKEN
ARG REACT_APP_CHAT_FACE
ARG REACT_APP_API_FORMAT_PROVINCE_URL
ARG REACT_APP_PUSHER_CHAT_FACEBOOK_KEY
ARG REACT_APP_PUSHER_CHAT_FACEBOOK_CLUSTER

ENV REACT_APP_GOOGLE_RECAPTCHA_SITEKEY=${REACT_APP_GOOGLE_RECAPTCHA_SITEKEY}
ENV REACT_APP_GOOGLE_RECAPTCHA_SECRETKEY=${REACT_APP_GOOGLE_RECAPTCHA_SECRETKEY}
ENV REACT_APP_API_SERVICE=${REACT_APP_API_SERVICE}
ENV REACT_APP_API_FORMAT_ADDRESS_URL=${REACT_APP_API_FORMAT_ADDRESS_URL}
ENV REACT_APP_API_FORMAT_ADDRESS_TOKEN=${REACT_APP_API_FORMAT_ADDRESS_TOKEN}
ENV REACT_APP_CHAT_FACE=${REACT_APP_CHAT_FACE}
ENV REACT_APP_API_FORMAT_PROVINCE_URL=${REACT_APP_API_FORMAT_PROVINCE_URL}
ENV REACT_APP_PUSHER_CHAT_FACEBOOK_KEY=${REACT_APP_PUSHER_CHAT_FACEBOOK_KEY}
ENV REACT_APP_PUSHER_CHAT_FACEBOOK_CLUSTER=${REACT_APP_PUSHER_CHAT_FACEBOOK_CLUSTER}

RUN pnpm install
RUN pnpm build

FROM nginx:alpine as runner
COPY --from=installer /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=installer /app/build /usr/share/nginx/html/

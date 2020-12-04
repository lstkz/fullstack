FROM node:14-alpine

WORKDIR /usr/app

COPY yarn.lock yarn.lock
COPY package.json package.json
COPY apps/api/package.json apps/api/package.json
COPY apps/front/package.json apps/front/package.json
COPY packages/config/package.json packages/config/package.json
COPY packages/contract/package.json packages/contract/package.json
COPY packages/deploy/package.json packages/deploy/package.json
COPY packages/email-templates/package.json packages/email-templates/package.json
COPY packages/fullstack-cli/package.json packages/fullstack-cli/package.json
COPY packages/schema/package.json packages/schema/package.json
COPY packages/shared/package.json packages/shared/package.json
COPY packages/ui/package.json packages/ui/package.json

RUN yarn

COPY . .

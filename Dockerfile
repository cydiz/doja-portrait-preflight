FROM node:22-alpine
WORKDIR /tool
COPY core.js cli.cjs ./
USER node
ENTRYPOINT ["node","/tool/cli.cjs"]

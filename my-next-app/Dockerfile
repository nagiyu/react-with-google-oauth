FROM node:20 AS base

ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG LINE_CHANNEL_ID
ARG LINE_CHANNEL_SECRET

FROM base AS builder

WORKDIR /app

COPY . .

RUN npm install && \
    npm run build

FROM base AS runner

COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.9.1 /lambda-adapter /opt/extensions/lambda-adapter

ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
ENV GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
ENV LINE_CHANNEL_ID=${LINE_CHANNEL_ID}
ENV LINE_CHANNEL_SECRET=${LINE_CHANNEL_SECRET}

ENV AWS_LWA_PORT=3000

WORKDIR /app

COPY --from=builder /app/.next/standalone ./

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

CMD ["node", "server.js"]

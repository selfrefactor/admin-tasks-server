## server:dark

Start server with dark themes

```bash
CRON=25 NIKETA_DARK=ON node dist/main.js
```

## server:light

Start server with light themes

```bash
CRON=30 node dist/main.js
```

## server:dark:work

Start server with dark themes and NGROK pointed at work related port

```bash
WORK=ON CRON=25 NIKETA_DARK=ON node dist/main.js
```

## server:light:work

Start server with dark themes and NGROK pointed at work related port

```bash
WORK=ON CRON=30 node dist/main.js
```

## docker

```bash
cd $HOME/repos/docker&&./up.sh
```

## niketa

```bash
cd $HOME/repos/niketa/packages/node&&node start.js
```

## books

```bash
jest lambdas/populate-speed-reader/populate-speed-reader.spec.ts
```

## on:light

Run tasks `docker`, `niketa` and `server:light` in parallel.

## on

Run tasks `docker`, `niketa` and `server:dark` in parallel.

## on:work

Run tasks `docker`, `niketa` and `server:dark:work` in parallel.

## on:light:work

Run tasks `docker`, `niketa` and `server:light:work` in parallel.
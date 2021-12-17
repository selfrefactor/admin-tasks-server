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

## docker

```bash
cd $HOME/repos/docker&&./up.sh
```

## niketa

'run niketa'

```bash
cd $HOME/repos/niketa/packages/node-ts/dist/src&&node start.js
```

## on:light

Run tasks `niketa` and `server:light` in parallel.

## on:light:ref

Run tasks `docker`, `niketa` and `server:light` in parallel.

## on

Run tasks `niketa` and `server:dark` in parallel.

## on:ref

Run tasks `docker`, `niketa` and `server:dark` in parallel.

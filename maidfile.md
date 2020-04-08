## server:dark

Start server with dark themes

```bash
CRON=15 NIKETA_DARK=ON node dist/main.js
```

## server:light

Start server with light themes

```bash
CRON=7 node dist/main.js
```

## docker

```bash
cd $HOME/repos/docker&&./up.sh
```

## niketa:client

```bash
cd $HOME/repos/niketa/packages/node&&node start.js
```

## niketa:electron

Run tasks `niketa:electron:recalculate` before this

```bash
cd $HOME/repos/niketa/packages/electron&&yarn prod
```

## niketa:electron:recalculate

```bash
cd $HOME/repos/niketa/packages/electron&&node recalculate.js
```

## niketa

Run tasks `niketa:client` and `niketa:electron` in parallel.

## on

Run tasks `docker`, `niketa` and `server:light` in parallel.

## on:dark

Run tasks `docker`, `niketa` and `server:dark` in parallel.

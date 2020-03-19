## server:dark

Start server with dark themes

```bash
NGROK=ON CRON=15 NIKETA_DARK=ON node dist/main.js
```

## server:light

Start server with light themes

```bash
NGROK=ON CRON=5 node dist/main.js
```

## docker

```bash
cd $HOME/repos/docker&&./up.sh
```

## niketa:node:a

```bash
cd $HOME/repos/niketa/packages/node&&node ant
```

## niketa:node:b

```bash
cd $HOME/repos/niketa/packages/node&&node bee
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

## niketa:simple

Run tasks `niketa:node:a` and `niketa:node:b` in parallel.

## niketa

Run tasks `niketa:node:a`, `niketa:node:b`, and `niketa:electron` in parallel.

## lint

```bash
prettier --no-semi --no-bracket-spacing --print-width 100 --single-quote --no-bracket-spacing --trailing-comma es5 --write "src/**/*.ts" "test/**/*.ts"
```

## on

Run tasks `docker`, `niketa` and `server:light` in parallel.

## on:dark

Run tasks `docker`, `niketa` and `server:dark` in parallel.

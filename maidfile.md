## server:dark

Start server with dark themes

```bash
CRON=25 NIKETA_DARK=ON node dist/main.js
```

## server

Start server with dark themes

```bash
CRON=25 node dist/main.js
```

## teacher

```bash
cd $HOME/repos/secret-services/packages/bot-teacher/server && node index.js
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

## niketa:debug

'run niketa'

```bash
cd $HOME/repos/niketa/packages/node-ts/dist/src&& NIKETA_CLIENT_EXTENDED_LOG=ON node start.js
```

## on

Run tasks `niketa` and `server` in parallel.

## onx

Run tasks `niketa`, `teacher` and `server` in parallel.

## on:dark

Run tasks `niketa` and `server:dark` in parallel.

## onx:dark

Run tasks `niketa`, `teacher` and `server:dark` in parallel.

## on:debug

Run tasks `niketa:debug` and `server:dark` in parallel.

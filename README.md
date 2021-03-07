# HASSO — idiomatic Home Assistant NodeJS Bindings 🐕

Current state: experimental/under development.

## REST API

Class [`HomeAssistant`](src/HomeAssistant.ts) provides access to [Home Assistant's REST API](https://developers.home-assistant.io/docs/api/rest/). 
                      
## Websocket API

Wraps [home-assistant-js-websocket](https://www.npmjs.com/package/home-assistant-js-websocket) to provide easy and idiomatic access via NodeJS by providing a [typed event-emitter](https://github.com/bterlson/strict-event-emitter-types).


## Examples

Run examples either via [nodemon](https://www.npmjs.com/package/nodemon) (during development to watch for changes) or via [ts-node](https://www.npmjs.com/package/ts-node) directly.

The examples expect the environment variable `HASS_TOKEN` and `HASS_URL` to be set. With [direnv](https://direnv.net/) the proper values may be set into a local `.envrc` file:

```shell
# copy the example file
$ cp .envrc.local{.sample,}
# set custom values
$ $EDITOR .envrc.local
# if not yet done, allow the .envrc file
$ direnv allow
```

### ts-node

```shell
$ cd examples
$ ts-node index.ts
```

### nodemon

To make nodemon/ts-node work with typescript project references and also watching changes in src, calling nodemon is a bit counter-intuitive. It needs to be called in project-root, but the `examples` path needs to be omitted.         

```shell
$ nodemon services.ts
$ nodemon tags.ts
```

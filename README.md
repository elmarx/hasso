# HASSO — idiomatic Home Assistant NodeJS Bindings 🐕

Current state: experimental/under development.

## REST API

Class [`HomeAssistant`](./src/api/HomeAssistant.ts) provides access to [Home Assistant's REST API](https://developers.home-assistant.io/docs/api/rest/). 
                      
## Websocket API

Wraps [home-assistant-js-websocket](https://www.npmjs.com/package/home-assistant-js-websocket) to provide easy and idiomatic access via NodeJS by providing a [typed event-emitter](https://github.com/bterlson/strict-event-emitter-types).



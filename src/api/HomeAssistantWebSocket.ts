import { Connection } from "home-assistant-js-websocket";
import EventEmitter from "events";
import { Event, HassEvents } from "./events";
import assert from "assert";
import StrictEventEmitter from "strict-event-emitter-types";

export type HassEventEmitter = StrictEventEmitter<EventEmitter, HassEvents>;

type SubscriptionUnsubscribe = () => Promise<void>;

// TBH: I don't now exactly how it works, but the `EventEmitter as…` part takes care to expose a stricter interface
// than 'EventEmitter', more precisely the StrictEventEmitter. See https://github.com/bterlson/strict-event-emitter-types#usage-with-subclasses
export class HomeAssistantWebSocket extends (EventEmitter as {
  new (): HassEventEmitter;
}) {
  private readonly eventSubscriptions: Map<
    Event,
    SubscriptionUnsubscribe
  > = new Map();
  private readonly ee: EventEmitter;

  constructor(private connection: Connection) {
    super();

    this.ee = this;

    // upon first listener, subscribe to the websocket
    this.ee.on("newListener", async (eventName: Event) => {
      if (!this.eventSubscriptions.has(eventName)) {
        const unsubscribe = await this.connection.subscribeEvents(
          this.callback(eventName),
          eventName,
        );
        this.eventSubscriptions.set(eventName, unsubscribe);
      }
    });

    // upon listener removal, unsubscribe if no listeners remain
    this.ee.on("removeListener", async (eventName: Event) => {
      if (this.listenerCount(eventName) === 0) {
        const unsubscribe = this.eventSubscriptions.get(eventName);
        assert(unsubscribe);

        await unsubscribe();
      }
    });
  }

  private callback(eventName: Event) {
    return (payload: any) => this.ee.emit(eventName, payload);
  }

  public close(): void {
    return this.connection.close();
  }
}

import { Connection } from "home-assistant-js-websocket";
import EventEmitter from "events";
import { Event, HassEvents } from "./events";
import assert from "assert";
import StrictEventEmitter from "strict-event-emitter-types";

export type HassEventEmitter = StrictEventEmitter<EventEmitter, HassEvents>;

type SubscriptionUnsubscribe = () => Promise<void>;

export class HomeAssistantWs extends EventEmitter {
  private readonly eventSubscriptions: Map<
    Event,
    SubscriptionUnsubscribe
  > = new Map();

  constructor(private connection: Connection) {
    super();

    // upon first listener, subscribe to the websocket
    this.on("newListener", async (eventName: Event) => {
      if (!this.eventSubscriptions.has(eventName)) {
        const unsubscribe = await this.connection.subscribeEvents(
          this.callback(eventName),
          eventName,
        );
        this.eventSubscriptions.set(eventName, unsubscribe);
      }
    });

    // upon listener removal, unsubscribe if no listeners remain
    this.on("removeListener", async (eventName: Event) => {
      if (this.listenerCount(eventName) === 0) {
        const unsubscribe = this.eventSubscriptions.get(eventName);
        assert(unsubscribe);

        await unsubscribe();
      }
    });
  }

  private callback(eventName: Event) {
    return (payload: any) => this.emit(eventName, payload);
  }
}

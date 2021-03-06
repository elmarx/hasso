import { Connection } from "home-assistant-js-websocket";
import {
  DeviceRegistryEntry,
  HassEvent,
  HassEvents,
  RelatedResult,
} from "./model";
import assert from "assert";
import StrictEventEmitter from "strict-event-emitter-types";
import { Try, tryF } from "ts-try";
import EventEmitter from "events";
import { reviveEvent } from "./core/revive";
import { defer } from "./utils/deferred";

export type HassEventEmitter = StrictEventEmitter<EventEmitter, HassEvents>;

type SubscriptionUnsubscribe = () => Promise<void>;

export type ItemType =
  | "area"
  | "automation"
  | "config_entry"
  | "device"
  | "entity"
  | "group"
  | "scene"
  | "script";

// TBH: I don't now exactly how it works, but the `EventEmitter as…` part takes care to expose a stricter interface
// than 'EventEmitter', more precisely the StrictEventEmitter. See https://github.com/bterlson/strict-event-emitter-types#usage-with-subclasses
export class HomeAssistantWebSocket extends (EventEmitter as {
  new (): HassEventEmitter;
}) {
  private readonly eventSubscriptions: Map<
    HassEvent,
    SubscriptionUnsubscribe
  > = new Map();
  private readonly ee: EventEmitter;

  constructor(private connection: Connection) {
    super();

    this.ee = this;

    // upon first listener, subscribe to the websocket
    this.ee.on("newListener", async (eventName: HassEvent) => {
      if (!this.eventSubscriptions.has(eventName)) {
        const unsubscribe = await this.connection.subscribeEvents(
          this.eventCallback(eventName),
          eventName,
        );
        this.eventSubscriptions.set(eventName, unsubscribe);
      }
    });

    // upon listener removal, unsubscribe if no listeners remain
    this.ee.on("removeListener", async (eventName: HassEvent) => {
      if (this.listenerCount(eventName) === 0) {
        const unsubscribe = this.eventSubscriptions.get(eventName);
        assert(unsubscribe);

        await unsubscribe();
      }
    });
  }

  private eventCallback(eventName: HassEvent) {
    return (payload: any) =>
      this.ee.emit(eventName, reviveEvent(eventName, payload));
  }

  public close(): Promise<unknown> {
    const done = defer<unknown>();
    this.connection.socket.addEventListener("close", done.resolve);
    this.connection.close();
    return done.promise;
  }

  public fetchDeviceRegistry(): Promise<Try<DeviceRegistryEntry[]>> {
    return tryF(
      this.connection.sendMessagePromise<DeviceRegistryEntry[]>({
        type: "config/device_registry/list",
      }),
    );
  }

  public findRelated(
    itemType: ItemType,
    itemId: string,
  ): Promise<Try<RelatedResult>> {
    return tryF(
      this.connection.sendMessagePromise<RelatedResult>({
        type: "search/related",
        item_type: itemType,
        item_id: itemId,
      }),
    );
  }
}

export type Deferred<T> = {
  readonly resolve: (value: T) => void;
  readonly reject: (reason: Error) => void;
  readonly promise: Promise<T>;
};

/**
 * simple function to return a deferred
 * ("a promise that can be resolved from the outside later")
 */
export function defer<T = unknown>(): Deferred<T> {
  let resolve: (value: T) => void;
  let reject: (reason: Error) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return {
    promise,
    resolve: resolve!,
    reject: reject!,
  };
}

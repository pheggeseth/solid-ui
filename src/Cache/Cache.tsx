import { isPlainObject } from 'lodash';
import {
  Accessor,
  Component,
  createContext,
  createEffect,
  createResource,
  createSignal,
  ResourceReturn,
  Show,
  useContext,
} from 'solid-js';
import { createStore } from 'solid-js/store';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
interface Cache {
  [key: string]: any;
}

declare function getCacheValue<T = any>(key: Key): T | undefined;
declare function setCacheValue<T = any>(key: Key, value: T): T;
const CacheContext =
  createContext<[getCacheValue: typeof getCacheValue, setCacheValue: typeof setCacheValue]>();

function useCacheContext() {
  return useContext(CacheContext);
}

export const CacheProvider: Component = (props) => {
  const [cache, setCache] = createStore<Cache>({});

  function getCacheValue<T = any>(key: Key): T | undefined {
    return cache[getHashedKey(key)];
  }

  function setCacheValue<T = any>(key: Key, value: T): T {
    setCache(getHashedKey(key), value);
    return value;
  }

  return (
    <CacheContext.Provider value={[getCacheValue, setCacheValue]}>
      {props.children}
    </CacheContext.Provider>
  );
};

type Key = string | unknown[];

function getHashedKey(key: Key) {
  const keyAsArray = Array.isArray(key) ? key : [key];
  return JSON.stringify(keyAsArray, (_, value) => {
    if (isPlainObject(value)) {
      return Object.keys(value)
        .sort()
        .reduce((sortedObj, key) => {
          sortedObj[key] = value[key];
          return sortedObj;
        }, {});
    } else {
      return value;
    }
  });
}

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

const pendingQueries = new Map<string, Promise<any>>();
function isQueryPending(key: Key) {
  return pendingQueries.has(getHashedKey(key));
}

function getPendingQuery<T = any>(key: Key): Promise<T> {
  return pendingQueries.get(getHashedKey(key));
}

function setPendingQuery<T = any>(key: Key, promise: Promise<T>): Promise<T> {
  const hashedKey = getHashedKey(key);

  return pendingQueries
    .set(
      hashedKey,
      promise.then((result) => {
        pendingQueries.delete(hashedKey);
        return result;
      })
    )
    .get(hashedKey);
}

function useQuery<T = any>(queryKey: Accessor<Key>, query: (key: Key) => Promise<T>) {
  const [getCacheValue, setCacheValue] = useCacheContext();

  // ensures that only one pending instance of a query's Promise exists at a time
  function getQueryPromise() {
    return isQueryPending(queryKey())
      ? getPendingQuery<T>(queryKey())
      : setPendingQuery<T>(queryKey(), query(queryKey()));
  }

  const [shouldForceRefetch, setShouldForceRefetch] = createSignal(false);

  async function fetcher(): Promise<T> {
    if (shouldForceRefetch()) {
      return setCacheValue<Promise<T>>(queryKey(), getQueryPromise());
    } else {
      return (
        getCacheValue<Promise<T>>(queryKey()) ||
        setCacheValue<Promise<T>>(queryKey(), getQueryPromise())
      );
    }
  }

  const [resource, { refetch: refetchResource }] = createResource(queryKey, fetcher);

  function mutateQuery(newValue: T) {
    setCacheValue<T>(queryKey(), newValue);
  }

  function forceRefetch() {
    setShouldForceRefetch(true);
    refetchResource();
    setShouldForceRefetch(false);
  }

  /* Refetching the resource when the cached value changes allows 
  all instances of "createResource" that are tracking the same "source" (query key) 
  to sync at the same time, regardless of whether the change is from a mutation or a refetch. 
  It doesn't matter because "fetcher" will not trigger a loading state if it returns synchronously,
  which it does by fetching the cached value, unless we force it to refetch. 
  
  When the cached value changes as a result of an instance refetching, the cache updates to a new promise,
  so all of the other instances will return THAT promise, which triggers a loading state in each instance.

  It doesn't matter that each instance is tracking its own loading/error state,
  as those states depend on the return value of the "fetcher", which we always keep in sync via the cache.
  */
  createEffect(() => {
    getCacheValue(queryKey());
    refetchResource();
  });

  return [resource, { mutate: mutateQuery, refetch: forceRefetch }] as ResourceReturn<T>;
}

export function Todo() {
  const [key, setKey] = createSignal<Key>(['todos', 1]);

  const [resource, { mutate, refetch }] = useQuery(key, async (key) => {
    const [entityType, entityId] = key;
    if (!entityType) return;

    const result = await fetch([BASE_URL, entityType, entityId].join('/')).then((res) =>
      res.json()
    );
    await sleep(500);
    return result;
  });

  return (
    <div>
      <input
        type="number"
        value={String(key()[1])}
        min="1"
        onInput={(event) => {
          if (Number(event.currentTarget.value) > 0) setKey(['todos', event.currentTarget.value]);
        }}
      />
      <button onClick={refetch}>Refetch</button>
      <button onClick={() => mutate('mutation!')}>Mutate</button>
      <Show when={!resource.loading} fallback="Loading...">
        {JSON.stringify(resource())}
      </Show>
    </div>
  );
}

export default Todo;

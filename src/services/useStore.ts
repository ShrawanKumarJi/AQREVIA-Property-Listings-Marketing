import { useEffect, useState } from 'react';
import { store, DataStore } from './store';

export function useStore(): DataStore {
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setTick((prev) => prev + 1);
    });
    return unsubscribe;
  }, []);

  return store;
}

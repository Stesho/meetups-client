import React from 'react';

interface StoreProviderProps {
  children: React.ReactNode;
}

export function createStoreContext<StoresMap extends { [K: string]: object }>(
  stores: StoresMap,
) {
  const StoreContext = React.createContext<StoresMap>(undefined!);

  const StoreProvider = ({ children }: StoreProviderProps): JSX.Element => (
    <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>
  );

  function useStore<K extends keyof StoresMap>(storeKey: K): StoresMap[K] {
    return React.useContext(StoreContext)[storeKey];
  }

  return {
    StoreProvider,
    useStore,
  };
}

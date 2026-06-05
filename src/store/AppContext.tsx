import React, { createContext, useContext, useReducer, type Dispatch } from 'react';
import { appReducer, initialAppState } from './appReducer';
import type { AppState, AppAction } from './actions';

/** Context value type */
interface AppContextValue {
  state: AppState;
  dispatch: Dispatch<AppAction>;
}

/** Application context */
const AppContext = createContext<AppContextValue | undefined>(undefined);

/** Context provider props */
interface AppProviderProps {
  children: React.ReactNode;
}

/** Application context provider */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  const contextValue: AppContextValue = {
    state,
    dispatch,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

/** Hook to access application state and dispatch */
export function useAppContext(): AppContextValue {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

export { AppContext };

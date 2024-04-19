import React, { useState, createContext, ReactNode } from 'react';

type AppContextStore = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedInState: boolean) => void;
  usersFullName: string;
  setUsersFullName: (usersFullNameState: string) => void;
  token: string;
  setToken: (tokenState: string) => void;
};

export const AppContext = createContext<AppContextStore>({
  isLoggedIn: false,
  setIsLoggedIn: () => false,
  usersFullName: '',
  setUsersFullName: () => '',
  token: '',
  setToken: () => '',
});

type AppContextProviderProps = {
  children: ReactNode;
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [usersFullName, setUsersFullName] = useState<string>('');
  const [token, setToken] = useState<string>('');

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        usersFullName,
        setUsersFullName,
        token,
        setToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

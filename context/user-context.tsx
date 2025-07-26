'use client';

import React, { createContext, useContext } from 'react';

export type UserData = {
  id: string;
  first_name: string;
  email: string;
  user_image:string;
};

const UserContext = createContext<UserData | null>(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({
  children,
  userData,
}: {
  children: React.ReactNode;
  userData: UserData;
}) => {
  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  );
};

'use client';

import { UserProvider, UserData } from '@/context/user-context';

export default function UserProviderWrapper({
  children,
  userData,
}: {
  children: React.ReactNode;
  userData: UserData;
}) {
  return <UserProvider userData={userData}>{children}</UserProvider>;
}

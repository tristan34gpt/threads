"use client";

import { SessionProvider } from "next-auth/react";

export const Authprovider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

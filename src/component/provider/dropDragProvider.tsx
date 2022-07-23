import { createContext } from "react";
import { useState } from "react";
import type { ReactNode } from "react";

export const TokenContext = createContext({});

export const TokenProvider = (props: { children: ReactNode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { children } = props;

  return (
    <TokenContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

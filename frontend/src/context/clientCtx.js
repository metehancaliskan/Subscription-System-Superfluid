import React, { createContext, useState, useEffect } from "react";

export const ClientCtx = createContext();

export function ClientsProvider(props) {
  const [clients, setClients] = useState([
    {
      name: "Netflix",
      wallet: "0x000000asdo83y23wıszxsaxs98c",
      xWallet: "0x00x02891638712",
    },

  ]);

  return (
    <ClientCtx.Provider
      value={{
        clients,
        setClients,
      }}
    >
      {props.children}
    </ClientCtx.Provider>
  );
}

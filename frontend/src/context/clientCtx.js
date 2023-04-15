import React, { createContext, useState, useEffect } from "react";

export const ClientCtx = createContext();

export function ClientsProvider(props) {
  const [clients, setClients] = useState([
    {
      name: "Netflix",
      contract: "0x471015a759f13A4235D88BCf28C0f795F8dCe805",
      symbol: "NFX",
      rate: 1000000000000
    },
    {
      name: "Youtube",
      contract: "0xC9651FAeadd5E9A20C4e9Ef4Fcda6dC4081e99c6",
      symbol: "YT",
      rate: 1000000000000
    },
    {
      name: "Spotify",
      contract: "0x3013c19a6FebFA86c448073aAD21e15C436C55AF",
      symbol: "SPTFY",
      rate: 1000000000000
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

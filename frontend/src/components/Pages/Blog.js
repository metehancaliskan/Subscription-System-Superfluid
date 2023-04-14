import React, { useContext } from "react";
import { ClientCtx } from "../../context/clientCtx";

export const Blog = () => {
  const { clients, setClients } = useContext(ClientCtx);

  const handleCardClick = (client) => {
    console.log(client);
  };
  return (
    <div className="container m-auto flex gap-4 flex-wrap">
      {clients.map((client, index) => {
        return (
          <div
            key={index}
            onClick={() => handleCardClick(client)}
            className="bg-white px-2 py-4 rounded-lg shadow-xl w-min flex flex-col cursor-pointer hover:scale-105 hover:shadow-2xl"
          >
            <p className="text-lg font-bold"> {client.name}</p>
            <p className="text-lg"> {client.wallet}</p>
          </div>
        );
      })}
    </div>
  );
};
